import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'node:path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TelegramModule } from './telegram/telegram.module';
import { VizitkaModule } from './vizitka/vizitka.module';
import { PaymentModule } from './payment/payment.module';
import { AdminModule } from './admin/admin.module';
import { SettingsModule } from './settings/settings.module';
import { LandingsModule } from './landings/landings.module';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // dist/src is compile output — ../.. = api, ../../.. = monorepo root
      envFilePath: [join(__dirname, '..', '..', '..', '.env'), join(__dirname, '..', '..', '.env')],
    }),
    /**
     * So'rov chastotasi cheklovi — firibgarlik xavflarini nazorat qilish.
     * Karta sinash (card testing) va OTP ni brute-force qilishning oldini oladi.
     * Aniq (qattiqroq) cheklovlar kontrollerlarda @Throttle bilan beriladi.
     */
    ThrottlerModule.forRoot([
      { name: 'default', ttl: 60_000, limit: 120 },
    ]),
    ScheduleModule.forRoot(),
    PrismaModule,
    SettingsModule,
    SmsModule,
    AuthModule,
    TelegramModule,
    VizitkaModule,
    PaymentModule,
    AdminModule,
    LandingsModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    AppService,
  ],
})
export class AppModule {}
