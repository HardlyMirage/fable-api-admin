import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../entities/course.entity';
import { University } from '../entities/university.entity';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Course, University])],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
