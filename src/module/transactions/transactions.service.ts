/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { TransactionServiceInterface } from './interface/transactions.service.interface';
import { Response } from 'src/Response/response';
import { CreateTransactionsDto } from './dto/create-transactions.dto';
import { Transactions } from './entities/transactions.entity';
import { TransactionsRepository } from 'src/repositories/transactions.repository';

@Injectable()
export class TransactionsService implements TransactionServiceInterface {
  constructor(private readonly transactionRepository: TransactionsRepository) {}

  create(
    transactionDto: CreateTransactionsDto,
  ): Promise<Response<Transactions>> {
    throw new Error('Method not implemented.');
  }
  getAll(query: any): Promise<Response<Transactions[]>> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<Response<Transactions>> {
    throw new Error('Method not implemented.');
  }
}
