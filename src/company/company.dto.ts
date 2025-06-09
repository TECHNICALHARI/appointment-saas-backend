import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Messages } from 'src/common/messages/messages';

export class CreateCompanyDto {
  @IsNotEmpty({ message: Messages.REQUIRED('Company name') })
  name: string;

  @IsEmail({}, { message: Messages.EMAIL_INVALID })
  email: string;

  @IsNotEmpty({ message: Messages.REQUIRED('Phone number') })
  phone: string;

  @IsOptional()
  website?: string;

  @IsNotEmpty({ message: Messages.REQUIRED('Domain') })
  domain: string;

  @IsNotEmpty({ message: Messages.REQUIRED('Plan ID') })
  planId: string;

  @IsOptional()
  createdById?: string;
}
