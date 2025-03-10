import { Transaction } from '../../utils/transactions/Transaction';
import { CreateUserDTO } from '../dto/CreateUserDTO';
import { User } from '../models/User';

export const USERS_REPOSITORY_TOKEN = 'USERS_REPOSITORY';

export interface IUsersRepository {
  create(createUserDto: CreateUserDTO, options?: CreateOptions): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(id: string): Promise<User | null>;
  remove(id: string): Promise<void>;
}

export type CreateOptions = {
  transaction: Transaction;
};
