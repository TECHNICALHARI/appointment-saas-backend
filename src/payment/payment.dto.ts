import { IsNotEmpty, IsString } from 'class-validator';
import { Messages } from 'src/common/messages/messages';

export class InitiatePaymentDto {
  @IsNotEmpty({ message: Messages.REQUIRED('Company ID') })
  companyId: string;

  @IsNotEmpty({ message: Messages.REQUIRED('Plan ID') })
  planId: string;

  @IsNotEmpty({ message: Messages.REQUIRED('Amount') })
  amount: number;
}


export class VerifyPaymentDto {
  @IsNotEmpty()
  @IsString()
  razorpay_order_id: string;

  @IsNotEmpty()
  @IsString()
  razorpay_payment_id: string;

  @IsNotEmpty()
  @IsString()
  razorpay_signature: string;
}