import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PhoneDto } from "./dto/phone.dto";
import { VerifyDto } from "./dto/verify.dto";
import { RefreshDto } from "./dto/refresh.dto";
import { JwtAccessGuard } from "./jwt-access.guard";
import { Throttle } from "@nestjs/throttler";

@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  /** Bitta IP dan daqiqasiga 5 ta kod so'rovi — SMS/bot spamining oldini oladi */
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  @Post("phone")
  async phone(@Body() body: PhoneDto) {
    const v = await this.auth.validatePhone(body.phone);
    return {
      ok: true,
      ...v,
      bot: process.env.NEXT_PUBLIC_TELEGRAM_BOT ?? "paylinkeruz_bot",
    };
  }

  /**
   * Kodni tanlab topishga (brute-force) qarshi: daqiqasiga 10 urinish.
   * Kod 6 xonali va 2 daqiqa amal qiladi — cheklovsiz bo'lsa tanlab topish real xavf.
   */
  @Throttle({ default: { ttl: 60_000, limit: 10 } })
  @Post("verify")
  async verify(@Body() body: VerifyDto) {
    return this.auth.verify(body.phone, body.code);
  }

  @Post("refresh")
  async refresh(@Body() body: RefreshDto) {
    return this.auth.refresh(body.refreshToken);
  }

  @Get("me")
  @UseGuards(JwtAccessGuard)
  async me(@Req() req: { user: { sub: number } }) {
    return this.auth.me(req.user.sub);
  }
}
