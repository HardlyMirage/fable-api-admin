import { IsString, IsOptional, IsBoolean, IsUrl } from 'class-validator';

export class CreateUniversityDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsUrl()
  @IsOptional()
  website?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  logoUrl?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
