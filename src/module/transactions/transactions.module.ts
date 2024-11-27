import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transactions } from './entities/transactions.entity';
import { TransactionsService } from './transactions.service';
import { TransactionsRepository } from 'src/repositories/transactions.repository';
import { TransactionsController } from './transactions.controller';
import { AccountsModule } from '../accounts/accounts.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Transactions]),
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
