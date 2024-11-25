import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from './base.abstract.repository';
import { Accounts } from 'src/module/accounts/entities/accounts.entity';
import { BaseInterfaceRepository } from './base.interface.repository';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AccountsRepository
  extends BaseAbstractRepository<Accounts>
  implements BaseInterfaceRepository<Accounts>
{
  constructor(
    @InjectModel(Accounts) private readonly accountsRepository: typeof Accounts,
  ) {
    super(accountsRepository);
  }
}
