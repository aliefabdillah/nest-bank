import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Users } from 'src/module/users/entities/users.entity';

@Table({ timestamps: true })
export class Logs extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @Column
  action: string;

  @CreatedAt
  @Default(DataType.NOW)
  @Column
  createdAt?: Date;

  @UpdatedAt
  @Column
  updatedAt?: Date;

  @ForeignKey(() => Users)
  @Column
  user_id: string;

  @BelongsTo(() => Users)
  user: Users;
}

// CREATE TABLE logs (
//   id SERIAL PRIMARY KEY,
//   user_id INT REFERENCES users(id),
//   action VARCHAR(100) NOT NULL,
//   timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
