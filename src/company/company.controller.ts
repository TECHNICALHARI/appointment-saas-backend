import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import {
  CompanyFilterDto,
  CreateCompanyDto,
  RenewPlanDto,
} from './company.dto';

@Controller('company')
export class CompanyController {
  constructor(private service: CompanyService) {}
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN)
  getAll(@Query() filters: CompanyFilterDto) {
    return this.service.getAll(filters);
  }
  @Post('register')
  register(@Body() dto: CreateCompanyDto) {
    return this.service.registerCompany(dto);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN)
  updateStatus(
    @Param('id') id: string,
    @Body() body: { approve: boolean; note?: string },
  ) {
    return this.service.updateStatus(id, body.approve, body.note);
  }

  @Post('admin/add')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN)
  createByAdmin(dto: CreateCompanyDto) {
    return this.service.registerCompany(dto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN)
  getCompanyById(@Param('id') id: string) {
    return this.service.getCompanyById(id);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN)
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Post(':id/renew')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN, Role.COMPANY_ADMIN)
  renewPlan(@Param('id') id: string, @Body() dto: RenewPlanDto) {
    return this.service.renewPlan(id, dto);
  }
}
