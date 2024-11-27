/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { AccountsRepository } from 'src/repositories/accounts.repository';
import { AccountsServiceInterface } from './interface/accounts.service.interface';
import { Response } from 'src/Response/response';
import { CreateAccountDto } from './dto/create-account.dto';
import { Accounts } from './entities/accounts.entity';

@Injectable()
export class AccountsService implements AccountsServiceInterface {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  create(accountDto: CreateAccountDto): Promise<Response<Accounts>> {
    throw new Error('Method not implemented.');
  }

  getAccounts(): Promise<Response<Accounts>> {
    throw new Error('Method not implemented.');
  }

  getAccountById(id: string): Promise<Response<Accounts>> {
    throw new Error('Method not implemented.');
  }
}
