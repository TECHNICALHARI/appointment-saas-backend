import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RazorpayService } from './razorpay.service';
import { InitiatePaymentDto } from './payment.dto';
import { Messages } from 'src/common/messages/messages';

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
    if (!plan) throw new BadRequestException(Messages.NOT_FOUND("Plan"));
    const company = await this.prisma.company.findUnique({
      where: { id: dto.companyId },
    });
    if (!company) throw new BadRequestException(Messages.NOT_FOUND("Company"));

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
}
