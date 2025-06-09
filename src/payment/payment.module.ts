import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { RazorpayService } from './razorpay.service';

@Module({
  providers: [PaymentService, RazorpayService],
  controllers: [PaymentController],
  exports: [RazorpayService]
})
export class PaymentModule {}
