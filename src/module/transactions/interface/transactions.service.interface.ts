import { Response } from 'src/Response/response';
import { CreateTransactionsDto } from '../dto/create-transactions.dto';
import { Transactions } from '../entities/transactions.entity';

export interface TransactionServiceInterface {
  create(
    transactionDto: CreateTransactionsDto,
  ): Promise<Response<Transactions>>;
  getAll(accountId: string, query: any): Promise<Response<Transactions[]>>;
  getById(id: string): Promise<Response<Transactions>>;
}
