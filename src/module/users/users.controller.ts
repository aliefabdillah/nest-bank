import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersServiceInterface } from './interface/user.service.interface';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/updateUser.dto';

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
    return this.usersService.login(loginDto);
  }

  @UseGuards(AuthGuard())
  @Get('profile')
  async getProfile(@Req() req: any) {
    return this.usersService.getProfile(req.user.id);
  }

  @UseGuards(AuthGuard())
  @Patch('profile')
  async updateProfile(@Req() req: any, @Body() updateDto: UpdateUserDto) {
    return this.usersService.updateProfile(req.user.id, updateDto);
  }
}
