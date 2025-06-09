import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './company.dto';
import { Messages } from 'src/common/messages/messages';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async registerCompany(dto: CreateCompanyDto) {
    if (dto.createdById) {
      const creator = await this.prisma.user.findFirst({
        where: { id: dto.createdById },
      });
      if (!creator || creator.role !== Role.SUPERADMIN) {
        throw new BadRequestException('Invalid super admin creator');
      }
    }
    const existing = await this.prisma.company.findFirst({
      where: {
        OR: [
          { email: dto.email },
          { domain: dto.domain },
          { phone: dto.phone },
        ],
      },
    });
    if (existing)
      throw new BadRequestException(Messages.COMPANY_ALREADY_EXISTS);

    const plan = await this.prisma.plan.findUnique({
      where: { id: dto.planId },
    });
    if (!plan) throw new BadRequestException(Messages.PLAN_NOT_FOUND);
    return this.prisma.company.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        domain: dto.domain,
        planId: dto.planId,
        createdById: dto.createdById ?? null,
        isApproved: false,
        isActive: false,
      },
    });
  }

  async updateStatus(id: string, approve: boolean, statusNote?: string) {
    const company = await this.prisma.company.findUnique({
      where: { id },
    });
    if (!company) throw new BadRequestException(Messages.COMPANY_NOT_FOUND);

    return this.prisma.company.update({
      where: { id },
      data: {
        isActive: approve,
        isApproved: approve,
        statusNote: statusNote ?? (approve ? 'Approved' : 'Rejected'),
      },
    });
  }
}
