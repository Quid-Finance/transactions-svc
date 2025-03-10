import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../models/User';
import { getModelToken } from '@nestjs/sequelize';
import { SequelizeUsersRepository } from '../impl/SequelizeUsersRepository';

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

describe('SequelizeUsersRepository', () => {
  let repo: SequelizeUsersRepository;
  let model: typeof User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SequelizeUsersRepository,
        {
          provide: getModelToken(User),
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

    repo = module.get<SequelizeUsersRepository>(SequelizeUsersRepository);
    model = module.get<typeof User>(getModelToken(User));
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', () => {
      const oneUser = {
        firstName: 'firstName #1',
        lastName: 'lastName #1',
        password: 'password #1',
      };
      expect(
        repo.create({
          firstName: 'firstName #1',
          lastName: 'lastName #1',
          password: 'password #1',
        }),
      ).toEqual(oneUser);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const users = await repo.findAll();
      expect(users).toEqual(usersArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', () => {
      const findSpy = jest.spyOn(model, 'findOne');
      expect(repo.findOne('1'));
      expect(findSpy).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });

  describe('remove()', () => {
    it('should remove a user', async () => {
      const destroySpy = jest.spyOn(model, 'destroy');
      const retVal = await repo.remove('2');
      expect(destroySpy).toHaveBeenCalledWith({ where: { id: '2' } });
      expect(retVal).toBeUndefined();
    });
  });
});
