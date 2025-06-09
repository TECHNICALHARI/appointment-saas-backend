import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CompanyFilterDto,
  CreateCompanyDto,
  RenewPlanDto,
} from './company.dto';
import { Messages } from 'src/common/messages/messages';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async registerCompany(dto: CreateCompanyDto) {
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
      throw new BadRequestException(Messages.ALREADY_EXISTS("Company"));

    const plan = await this.prisma.plan.findUnique({
      where: { id: dto.planId },
    });
    if (!plan) throw new BadRequestException(Messages.NOT_FOUND("Plan"));
    return this.prisma.company.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        domain: dto.domain,
        planId: dto.planId,
        createdById: null,
        isApproved: false,
        isActive: false,
      },
    });
  }

  async updateStatus(id: string, approve: boolean, statusNote?: string) {
    const company = await this.prisma.company.findUnique({
      where: { id },
    });
    if (!company) throw new BadRequestException(Messages.NOT_FOUND("Company"));

    return this.prisma.company.update({
      where: { id },
      data: {
        isActive: approve,
        isApproved: approve,
        statusNote: statusNote ?? (approve ? 'Approved' : 'Rejected'),
      },
    });
  }
  async createBySuperAdmin(dto: CreateCompanyDto) {
    const creator = await this.prisma.user.findFirst({
      where: { id: dto.createdById },
    });
    if (!creator || creator.role !== Role.SUPERADMIN) {
      throw new BadRequestException('Invalid super admin creator');
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
      throw new BadRequestException(Messages.ALREADY_EXISTS("Company"));

    const plan = await this.prisma.plan.findUnique({
      where: { id: dto.planId },
    });
    if (!plan) throw new BadRequestException(Messages.NOT_FOUND("Plan"));
    return this.prisma.company.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        domain: dto.domain,
        planId: dto.planId,
        createdById: dto.createdById,
        isApproved: false,
        isActive: false,
      },
    });
  }

  async getAll(filters: CompanyFilterDto) {
    const { search, isApproved, isActive, page = 1, limit = 10 } = filters;

    const where: any = {};
    if (typeof isApproved === 'boolean') {
      where.isApproved = isApproved;
    }
    if (typeof isActive === 'boolean') {
      where.isActive = isActive;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.company.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.company.count({ where }),
    ]);
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  async getCompanyById(id: string) {
    return this.prisma.company.findUnique({ where: { id } });
  }
  async delete(id: string) {
    return this.prisma.company.delete({ where: { id } });
  }

  async renewPlan(id: string, dto: RenewPlanDto) {
    const plan = await this.prisma.plan.findUnique({
      where: { id: dto.planId },
    });
    if (!plan) throw new BadRequestException(Messages.NOT_FOUND("Plan"));
    return this.prisma.company.update({
      where: { id },
      data: {
        planId: dto.planId,
        planStart: new Date(),
        planEnd: new Date(Date.now() + plan.durationDays * 24 * 60 * 60 * 1000),
      },
    });
  }
}
