import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from 'src/repositories/users.repository';

@Module({
  imports: [SequelizeModule.forFeature([Users])],
  exports: [SequelizeModule],
  providers: [
    UsersRepository,
    {
      provide: 'UsersServiceInterface',
      useClass: UsersService,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
