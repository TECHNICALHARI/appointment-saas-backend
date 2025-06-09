import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreatePlanDto, UpdatePlanDto } from './plan.dto';
import { PlanService } from './plan.service';

@Controller('plan')
export class PlanController {
  constructor(private service: PlanService) {}
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN)
  create(@Body() dto: CreatePlanDto) {
    return this.service.create(dto);
  }

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN)
  update(@Param('id') id: string, @Body() dto: UpdatePlanDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN)
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
