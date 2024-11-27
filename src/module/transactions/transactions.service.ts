/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TransactionServiceInterface } from './interface/transactions.service.interface';
import { Response } from 'src/Response/response';
import { CreateTransactionsDto } from './dto/create-transactions.dto';
import { Transactions } from './entities/transactions.entity';
import { TransactionsRepository } from 'src/repositories/transactions.repository';
import { AccountsRepository } from 'src/repositories/accounts.repository';
import { TransactionAccounts } from './entities/transactionsAccounts.entity';
import { Op } from 'sequelize';
import { Accounts } from '../accounts/entities/accounts.entity';
import { Users } from '../users/entities/users.entity';

@Injectable()
export class TransactionsService implements TransactionServiceInterface {
  constructor(
    private readonly transactionRepository: TransactionsRepository,
    private readonly accountRepository: AccountsRepository,
  ) {}

  async create(
    transactionDto: CreateTransactionsDto,
  ): Promise<Response<Transactions>> {
    const { account_from, account_to, amount, transactions_type } =
      transactionDto;

    try {
      const accountFromData =
        await this.accountRepository.findById(account_from);
      const accountToData = await this.accountRepository.findById(account_to);

      if (!accountFromData || !accountToData) {
        throw new NotFoundException('Account Not found');
      }

      const transactionData = await this.transactionRepository.create({
        amout: amount,
        transactions_type,
      });

      if (accountFromData.balance < amount) {
        throw new BadRequestException('Insuffient account balance');
      }

      // reduce balance and send balance to destination account
      accountFromData.balance -= amount;
      accountToData.balance += amount;
      accountFromData.save();
      accountToData.save();

      await TransactionAccounts.create({
        account_fromId: account_from,
        account_toId: account_to,
        transactionsId: transactionData.id,
      });

      return {
        status: HttpStatus.OK,
        message: 'Transaction successfuly',
        data: transactionData,
      };
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async getAll(
    accountId: string,
    query: any,
  ): Promise<Response<Transactions[]>> {
    const transactionData = await this.transactionRepository.find({
      attributes: ['amount', 'transactions_type', 'status'],
      include: [
        {
          model: TransactionAccounts,
          attributes: ['account_fromId', 'account_toId'],
          where: {
            [Op.or]: [
              { account_fromId: accountId },
              { account_toId: accountId },
            ],
          },
          include: [
            {
              model: Accounts,
              attributes: [
                'account_number',
                'account_type',
                'balance',
                'user_id',
              ],
              as: 'accountFrom',
              include: [{ model: Users, attributes: ['full_name'] }],
            },
            {
              model: Accounts,
              attributes: [
                'account_number',
                'account_type',
                'balance',
                'user_id',
              ],
              as: 'accountTo',
              include: [{ model: Users, attributes: ['full_name'] }],
            },
          ],
        },
      ],
    });

    return {
      status: HttpStatus.OK,
      message: 'Get Transaction List successfuly',
      data: transactionData,
    };
  }

  getById(id: string): Promise<Response<Transactions>> {
    throw new Error('Method not implemented.');
  }
}
