import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/users/dto/UserDTO';
import { User } from 'src/users/models/User';
import { IUsersMapper } from '../IUsersMapper';

@Injectable()
export class UsersMapper implements IUsersMapper {
  toDTO(user: User): UserDTO {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
    };
  }
}
