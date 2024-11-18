import {
  Column,
  CreatedAt,
  DataType,
  Default,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Accounts } from 'src/module/accounts/entities/accounts.entity';

@Table({
  timestamps: true,
})
export class Users extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @Column
  full_name: string;

  @Column
  email: string;

  @Column
  password_hash: string;

  @Column
  phone?: string;

  @CreatedAt
  @Default(DataType.NOW)
  @Column
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasOne(() => Accounts)
  account: Accounts;
}

/* CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone_number VARCHAR(15),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); */
