import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transactions } from './entities/transactions.entity';

@Module({
  imports: [SequelizeModule.forFeature([Transactions])],
})
export class TransactionsModule {}
