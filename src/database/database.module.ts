import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminUser } from '../users/entities/admin-user.entity';
import { University } from '../entities/university.entity';
import { Course } from '../entities/course.entity';
import { Event } from '../entities/event.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load environment variables globally
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +(configService.get<number>('DB_PORT') ?? 5432),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [AdminUser, University, Course, Event], // Explicitly define entities
        synchronize: configService.get<boolean>('DB_SYNC'), // Sync schema in development
        logging: configService.get('NODE_ENV') !== 'production',
      }),
    }),
  ],
})
export class DatabaseModule {}
