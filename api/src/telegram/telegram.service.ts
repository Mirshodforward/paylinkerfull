import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { randomInt } from "node:crypto";
import { PrismaService } from "../prisma/prisma.service";
import { normalizeUzPhone } from "../common/phone";

const OTP_TTL_MS = 2 * 60 * 1000;
const CALLBACK_REFRESH = "refresh_otp";

export function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** /start, /start@bot, /start payload */
/** Telegram `from.language_code` (ru, ru-RU, en, uz ...) -> bot tili */
export type BotLang = "uz" | "ru";
export function botLang(code?: string | null): BotLang {
  return (code ?? "").toLowerCase().startsWith("ru") ? "ru" : "uz";
}

export function isStartCommand(text: string | undefined): boolean {
  if (!text) return false;
  const t = text.trim();
  const first = t.split(/\s/)[0] ?? "";
  if (first === "/start") return true;
  if (first.startsWith("/start@")) return true;
  if (t.startsWith("/start ")) return true;
  return false;
}

@Injectable()
export class TelegramService {
  private readonly log = new Logger(TelegramService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  private token() {
    return this.config.getOrThrow<string>("TELEGRAM_BOT_TOKEN");
  }

  private api(method: string) {
    return `https://api.telegram.org/bot${this.token()}/${method}`;
  }

  private makeOtp() {
    return String(100000 + randomInt(900000));
  }

  private expireAt() {
    return new Date(Date.now() + OTP_TTL_MS);
  }

  /** Oddiy matn/HTML — eslatmalar, obuna tugashi va hokazo */
  async sendHtmlMessage(telegramUserId: string, html: string): Promise<boolean> {
    const chatId = String(telegramUserId).trim();
    if (!chatId || !/^\d+$/.test(chatId)) {
      this.log.warn(`sendHtmlMessage: noto‘g‘ri chat_id ${telegramUserId}`);
      return false;
    }
    const data = await this.callJson<{ ok?: boolean }>("sendMessage", {
      chat_id: chatId,
      text: html,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
    return data?.ok === true;
  }

  private async callJson<T = unknown>(method: string, body: object): Promise<T> {
    const r = await fetch(this.api(method), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const t = (await r.text()) as string;
    if (!r.ok) {
      this.log.warn(`Telegram ${method} ${r.status} ${t}`);
    }
    try {
      return JSON.parse(t) as T;
    } catch {
      return {} as T;
    }
  }

  private async setOtpForExistingUser(phone: string, tgId: string) {
    const u = await this.prisma.user.findUnique({ where: { number: phone } });
    if (!u) {
      this.log.error("setOtpForExistingUser: no user for phone");
      return;
    }
    const code = this.makeOtp();
    const ex = this.expireAt();
    await this.prisma.user.update({
      where: { id: u.id },
      data: { loginOtp: code, loginOtpExpiresAt: ex, telegramId: u.telegramId ?? tgId },
    });
    return code;
  }

  private async setOtpForTgUser(phone: string, tgId: string, fullName: string | null, username: string | null) {
    const code = this.makeOtp();
    const ex = this.expireAt();
    await this.prisma.tgUser.upsert({
      where: { telegramUserId: tgId },
      create: {
        telegramUserId: tgId,
        number: phone,
        fullName: fullName,
        username: username,
        loginOtp: code,
        loginOtpExpiresAt: ex,
      },
      update: {
        number: phone,
        fullName: fullName ?? undefined,
        username: username ?? undefined,
        loginOtp: code,
        loginOtpExpiresAt: ex,
      },
    });
    return code;
  }

  private inlineKeyboardWithCopy(code: string, lang: BotLang = "uz") {
    return {
      inline_keyboard: [
        [
          {
            text: lang === "ru" ? "📋 Скопировать код" : "📋 Kodni nusxalash",
            copy_text: { text: code },
          },
        ],
        [
          {
            text: lang === "ru" ? "Обновить код" : "Kodni yangilash",
            callback_data: CALLBACK_REFRESH,
          },
        ],
      ],
    };
  }

  private otpMessageHtml(isExisting: boolean, code: string, lang: BotLang = "uz") {
    if (lang === "ru") {
      const t = isExisting
        ? "Ваш код для входа (введите на сайте):"
        : "Ваш код регистрации (введите на сайте):";
      return (
        `🔐 <b>${escapeHtml(t)}</b>\n\n` +
        `<code>${escapeHtml(code)}</code>\n\n` +
        "Код действует 2 минуты. " +
        "Нажмите <b>«Скопировать код»</b> ниже или на сам код, чтобы скопировать."
      );
    }
    const t = isExisting
      ? "Kirish kodingiz (saytga kiriting):"
      : "Ro'yxatdan o'tish kodingiz (saytga kiriting):";
    return (
      `🔐 <b>${escapeHtml(t)}</b>\n\n` +
      `<code>${escapeHtml(code)}</code>\n\n` +
      "Kod 2 daqiqagacha amal qiladi. " +
      "Pastdagi <b>«Kodni nusxalash»</b> yoki kodni bosib, " +
      "nusxalang."
    );
  }

  private async sendCodeToChatFixed(chatId: number, code: string, isExisting: boolean, lang: BotLang = "uz") {
    return this.callJson("sendMessage", {
      chat_id: chatId,
      text: this.otpMessageHtml(isExisting, code, lang),
      parse_mode: "HTML",
      reply_markup: this.inlineKeyboardWithCopy(code, lang),
    });
  }

  private async onStartMessage(chatId: number, lang: BotLang = "uz") {
    return this.callJson("sendMessage", {
      chat_id: chatId,
      text:
        lang === "ru"
          ? "Пожалуйста, нажмите кнопку **Поделиться контактом**, чтобы зарегистрироваться."
          : "Iltimos, ro'yxatdan o'tish uchun **Kontaktni ulash** tugmasini bosing.",
      parse_mode: "Markdown",
      reply_markup: {
        keyboard: [
          [
            {
              text: lang === "ru" ? "📱 Поделиться контактом" : "📱 Kontaktni ulash",
              request_contact: true,
            },
          ],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  }

  private async onContactMessage(msg: {
    chat: { id: number };
    from?: { id: number; username?: string; first_name?: string; language_code?: string };
    contact?: { phone_number?: string; first_name?: string; last_name?: string };
  }) {
    const contact = msg.contact;
    if (!contact?.phone_number) return;
    const raw = String(contact.phone_number);
    const phone = normalizeUzPhone(raw);
    const chatId = msg.chat.id;
    const fromId = String(msg.from?.id ?? 0);
    if (!fromId) return;
    const lang = botLang(msg.from?.language_code);
    const fullName =
      [contact.first_name, contact.last_name].filter(Boolean).join(" ") ||
      msg.from?.first_name ||
      null;
    const existing = await this.prisma.user.findUnique({ where: { number: phone } });
    if (existing) {
      const code = await this.setOtpForExistingUser(phone, fromId);
      if (code) await this.sendCodeToChatFixed(chatId, code, true, lang);
      return;
    }
    const code = await this.setOtpForTgUser(phone, fromId, fullName, msg.from?.username ?? null);
    if (code) await this.sendCodeToChatFixed(chatId, code, false, lang);
  }

  private async onRefreshCallback(
    data: { id: string; from: { id: number; language_code?: string }; message?: { chat: { id: number }; message_id: number } },
  ) {
    const fromId = String(data.from.id);
    const lang = botLang(data.from.language_code);
    const u = await this.prisma.user.findFirst({ where: { telegramId: fromId } });
    const tgu = u ? null : await this.prisma.tgUser.findUnique({ where: { telegramUserId: fromId } });
    const code = this.makeOtp();
    const ex = this.expireAt();
    if (u) {
      await this.prisma.user.update({
        where: { id: u.id },
        data: { loginOtp: code, loginOtpExpiresAt: ex },
      });
    } else if (tgu) {
      await this.prisma.tgUser.update({
        where: { id: tgu.id },
        data: { loginOtp: code, loginOtpExpiresAt: ex },
      });
    } else {
      await this.callJson("answerCallbackQuery", {
        callback_query_id: data.id,
        text: lang === "ru" ? "Поделитесь контактом заново: /start" : "Kontaktni qayta ulashing: /start",
        show_alert: true,
      });
      return;
    }
    if (data.message) {
      const text =
        lang === "ru"
          ? `🔐 <b>Новый код</b>\n\n<code>${escapeHtml(code)}</code>\n\nДействует 2 минуты. Скопируйте кнопкой <b>«Скопировать код»</b> ниже.`
          : `🔐 <b>Yangi kod</b>\n\n<code>${escapeHtml(code)}</code>\n\n2 daqiqagacha amal qiladi. Pastdagi <b>«Kodni nusxalash»</b> yordamida oling.`;
      await this.callJson("editMessageText", {
        chat_id: data.message.chat.id,
        message_id: data.message.message_id,
        text,
        parse_mode: "HTML",
        reply_markup: this.inlineKeyboardWithCopy(code, lang),
      });
    }
    await this.callJson("answerCallbackQuery", { callback_query_id: data.id });
  }

  async handleUpdate(raw: {
    message?: { chat: { id: number }; from?: { id: number; username?: string; first_name?: string; language_code?: string }; text?: string; contact?: { phone_number?: string; first_name?: string; last_name?: string } };
    callback_query?: { id: string; from: { id: number; language_code?: string }; data?: string; message?: { chat: { id: number }; message_id: number } };
  }) {
    if (raw.callback_query && raw.callback_query.data === CALLBACK_REFRESH) {
      return this.onRefreshCallback(raw.callback_query);
    }
    if (raw.message?.contact) {
      return this.onContactMessage(
        raw.message as Parameters<TelegramService["onContactMessage"]>[0],
      );
    }
    if (isStartCommand(raw.message?.text)) {
      return this.onStartMessage(raw.message!.chat.id, botLang(raw.message!.from?.language_code));
    }
  }
}
