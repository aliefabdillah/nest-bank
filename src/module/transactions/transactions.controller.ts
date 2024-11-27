import { Controller, Inject } from '@nestjs/common';
import { TransactionServiceInterface } from './interface/transactions.service.interface';

@Controller('transactions')
export class TransactionsController {
  constructor(
    @Inject('TransactionsServiceInterface')
    private readonly transactionService: TransactionServiceInterface,
  ) {}
}
