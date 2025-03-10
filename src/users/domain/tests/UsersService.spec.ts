import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../impl/UsersService';
import { PASSWORD_SERVICE_TOKEN } from '../IPasswordService';
import {
  IUsersRepository,
  USERS_REPOSITORY_TOKEN,
} from '../../repositories/IUsersRepository';

const usersArray = [
  {
    firstName: 'firstName #1',
    lastName: 'lastName #1',
    password: 'password #1',
  },
  {
    firstName: 'firstName #2',
    lastName: 'lastName #2',
    password: 'password #2',
  },
];

const oneUser = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
  password: 'password #1',
};

describe('UserService', () => {
  let service: UsersService;
  let repo: IUsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PASSWORD_SERVICE_TOKEN,
          useValue: {
            hash: jest.fn((arg) => `${arg}${arg}`),
          },
        },
        {
          provide: USERS_REPOSITORY_TOKEN,
          useValue: {
            findAll: jest.fn(() => usersArray),
            findOne: jest.fn(),
            create: jest.fn(() => oneUser),
            remove: jest.fn(),
            destroy: jest.fn(() => oneUser),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<IUsersRepository>(USERS_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', () => {
      const oneUser = {
        firstName: 'firstName #1',
        lastName: 'lastName #1',
        password: 'password #1',
      };
      expect(
        service.create({
          firstName: 'firstName #1',
          lastName: 'lastName #1',
          password: 'password #1password #1',
        }),
      ).toEqual(oneUser);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual(usersArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', () => {
      const findSpy = jest.spyOn(repo, 'findOne');
      expect(service.findOne('1'));
      expect(findSpy).toHaveBeenCalledWith('1');
    });
  });

  describe('remove()', () => {
    it('should remove a user', async () => {
      const removeSpy = jest.spyOn(repo, 'remove');
      const retVal = await service.remove('2');
      expect(removeSpy).toHaveBeenCalledWith('2');
      expect(retVal).toBeUndefined();
    });
  });
});
