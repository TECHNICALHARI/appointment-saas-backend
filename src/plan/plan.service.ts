import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlanDto, UpdatePlanDto } from './plan.dto';
import { Messages } from 'src/common/messages/messages';

@Injectable()
export class PlanService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreatePlanDto) {
    const exists = await this.prisma.plan.findFirst({
      where: { name: dto.name },
    });
    if (exists) throw new BadRequestException(Messages.ALREADY_EXISTS('Plan'));

    const plan = await this.prisma.plan.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        durationDays: dto.durationDays,
        features: {
          create: dto.features.map((name) => ({ name })),
        },
      },
      include: { features: true },
    });
    return {
      data: plan,
      message: Messages.CREATED('Plan'),
    };
  }

  async getAll() {
    return await this.prisma.plan.findMany({
      include: { features: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(id: string) {
    return this.prisma.plan.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdatePlanDto) {
    const plan = await this.prisma.plan.findFirst({ where: { id } });
    if (!plan) throw new BadRequestException(Messages.NOT_FOUND('Plan'));

    await this.prisma.plan.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        durationDays: dto.durationDays,
        features: {
          deleteMany: {},
          create: dto.features.map((name) => ({ name })),
        },
      },
    });
  }

  async delete(id: string) {
    const existing = await this.prisma.plan.findFirst({ where: { id } });
    if (!existing) throw new BadRequestException(Messages.NOT_FOUND('Plan'));

    return this.prisma.plan.delete({ where: { id } });
  }
}
