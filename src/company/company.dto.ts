import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Messages } from 'src/common/messages/messages';

export class CreateCompanyDto {
  @IsNotEmpty({ message: Messages.REQUIRED('Company name') })
  name: string;

  @IsEmail({}, { message: Messages.INVALID('Email') })
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

export class CompanyFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsBoolean()
  isApproved?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;
}

export class RenewPlanDto {
  @IsNotEmpty({ message: Messages.REQUIRED('Plan ID') })
  planId: string;
}