import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundError } from 'rxjs';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const usersMockData = [
  {
    id: '822a75c0-e0d7-4343-a627-c0b793b3dd03',
    username: 'testUserName1',
    password: 'hashedPassword1234',
    email: 'email1@email.com',
    isActive: true,
    createdAt: new Date('2025-03-01T10:00:00.000Z'),
    updatedAt: new Date('2025-03-01T10:00:00.000Z'),
    deletedAt: null,
  },
  {
    id: '822a75c0-e0d7-4343-a627-c0b793b3dd03',
    username: 'testUserName2',
    password: 'hashedPassword1234',
    email: 'email2@email.com',
    isActive: true,
    createdAt: new Date('2025-02-24T10:00:00.000Z'),
    updatedAt: new Date('2025-02-21T10:00:00.000Z'),
    deletedAt: null,
  },
  {
    id: '822a75c0-e0d7-4343-a627-c0b793b3dd03',
    username: 'testUserName3',
    password: 'hashedPassword1234',
    email: 'email3@email.com',
    isActive: true,
    createdAt: new Date('2025-02-21T10:00:00.000Z'),
    updatedAt: new Date('2025-02-21T10:00:00.000Z'),
    deletedAt: null,
  },
]

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [UsersController],
      providers: [UsersService],
    })
    .overrideProvider(PrismaService)
    .useValue({
      user: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUniqueOrThrow: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
      }
    })
    .compile();

    service = module.get<UsersService>(UsersController);
    controller = module.get<UsersController>(UsersController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('creates a new user', async () => {

    })

    it('fails to create a new user with missing values', () => {
      
    })
  });

  describe('findAll', () => {
    it('return full array of users', async () => {
      const findAllSpy = jest.spyOn(service, 'findAll').mockImplementation((): any => 
        Promise.resolve(usersMockData)
      );

      const users = await controller.findAll();

      expect(users).toEqual(usersMockData);
      expect(findAllSpy).toHaveBeenCalledTimes(1);
    })
  });

  describe('findUniqueOrThrow', () => {
    it('return one user with given', async () => {
      const testUser = {
        id: '822a75c0-e0d7-4343-a627-c0b793b3dd03',
        username: 'testUserName1',
        password: 'hashedPassword1234',
        email: 'email1@email.com',
        isActive: true,
        createdAt: new Date('2025-03-01T10:00:00.000Z'),
        updatedAt: new Date('2025-03-01T10:00:00.000Z'),
        deletedAt: null,
        characters: [],
        campaigns: [],
      }

      const findOneSpy = jest.spyOn(service, 'findOne').mockImplementation((userId: string): any => 
        Promise.resolve(testUser)
      );

      const result = await controller.findOne('822a75c0-e0d7-4343-a627-c0b793b3dd03');

      expect(result).toBe(testUser);
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith('822a75c0-e0d7-4343-a627-c0b793b3dd03');
    })

    it('return error if user is not found', async () => {
      const findOneSpy = jest.spyOn(service, 'findOne').mockRejectedValue(
        new PrismaClientKnownRequestError('User not found', { code: 'P2025', clientVersion: '4.0.0' })
      );

      await expect(controller.findOne('not-real-id')).rejects.toThrow(PrismaClientKnownRequestError);

      expect(findOneSpy).toHaveBeenCalledWith('not-real-id');
    })
  })

  describe('update', () => {})

  describe('remove', () => {})
});
