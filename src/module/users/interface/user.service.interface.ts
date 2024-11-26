import { LoginUserDto } from '../dto/loginUser.dto';
import { RegisterUserDto } from '../dto/registerUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { Users } from '../entities/users.entity';

export interface UsersServiceInterface {
  register(userDto: RegisterUserDto): Promise<Users>;
  login(userDto: LoginUserDto): Promise<string>;
  getProfile(id: string): Promise<Users>;
  updateProfile(id: string, updateDto: UpdateUserDto): Promise<Users>;
}
