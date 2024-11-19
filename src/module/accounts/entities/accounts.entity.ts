import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { AccountType } from 'src/enums/AccountType.enum';
import { Transactions } from 'src/module/transactions/entities/transactions.entity';
import { TransactionAccounts } from 'src/module/transactions/entities/transactionsAccounts.entity';
import { Users } from 'src/module/users/entities/users.entity';

@Table({
  timestamps: true,
})
export class Accounts extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @Unique
  @Column
  account_number: string;

  @Column({
    type: DataType.ENUM(...Object.values(AccountType)),
  })
  account_type: AccountType;

  @Default(0)
  @Column
  balance: number;

  @CreatedAt
  @Default(DataType.NOW)
  @Column
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @ForeignKey(() => Users)
  @Column
  user_id: string;

  @BelongsTo(() => Users)
  user: Users;

  @BelongsToMany(() => Transactions, () => TransactionAccounts)
  transactions: Transactions[];
}

/* CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    account_number VARCHAR(20) UNIQUE NOT NULL,
    account_type VARCHAR(50) NOT NULL, -- e.g., savings, checking
    balance NUMERIC(15, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); */
