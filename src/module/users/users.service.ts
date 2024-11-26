/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersServiceInterface } from './interface/user.service.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Users } from './entities/users.entity';
import { UsersRepository } from 'src/repositories/users.repository';
import * as bcrypt from 'bcryptjs';
import { Response } from 'src/Response/response';

@Injectable()
export class UsersService implements UsersServiceInterface {
  constructor(private readonly usersRepository: UsersRepository) {}
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

  async validateUser(email: string, password: string): Promise<Users | null> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user && bcrypt.compare(user.password_hash, password)) {
      const { password_hash, ...result } = user;
      return result as Users;
    }

    return null;
  }

  async login(userDto: LoginUserDto): Promise<string> {
    throw new Error('Method not implemented.');
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
