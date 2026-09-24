import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { TelegramService } from "./telegram.service";
import { TelegramWebhookGuard } from "./telegram-webhook.guard";

@Controller("telegram")
export class TelegramController {
  constructor(private readonly tg: TelegramService) {}

  /**
   * Telegram update'lari. Guard `X-Telegram-Bot-Api-Secret-Token` ni
   * tekshiradi — usiz bu endpoint akkaunt egallash yo'liga aylanadi
   * (izoh: telegram-webhook.guard.ts).
   */
  @Post("webhook")
  @UseGuards(TelegramWebhookGuard)
  async webhook(@Body() body: Record<string, unknown>) {
    await this.tg.handleUpdate(
      body as {
        message?: { chat: { id: number }; from?: { id: number; username?: string; first_name?: string }; text?: string; contact?: { phone_number?: string; first_name?: string; last_name?: string } };
        callback_query?: { id: string; from: { id: number }; data?: string; message?: { chat: { id: number }; message_id: number } };
      },
    );
    return { ok: true };
  }
}
