import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, LoginSuperAdminDto, SignupDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { Messages } from 'src/common/messages/messages';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ phone: dto.phone }, { email: dto.email || undefined }],
        companyId: dto.companyId,
      },
    });
    if (existingUser)
      throw new ConflictException(
        'Phone or email already registered for this company',
      );
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        password: hashed,
        companyId: dto.companyId,
        role: 'CUSTOMER',
      },
    });
    return this.generateToken(user);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        companyId: dto.companyId,
        OR: [{ phone: dto.phone }, { email: dto.email || undefined }].filter(
          Boolean,
        ),
      },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    const { password, createdAt, updatedAt, ...safeUser } = user;
    return this.generateToken(safeUser);
  }

  async loginSuperAdmin(dto: LoginSuperAdminDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });
    if (!user) throw new BadRequestException(Messages.NOT_FOUND('User'));

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException(Messages.INVALID_CREDENTIALS);
    const { password, createdAt, updatedAt, companyId, ...safeUser } = user;
    return this.generateToken(safeUser);
  }

  generateToken(user: any) {
    const payload = { sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
