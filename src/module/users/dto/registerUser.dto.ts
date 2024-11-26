import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Min(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
