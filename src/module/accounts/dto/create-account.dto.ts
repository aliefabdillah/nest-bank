import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AccountType } from 'src/enums/AccountType.enum';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(AccountType)
  account_type: string;
}
