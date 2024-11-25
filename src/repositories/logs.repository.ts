import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from './bases/base.abstract.repository';
import { Logs } from 'src/module/logs/entities/logs.entity';
import { BaseInterfaceRepository } from './bases/base.interface.repository';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class LogsRepository
  extends BaseAbstractRepository<Logs>
  implements BaseInterfaceRepository<Logs>
{
  constructor(@InjectModel(Logs) private readonly logsRepository: typeof Logs) {
    super(logsRepository);
  }
}
