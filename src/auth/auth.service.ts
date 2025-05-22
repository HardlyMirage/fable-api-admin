import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAdminUserDto } from './dto/login-admin-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findByUsername(username);
      const isPasswordValid = await user.validatePassword(password);
      
      if (isPasswordValid) {
        const { password, ...result } = user;
        return result;
      }
      
      return null;
    } catch {
      return null;
    }
  }

  async login(loginAdminUserDto: LoginAdminUserDto) {
    const { username, password } = loginAdminUserDto;
    const user = await this.validateUser(username, password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const payload = { username: user.username, sub: user.id };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }
}
