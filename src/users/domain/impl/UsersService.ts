import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../../dto/CreateUserDTO';
import { User } from '../../models/User';
import {
  IUsersRepository,
  USERS_REPOSITORY_TOKEN,
} from '../../repositories/IUsersRepository';
import { IUsersService } from '../IUsersService';
import { IPasswordService, PASSWORD_SERVICE_TOKEN } from '../IPasswordService';
import {
  ITransactionManager,
  TRANSACTION_MANAGER_TOKEN,
} from '../../../utils/transactions/ITransactionManager';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly usersRepository: IUsersRepository,
    @Inject(PASSWORD_SERVICE_TOKEN)
    private readonly passwordService: IPasswordService,
    @Inject(TRANSACTION_MANAGER_TOKEN)
    private readonly transactionManager: ITransactionManager,
  ) { }

  create(createUserDto: CreateUserDTO): Promise<User> {
    // An example transaction (not really used like this IRL)
    return this.transactionManager.transact((t) => {
      const hashedPassword = this.passwordService.hash(createUserDto.password);

      return this.usersRepository.create(
        {
          ...createUserDto,
          password: hashedPassword,
        },
        {
          transaction: t,
        },
      );
    });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.remove(id);
  }
}
