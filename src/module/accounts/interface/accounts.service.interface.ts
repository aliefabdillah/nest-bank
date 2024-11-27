import { CreateAccountDto } from '../dto/create-account.dto';
import { Accounts } from '../entities/accounts.entity';
import { Response } from 'src/Response/response';

export interface AccountsServiceInterface {
  create(accountDto: CreateAccountDto, id: string): Promise<Response<Accounts>>;
  getAccounts(id: string): Promise<Response<Accounts[]>>;
  getAccountById(id: string): Promise<Response<Accounts>>;
  deleteAccount(id: string): Promise<Response<Accounts>>;
}
