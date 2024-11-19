import {
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Status } from 'src/enums/status.enum';
import { TransactionType } from 'src/enums/transactionType';
import { Accounts } from 'src/module/accounts/entities/accounts.entity';
import { TransactionAccounts } from './transactionsAccounts.entity';

@Table({
  timestamps: true,
})
export class Transactions extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @Column({
    type: DataType.BIGINT,
  })
  amout: number;

  @Column
  transactions_type: TransactionType;

  @Default(Status.Pending)
  @Column
  status: Status;

  @CreatedAt
  createdAt?: Date;

  @BelongsToMany(() => Accounts, () => TransactionAccounts)
  accounts: Accounts[];
}

/* CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  account_from INT REFERENCES accounts(id),
  account_to INT REFERENCES accounts(id),
  amount NUMERIC(15, 2) NOT NULL,
  transaction_type VARCHAR(50) NOT NULL, -- e.g., transfer, deposit, withdrawal
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, completed, failed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); */
