import { User } from '../models/User';
import { CreateUserDTO } from '../dto/CreateUserDTO';

export const USERS_SERVICE_TOKEN = 'USERS_SERVICE';

export interface IUsersService {
  create(createUserDto: CreateUserDTO): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(id: string): Promise<User | null>;
  remove(id: string): Promise<void>;
}
