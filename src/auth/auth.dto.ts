import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class SignupDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @MinLength(8)
  password: string;

  @IsNotEmpty()
  companyId: string;
}

export class LoginDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  phone?: string;

  @IsNotEmpty()
  companyId: string;

  @MinLength(8)
  password: string;
}

export class LoginSuperAdminDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
