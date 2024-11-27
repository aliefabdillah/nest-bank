import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateTransactionsDto {
  @IsUUID()
  @IsNotEmpty()
  account_from: string;

  @IsUUID()
  @IsNotEmpty()
  account_to: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
