import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/User';
import { UsersController } from './UsersController';
import { UsersService } from './domain/impl/UsersService';
import { SequelizeUsersRepository } from './repositories/impl/SequelizeUsersRepository';
import { USERS_REPOSITORY_TOKEN } from './repositories/IUsersRepository';
import { USERS_SERVICE_TOKEN } from './domain/IUsersService';
import { PASSWORD_SERVICE_TOKEN } from './domain/IPasswordService';
import { NaivePasswordService } from './domain/impl/NaivePasswordService';
import { USERS_MAPPER_TOKEN } from './mappers/IUsersMapper';
import { UsersMapper } from './mappers/impl/UsersMapper';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [
    {
      provide: USERS_MAPPER_TOKEN,
      useClass: UsersMapper,
    },
    {
      provide: USERS_SERVICE_TOKEN,
      useClass: UsersService,
    },
    {
      provide: USERS_REPOSITORY_TOKEN,
      useClass: SequelizeUsersRepository,
    },
    {
      provide: PASSWORD_SERVICE_TOKEN,
      useClass: NaivePasswordService,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule { }
