import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Accounts } from 'src/module/accounts/entities/accounts.entity';
import { Transactions } from './transactions.entity';

@Table({
  updatedAt: false,
  createdAt: false,
})
export class TransactionAccounts extends Model {
  @ForeignKey(() => Accounts)
  @Column
  account_fromId: string;

  @ForeignKey(() => Accounts)
  @Column
  account_toId: string;

  @ForeignKey(() => Transactions)
  @Column
  transactionsId: string;
}
