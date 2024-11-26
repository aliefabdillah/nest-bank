import { RegisterUserDto } from './registerUser.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(RegisterUserDto) {}
