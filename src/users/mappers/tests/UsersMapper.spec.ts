import { User } from '../../models/User';
import { UsersMapper } from '../impl/UsersMapper';

describe('UsersMapper', () => {
  let mapper: UsersMapper;

  beforeEach(() => {
    mapper = new UsersMapper();
  });

  describe('toDTO', () => {
    it('should map a User to a UserDTO', () => {
      const expectedUserDTO = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
      };

      const user = expectedUserDTO as User;

      expect(mapper.toDTO(user)).toEqual(expectedUserDTO);
    });
  });
});
