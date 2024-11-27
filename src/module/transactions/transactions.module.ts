import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transactions } from './entities/transactions.entity';
import { TransactionsService } from './transactions.service';
import { TransactionsRepository } from 'src/repositories/transactions.repository';
import { TransactionsController } from './transactions.controller';

@Module({
  imports: [SequelizeModule.forFeature([Transactions])],
  providers: [
    TransactionsRepository,
    { provide: 'TransactionServiceInterface', useClass: TransactionsService },
  ],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
