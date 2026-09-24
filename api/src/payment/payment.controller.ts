import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from '../auth/jwt-access.guard';
import { CreateClickPaymentDto } from './dto/create-click-payment.dto';
import { PaymentService } from './payment.service';
import { Throttle } from "@nestjs/throttler";

@Controller('payments')
export class PaymentController {
  constructor(private readonly payments: PaymentService) {}

  /** JWT: body faqat { amount } — butun so'm, kamida 1000 */
  /** Karta sinash (card testing) ga qarshi: daqiqasiga 10 ta to'lov yaratish */
  @Throttle({ default: { ttl: 60_000, limit: 10 } })
  @Post('click')
  @UseGuards(JwtAccessGuard)
  async createClick(
    @Req() req: { user: { sub: number } },
    @Body() dto: CreateClickPaymentDto,
  ) {
    return this.payments.createClickPayment(req.user.sub, dto.amount, {
      vizitkaId: dto.vizitkaId,
      landingId: dto.landingId,
      subscriptionMonths: dto.subscriptionMonths,
    });
  }
}
