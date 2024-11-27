import { CreateAccountDto } from '../dto/create-account.dto';
import { Accounts } from '../entities/accounts.entity';
import { Response } from 'src/Response/response';

export interface AccountsServiceInterface {
  create(accountDto: CreateAccountDto): Promise<Response<Accounts>>;
  getAccounts(): Promise<Response<Accounts>>;
  getDetailAccount(id: string): Promise<Response<Accounts>>;
}
