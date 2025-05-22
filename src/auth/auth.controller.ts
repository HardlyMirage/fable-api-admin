import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAdminUserDto } from './dto/login-admin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginAdminUserDto: LoginAdminUserDto) {
    return this.authService.login(loginAdminUserDto);
  }
}
