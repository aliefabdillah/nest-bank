import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Accounts } from './entities/accounts.entity';

@Module({
  imports: [SequelizeModule.forFeature([Accounts])],
})
export class AccountsModule {}
