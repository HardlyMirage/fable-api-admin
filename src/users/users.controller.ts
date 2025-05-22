import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createAdminUserDto: CreateAdminUserDto) {
    return this.usersService.create(createAdminUserDto);
  }
  
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return req.user;
  }
}
