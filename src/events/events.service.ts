import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
import { Course } from '../entities/course.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventsRepository.create(createEventDto);
    return this.eventsRepository.save(event);
  }

  async findAll(options?: { page?: number; limit?: number }): Promise<{ items: Event[]; total: number }> {
    const { page = 1, limit = 10 } = options || {};
    const skip = (page - 1) * limit;

    const [items, total] = await this.eventsRepository.findAndCount({
      skip,
      take: limit,
      order: { startDate: 'DESC' },
    });

    return { items, total };
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventsRepository.findOne({
      where: { id },
      relations: ['courses'],
    });
    
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.findOne(id);
    
    Object.assign(event, updateEventDto);
    
    return this.eventsRepository.save(event);
  }

  async remove(id: number): Promise<void> {
    const event = await this.findOne(id);
    await this.eventsRepository.remove(event);
  }

  async addCourse(eventId: number, courseId: number): Promise<Event> {
    const event = await this.findOne(eventId);
    const course = await this.coursesRepository.findOne({ 
      where: { id: courseId } 
    });
    
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }
    
    if (!event.courses) {
      event.courses = [];
    }
    
    event.courses.push(course);
    return this.eventsRepository.save(event);
  }

  async removeCourse(eventId: number, courseId: number): Promise<Event> {
    const event = await this.findOne(eventId);
    
    if (!event.courses) {
      throw new NotFoundException(`Event doesn't have any courses`);
    }
    
    event.courses = event.courses.filter(course => course.id !== courseId);
    return this.eventsRepository.save(event);
  }
}
