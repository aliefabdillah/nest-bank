import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transactions } from './entities/transactions.entity';
import { TransactionsService } from './transactions.service';
import { TransactionsRepository } from 'src/repositories/transactions.repository';
import { TransactionsController } from './transactions.controller';
import { AccountsModule } from '../accounts/accounts.module';
import { UsersModule } from '../users/users.module';
import { TransactionAccounts } from './entities/transactionsAccounts.entity';
import { Accounts } from '../accounts/entities/accounts.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Transactions, Accounts, TransactionAccounts]),
    AccountsModule,
    UsersModule,
  ],
  providers: [
    TransactionsRepository,
    { provide: 'TransactionsServiceInterface', useClass: TransactionsService },
  ],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
