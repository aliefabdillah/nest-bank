import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Min(6)
  password: string;
}
