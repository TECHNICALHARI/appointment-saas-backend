import { IsArray, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Messages } from 'src/common/messages/messages';

export class CreatePlanDto {
  @IsNotEmpty({ message: Messages.REQUIRED('Plan name') })
  @IsString()
  name: string;

  @IsNotEmpty({ message: Messages.REQUIRED('Description') })
  @IsString()
  description: string;

  @IsNumber({}, { message: Messages.INVALID('Price') })
  @Min(0, { message: Messages.MIN('Price', 0) })
  price: number;

  @IsNumber({}, { message: Messages.INVALID('Duration (in days)') })
  @Min(1, { message: Messages.MIN('Duration', 1) })
  durationDays: number;

  @IsArray({ message: Messages.INVALID('Features') })
  @IsString({
    each: true,
    message: Messages.INVALID('Each feature must be a string'),
  })
  features: string[];
}

export class UpdatePlanDto extends CreatePlanDto {}
