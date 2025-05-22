import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from './entities/admin-user.entity';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(AdminUser)
    private adminUserRepository: Repository<AdminUser>,
  ) {}

  async create(createAdminUserDto: CreateAdminUserDto): Promise<AdminUser> {
    const { username, email } = createAdminUserDto;

    // Check if user with the same username or email already exists
    const existingUser = await this.adminUserRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    const user = this.adminUserRepository.create(createAdminUserDto);
    return this.adminUserRepository.save(user);
  }

  async findByUsername(username: string): Promise<AdminUser> {
    const user = await this.adminUserRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    return user;
  }

  async findById(id: number): Promise<AdminUser> {
    const user = await this.adminUserRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
