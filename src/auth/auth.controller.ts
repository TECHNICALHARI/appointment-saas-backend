import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginSuperAdminDto, SignupDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.service.signup(dto);
  }
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.service.login(dto);
  }
  @Post('superadmin/login')
  superAdminLogin(@Body() dto: LoginSuperAdminDto) {
    return this.service.loginSuperAdmin(dto);
  }
}
