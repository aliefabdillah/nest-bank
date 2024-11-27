import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transactions } from './entities/transactions.entity';
import { TransactionsService } from './transactions.service';
import { TransactionsRepository } from 'src/repositories/transactions.repository';

@Module({
  imports: [SequelizeModule.forFeature([Transactions])],
  providers: [
    TransactionsRepository,
    { provide: 'TransactionServiceInterface', useClass: TransactionsService },
  ],
})
export class TransactionsModule {}
