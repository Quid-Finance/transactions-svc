import { Injectable } from '@nestjs/common';
import { User } from '../../models/User';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDTO } from '../../dto/CreateUserDTO';
import { IUsersRepository, CreateOptions } from '../IUsersRepository';

@Injectable()
export class SequelizeUsersRepository implements IUsersRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) { }

  create(createUserDto: CreateUserDTO, options?: CreateOptions): Promise<User> {
    return this.userModel.create(
      {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        password: createUserDto.password,
      },
      options
        ? {
          transaction: options?.transaction,
        }
        : undefined,
    );
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(id: string): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.userModel.destroy({ where: { id } });
  }
}
