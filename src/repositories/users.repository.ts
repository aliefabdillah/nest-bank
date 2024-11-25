import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from './base.abstract.repository';
import { Users } from 'src/module/users/entities/users.entity';
import { BaseInterfaceRepository } from './base.interface.repository';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersRepository
  extends BaseAbstractRepository<Users>
  implements BaseInterfaceRepository<Users>
{
  constructor(
    @InjectModel(Users) private readonly usersRepository: typeof Users,
  ) {
    super(usersRepository);
  }
}
