import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { TransactionServiceInterface } from './interface/transactions.service.interface';
import { AuthGuard } from '@nestjs/passport';
import { CreateTransactionsDto } from './dto/create-transactions.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(
    @Inject('TransactionsServiceInterface')
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  @UseGuards(AuthGuard())
  @Post('/transfer')
  async createTransaction(@Body() transactionDto: CreateTransactionsDto) {
    return this.transactionService.create(transactionDto);
  }
}
