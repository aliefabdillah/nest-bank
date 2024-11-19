import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Accounts } from 'src/module/accounts/entities/accounts.entity';
import { Transactions } from './transactions.entity';

@Table
export class TransactionAccounts extends Model {
  @ForeignKey(() => Accounts)
  @Column
  accountId: string;

  @ForeignKey(() => Transactions)
  @Column
  transactions_fromId: string;

  @ForeignKey(() => Transactions)
  @Column
  transactions_toId: string;
}
