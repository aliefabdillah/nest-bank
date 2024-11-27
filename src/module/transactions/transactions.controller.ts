import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
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

  @UseGuards(AuthGuard())
  @Get('/:accountId')
  async getAllTransaction(@Param() param: any, @Query() query: any) {
    return this.transactionService.getAll(param.accountId, query);
  }
}
