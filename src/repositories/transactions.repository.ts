import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from './bases/base.abstract.repository';
import { BaseInterfaceRepository } from './bases/base.interface.repository';
import { InjectModel } from '@nestjs/sequelize';
import { Transactions } from 'src/module/transactions/entities/transactions.entity';

@Injectable()
export class TransactionsRepository
  extends BaseAbstractRepository<Transactions>
  implements BaseInterfaceRepository<Transactions>
{
  constructor(
    @InjectModel(Transactions)
    private readonly transactionsRepository: typeof Transactions,
  ) {
    super(transactionsRepository);
  }
}
