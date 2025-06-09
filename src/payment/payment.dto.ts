import { IsNotEmpty } from 'class-validator';
import { Messages } from 'src/common/messages/messages';

export class InitiatePaymentDto {
  @IsNotEmpty({ message: Messages.REQUIRED('Company ID') })
  companyId: string;

  @IsNotEmpty({ message: Messages.REQUIRED('Plan ID') })
  planId: string;

  @IsNotEmpty({ message: Messages.REQUIRED('Amount') })
  amount: number;
}
