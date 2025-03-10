import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UsersController } from './UsersController';
import { IUsersService, USERS_SERVICE_TOKEN } from './domain/IUsersService';
import { USERS_MAPPER_TOKEN } from './mappers/IUsersMapper';

const createUserDto: CreateUserDTO = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
  password: 'password #1',
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: IUsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: USERS_SERVICE_TOKEN,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((user: CreateUserDTO) =>
                Promise.resolve({ id: '1', ...user }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                firstName: 'firstName #1',
                lastName: 'lastName #1',
              },
              {
                firstName: 'firstName #2',
                lastName: 'lastName #2',
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                firstName: 'firstName #1',
                lastName: 'lastName #1',
                id,
              }),
            ),
            remove: jest.fn(),
          },
        },
        {
          provide: USERS_MAPPER_TOKEN,
          useValue: {
            toDTO: jest.fn().mockImplementation((user) => ({
              firstName: user.firstName,
              lastName: user.lastName,
            })),
          },
        },
      ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<IUsersService>(USERS_SERVICE_TOKEN);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a user', () => {
      expect(usersController.create(createUserDto)).resolves.toEqual({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
      });
      expect(usersService.create).toHaveBeenCalled();
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll()', () => {
    it('should find all users ', () => {
      usersController.findAll();
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a user', () => {
      usersController.findOne('1');
      expect(usersService.findOne).toHaveBeenCalled();
      expect(usersController.findOne('1')).resolves.toEqual({
        firstName: 'firstName #1',
        lastName: 'lastName #1',
      });
    });
  });

  describe('remove()', () => {
    it('should remove the user', () => {
      usersController.remove('2');
      expect(usersService.remove).toHaveBeenCalled();
    });
  });
});
