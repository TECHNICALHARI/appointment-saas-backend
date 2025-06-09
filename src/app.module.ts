import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CompanyModule } from './company/company.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PaymentModule } from './payment/payment.module';
import { PlanModule } from './plan/plan.module';

@Module({
  imports: [AuthModule, PrismaModule, CompanyModule, CloudinaryModule, PaymentModule, PlanModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
