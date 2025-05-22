import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard) // Apply JWT auth guard to all routes
@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Post()
  create(@Body() createUniversityDto: CreateUniversityDto) {
    return this.universitiesService.create(createUniversityDto);
  }

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.universitiesService.findAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.universitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUniversityDto: UpdateUniversityDto) {
    return this.universitiesService.update(+id, updateUniversityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.universitiesService.remove(+id);
  }
}
