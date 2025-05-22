import { IsString, IsOptional, IsBoolean, IsUrl, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsString()
  @IsOptional()
  organizer?: string;

  @IsUrl()
  @IsOptional()
  eventUrl?: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
