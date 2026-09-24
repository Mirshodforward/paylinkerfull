import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { TelegramController } from "./telegram.controller";
import { TelegramPollingService } from "./telegram-polling.service";
import { TelegramService } from "./telegram.service";
import { TelegramWebhookGuard } from "./telegram-webhook.guard";

@Module({
  imports: [PrismaModule],
  controllers: [TelegramController],
  providers: [TelegramService, TelegramPollingService, TelegramWebhookGuard],
  exports: [TelegramService],
})
export class TelegramModule {}
