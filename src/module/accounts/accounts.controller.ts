import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccountsServiceInterface } from './interface/accounts.service.interface';
import { CreateAccountDto } from './dto/create-account.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('accounts')
export class AccountsController {
  constructor(
    @Inject('AccountsServiceInterface')
    private readonly accountsService: AccountsServiceInterface,
  ) {}

  @UseGuards(AuthGuard())
  @Post()
  async createAccounts(@Req() req: any, @Body() accountDto: CreateAccountDto) {
    return this.accountsService.create(accountDto, req.user.id);
  }

  @UseGuards(AuthGuard())
  @Get()
  async getAccounts(@Req() req: any) {
    return this.accountsService.getAccounts(req.user.id);
  }

  @UseGuards(AuthGuard())
  @Get('/:accountId')
  async getAccountsById(@Param() param: any) {
    return this.accountsService.getAccountById(param.accountId);
  }

  @UseGuards(AuthGuard())
  @Delete('/:accountId')
  async deleteAccount(@Param() param: any) {
    return this.accountsService.deleteAccount(param.accountId);
  }
}
