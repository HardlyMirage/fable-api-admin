import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { University } from '../entities/university.entity';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';

@Injectable()
export class UniversitiesService {
  constructor(
    @InjectRepository(University)
    private universitiesRepository: Repository<University>,
  ) {}

  async create(createUniversityDto: CreateUniversityDto): Promise<University> {
    const university = this.universitiesRepository.create(createUniversityDto);
    return this.universitiesRepository.save(university);
  }

  async findAll(options?: { page?: number; limit?: number }): Promise<{ items: University[]; total: number }> {
    const { page = 1, limit = 10 } = options || {};
    const skip = (page - 1) * limit;

    const [items, total] = await this.universitiesRepository.findAndCount({
      skip,
      take: limit,
      order: { name: 'ASC' },
    });

    return { items, total };
  }

  async findOne(id: number): Promise<University> {
    const university = await this.universitiesRepository.findOne({
      where: { id },
      relations: ['courses'],
    });
    
    if (!university) {
      throw new NotFoundException(`University with ID ${id} not found`);
    }
    
    return university;
  }

  async update(id: number, updateUniversityDto: UpdateUniversityDto): Promise<University> {
    const university = await this.findOne(id);
    
    Object.assign(university, updateUniversityDto);
    
    return this.universitiesRepository.save(university);
  }

  async remove(id: number): Promise<void> {
    const university = await this.findOne(id);
    await this.universitiesRepository.remove(university);
  }
}
