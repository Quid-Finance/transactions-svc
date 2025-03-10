import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { IUsersService, USERS_SERVICE_TOKEN } from './domain/IUsersService';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { IUsersMapper, USERS_MAPPER_TOKEN } from './mappers/IUsersMapper';
import { UserDTO } from './dto/UserDTO';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE_TOKEN)
    private readonly usersService: IUsersService,
    @Inject(USERS_MAPPER_TOKEN)
    private readonly usersMapper: IUsersMapper,
  ) { }

  @Post()
  async create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDTO,
  ): Promise<UserDTO> {
    const user = await this.usersService.create(createUserDto);
    return this.usersMapper.toDTO(user);
  }

  @Get()
  async findAll(): Promise<UserDTO[]> {
    const users = await this.usersService.findAll();
    return users.map((user) => this.usersMapper.toDTO(user));
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<UserDTO | undefined> {
    const user = await this.usersService.findOne(id);
    return user ? this.usersMapper.toDTO(user) : undefined;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
