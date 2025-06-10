import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RazorpayService } from './razorpay.service';
import { InitiatePaymentDto, VerifyPaymentDto } from './payment.dto';
import { Messages } from 'src/common/messages/messages';
import * as crypto from 'crypto';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private razorpay: RazorpayService,
  ) {}

  async initiatePayment(dto: InitiatePaymentDto) {
    const plan = await this.prisma.plan.findUnique({
      where: { id: dto.planId },
    });
    if (!plan) throw new BadRequestException(Messages.NOT_FOUND('Plan'));
    const company = await this.prisma.company.findUnique({
      where: { id: dto.companyId },
    });
    if (!company) throw new BadRequestException(Messages.NOT_FOUND('Company'));

    const order = await this.razorpay.createOrder(plan.price);
    await this.prisma.payment.create({
      data: {
        companyId: company.id,
        planId: plan.id,
        amount: plan.price,
        gateway: 'razorpay',
        status: 'PENDING',
        transactionId: order.id,
      },
    });
    return {
      orderId: order.id,
      amount: plan.price,
      currency: 'INR',
    };
  }

  async verifyPayment(dto: VerifyPaymentDto) {
    const signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${dto.razorpay_order_id}|${dto.razorpay_payment_id}`)
      .digest('hex');

    const payment = await this.prisma.payment.findUnique({
      where: { transactionId: dto.razorpay_order_id },
    });
    if (!payment) throw new BadRequestException(Messages.NOT_FOUND('Payment'));
    if (signature === dto.razorpay_signature) {
      await this.prisma.payment.update({
        where: { transactionId: dto.razorpay_order_id },
        data: {
          status: 'PAID',
          paidAt: new Date(),
        },
      });

      await this.prisma.company.update({
        where: { id: payment.companyId },
        data: {
          isActive: true,
        },
      });
      return { message: 'Payment verified successfully' };
    } else {
      await this.prisma.payment.update({
        where: { transactionId: dto.razorpay_order_id },
        data: {
          status: 'FAILED',
        },
      });
      throw new BadRequestException('Payment verification failed');
    }
  }
}
