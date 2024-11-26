import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UsersServiceInterface } from './interface/user.service.interface';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('UsersServiceInterface')
    private readonly usersService: UsersServiceInterface,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterUserDto) {
    return this.usersService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    console.log(process.env.JWT_SECRET);
    return this.usersService.login(loginDto);
  }
}
