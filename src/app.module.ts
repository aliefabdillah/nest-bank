import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './module/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './module/users/entities/users.entity';
import { AccountsModule } from './module/accounts/accounts.module';
import { Accounts } from './module/accounts/entities/accounts.entity';
import { TransactionsModule } from './module/transactions/transactions.module';
import { Transactions } from './module/transactions/entities/transactions.entity';
import { TransactionAccounts } from './module/transactions/entities/transactionsAccounts.entity';
import { LogsModule } from './module/logs/logs.module';
import { Logs } from './module/logs/entities/logs.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models: [Users, Accounts, Transactions, TransactionAccounts, Logs],
      /* autoLoadModels: true,
      synchronize: true,
      sync: {
        alter: true,
      }, */
    }),
    UsersModule,
    AccountsModule,
    TransactionsModule,
    LogsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
