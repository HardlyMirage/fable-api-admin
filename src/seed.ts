import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const logger = new Logger('Seed');
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const usersService = app.get(UsersService);
    
    // Check if admin user already exists
    try {
      await usersService.findByUsername('admin');
      logger.log('Admin user already exists');
    } catch (error) {
      // Create admin user if not exists
      await usersService.create({
        username: 'admin',
        email: 'admin@fable.com',
        password: 'admin123', // This will be hashed by the entity
      });
      logger.log('Admin user created successfully');
    }
  } catch (error) {
    logger.error('Error during seeding:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
