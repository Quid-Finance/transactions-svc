import { UserDTO } from '../dto/UserDTO';
import { User } from '../models/User';

export const USERS_MAPPER_TOKEN = 'USER_MAPPER';

export interface IUsersMapper {
  toDTO(user: User): UserDTO;
}
