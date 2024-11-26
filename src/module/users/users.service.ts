/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  HttpStatus,
  Injectable,
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
    throw new Error('Method not implemented.');
  }

  async updateProfile(
    id: string,
    updateDto: UpdateUserDto,
  ): Promise<Response<Users>> {
    throw new Error('Method not implemented.');
  }
}
