import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { InitiatePaymentDto } from './payment.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('company/payment')
export class PaymentController {
  constructor(private service: PaymentService) {}

  @Post('initiate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.COMPANY_ADMIN)
  initiate(@Body() dto: InitiatePaymentDto) {
    return this.service.initiatePayment(dto);
  }
}
