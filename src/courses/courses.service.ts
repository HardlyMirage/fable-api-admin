import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { University } from '../entities/university.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    @InjectRepository(University)
    private universitiesRepository: Repository<University>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const { universityId, ...courseData } = createCourseDto;
    
    const university = await this.universitiesRepository.findOne({ where: { id: universityId } });
    if (!university) {
      throw new NotFoundException(`University with ID ${universityId} not found`);
    }
    
    const course = this.coursesRepository.create({
      ...courseData,
      university,
    });
    
    return this.coursesRepository.save(course);
  }

  async findAll(options?: { page?: number; limit?: number }): Promise<{ items: Course[]; total: number }> {
    const { page = 1, limit = 10 } = options || {};
    const skip = (page - 1) * limit;

    const [items, total] = await this.coursesRepository.findAndCount({
      skip,
      take: limit,
      relations: ['university'],
      order: { title: 'ASC' },
    });

    return { items, total };
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.coursesRepository.findOne({
      where: { id },
      relations: ['university', 'events'],
    });
    
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.findOne(id);
    
    const { universityId, ...courseData } = updateCourseDto;
    
    if (universityId !== undefined) {
      const university = await this.universitiesRepository.findOne({ where: { id: universityId } });
      if (!university) {
        throw new NotFoundException(`University with ID ${universityId} not found`);
      }
      course.university = university;
    }
    
    Object.assign(course, courseData);
    
    return this.coursesRepository.save(course);
  }

  async remove(id: number): Promise<void> {
    const course = await this.findOne(id);
    await this.coursesRepository.remove(course);
  }
}
