/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersServiceInterface } from './interface/user.service.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Users } from './entities/users.entity';
import { UsersRepository } from 'src/repositories/users.repository';
import * as bcrypt from 'bcryptjs';
import { Response } from 'src/Response/response';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService implements UsersServiceInterface {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  async register(userDto: RegisterUserDto): Promise<Response<Users>> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: userDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User already exist');
    }

    const user = {
      ...userDto,
      password_hash: await bcrypt.hash(userDto.password, 10),
    };

    const createdUser = await this.usersRepository.create(user);
    const dataUser = await this.usersRepository.findOne({
      where: { id: createdUser.id },
      attributes: [
        'id',
        'full_name',
        'email',
        'phone',
        'createdAt',
        'updatedAt',
      ],
    });

    return {
      status: HttpStatus.CREATED,
      message: 'User successfully created',
      data: dataUser,
    };
  }

  async login(userDto: LoginUserDto): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { email: userDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid Email');
    }

    if (!(await bcrypt.compare(userDto.password, user.password_hash))) {
      throw new UnauthorizedException('Invalid Password');
    }

    const token = await this.jwtService.sign({
      sub: user.id,
    });

    return { access_token: token };
  }

  async getProfile(id: string): Promise<Response<Users>> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
      attributes: [
        'id',
        'full_name',
        'email',
        'phone',
        'createdAt',
        'updatedAt',
      ],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      status: HttpStatus.OK,
      message: 'Get user profile successfully',
      data: user,
    };
  }

  async updateProfile(
    id: string,
    updateDto: UpdateUserDto,
  ): Promise<Response<Users>> {
    const updatedData = await this.usersRepository.update(updateDto, {
      where: { id },
    });

    if (updatedData) {
      const user = await this.usersRepository.findOne({
        where: {
          id,
        },
        attributes: [
          'id',
          'full_name',
          'email',
          'phone',
          'createdAt',
          'updatedAt',
        ],
      });

      return {
        status: HttpStatus.OK,
        message: 'Successfully update profile',
        data: user,
      };
    }

    throw new BadRequestException('Failed update profile');
  }
}
