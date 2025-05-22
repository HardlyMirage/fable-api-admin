import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
