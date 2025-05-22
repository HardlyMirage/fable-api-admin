import { IsString, IsOptional, IsBoolean, IsUrl, IsInt } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  duration?: string;

  @IsString()
  @IsOptional()
  level?: string;

  @IsUrl()
  @IsOptional()
  courseUrl?: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsInt()
  universityId: number;
}
