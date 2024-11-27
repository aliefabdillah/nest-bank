/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatus, Injectable } from '@nestjs/common';
import { AccountsRepository } from 'src/repositories/accounts.repository';
import { AccountsServiceInterface } from './interface/accounts.service.interface';
import { Response } from 'src/Response/response';
import { CreateAccountDto } from './dto/create-account.dto';
import { Accounts } from './entities/accounts.entity';
import { randomInt } from 'crypto';

@Injectable()
export class AccountsService implements AccountsServiceInterface {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async create(
    accountDto: CreateAccountDto,
    id: string,
  ): Promise<Response<Accounts>> {
    const account_number =
      '6078' +
      (new Date().getMonth() + 1) +
      randomInt(1000000000, 10000000000).toString();

    console.log(accountDto.account_type);
    const accountsData = await this.accountsRepository.create({
      account_number: account_number,
      account_type: accountDto.account_type,
      user_id: id,
    });

    return {
      status: HttpStatus.CREATED,
      data: accountsData,
      message: 'Created Accounts succesfully',
    };
  }

  getAccounts(): Promise<Response<Accounts>> {
    throw new Error('Method not implemented.');
  }

  getAccountById(id: string): Promise<Response<Accounts>> {
    throw new Error('Method not implemented.');
  }
}
