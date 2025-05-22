import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../entities/event.entity';
import { Course } from '../entities/course.entity';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Course])],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
