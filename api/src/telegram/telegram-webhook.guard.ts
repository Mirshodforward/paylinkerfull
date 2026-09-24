import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { timingSafeEqual } from "node:crypto";

/**
 * Telegram webhook — `X-Telegram-Bot-Api-Secret-Token` tekshiruvi.
 *
 * NEGA KERAK: `POST /telegram/webhook` autentifikatsiyasiz bo'lsa, istalgan
 * odam soxta "contact" update yuborib, BOSHQA foydalanuvchining telefon
 * raqami uchun OTP yaratdirishi va o'sha kodni O'ZINING chat'iga
 * yubortirishi mumkin edi (`chat_id` update ichidan olinadi) — ya'ni
 * istalgan akkauntga kirib olish.
 *
 * Telegram `setWebhook` da berilgan `secret_token` ni har bir so'rovda shu
 * header bilan qaytaradi; boshqa hech kim uni bilmaydi.
 *
 * Fail-closed: sir o'rnatilmagan bo'lsa webhook umuman qabul qilinmaydi.
 * (Lokal ishlab chiqishda `TELEGRAM_POLLING=true` ishlatiladi — u bu
 * endpointdan foydalanmaydi.)
 */
@Injectable()
export class TelegramWebhookGuard implements CanActivate {
  private readonly log = new Logger(TelegramWebhookGuard.name);

  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const expected = this.config.get<string>("TELEGRAM_WEBHOOK_SECRET")?.trim();
    if (!expected) {
      this.log.error(
        "TELEGRAM_WEBHOOK_SECRET o'rnatilmagan — webhook so'rovi rad etildi. " +
          "Sirni .env ga qo'ying va setWebhook ni `secret_token` bilan qayta chaqiring.",
      );
      throw new ForbiddenException();
    }

    const req = context
      .switchToHttp()
      .getRequest<{ headers: Record<string, string | string[] | undefined> }>();
    const raw = req.headers["x-telegram-bot-api-secret-token"];
    const got = Array.isArray(raw) ? raw[0] : raw;
    if (!got || !safeEqual(got, expected)) {
      throw new ForbiddenException();
    }
    return true;
  }
}

/** Uzunlik farqi ham sir ochmasin — SHA emas, oddiy doimiy vaqtli taqqoslash */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) {
    // timingSafeEqual uzunliklar teng bo'lishini talab qiladi
    return false;
  }
  return timingSafeEqual(ab, bb);
}
