import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Accounts } from './entities/accounts.entity';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from 'src/repositories/accounts.repository';
import { AccountsController } from './accounts.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Accounts]), UsersModule],
  providers: [
    AccountsRepository,
    { provide: 'AccountsServiceInterface', useClass: AccountsService },
  ],
  controllers: [AccountsController],
  exports: [AccountsRepository],
})
export class AccountsModule {}
