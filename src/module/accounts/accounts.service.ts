/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccountsRepository } from 'src/repositories/accounts.repository';
import { AccountsServiceInterface } from './interface/accounts.service.interface';
import { Response } from 'src/Response/response';
import { CreateAccountDto } from './dto/create-account.dto';
import { Accounts } from './entities/accounts.entity';
import { randomInt } from 'crypto';
import { Users } from '../users/entities/users.entity';

@Injectable()
export class AccountsService implements AccountsServiceInterface {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async create(
    accountDto: CreateAccountDto,
    id: string,
  ): Promise<Response<Accounts>> {
    const countAccount = await this.accountsRepository.find({
      where: { user_id: id },
    });

    if (!(countAccount.length < 3)) {
      throw new BadRequestException('Maximum account created');
    }

    const account_number =
      '6078' +
      (new Date().getMonth() + 1) +
      randomInt(1000000000, 10000000000).toString();

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

  async getAccounts(id: string): Promise<Response<Accounts[]>> {
    const accountsData = await this.accountsRepository.find({
      attributes: ['id', 'account_number', 'account_type', 'balance'],
      include: [
        {
          model: Users,
          where: { id },
          attributes: [
            'id',
            'full_name',
            'email',
            'phone',
            'createdAt',
            'updatedAt',
          ],
        },
      ],
    });

    return {
      status: HttpStatus.OK,
      data: accountsData,
      message: 'Get Accounts succesfully',
    };
  }

  async getAccountById(id: string): Promise<Response<Accounts>> {
    const accountsData = await this.accountsRepository.findById(id);

    if (!accountsData) {
      throw new NotFoundException('Accounts not found');
    }

    return {
      status: HttpStatus.OK,
      message: 'Get accounts success',
      data: accountsData,
    };
  }

  async deleteAccount(id: string): Promise<Response<Accounts>> {
    const deletedAccount = await this.accountsRepository.delete(id);

    if (!deletedAccount) {
      throw new BadRequestException('Failed to Deleted Account');
    }

    return {
      status: HttpStatus.OK,
      message: 'Delete account Successfull',
      data: {} as Accounts,
    };
  }
}
