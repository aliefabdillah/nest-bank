import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Accounts } from './entities/accounts.entity';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from 'src/repositories/accounts.repository';

@Module({
  imports: [SequelizeModule.forFeature([Accounts])],
  providers: [
    AccountsRepository,
    { provide: 'AccountsServiceInterface', useClass: AccountsService },
  ],
})
export class AccountsModule {}
