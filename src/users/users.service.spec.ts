import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UpdateUserDto } from './dto/update-user-info.dto';

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
];

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('creates a new user', async () => {
      const newCreateUserDto = {
        username: 'new-user-name',
        email: 'newemail@email.com',
        password: 'testPassword',
      };

      const mockCreatedUser = {
        id: '822a75c0-e0d7-4343-a627-c0b793b3dd03',
        username: newCreateUserDto.username,
        email: newCreateUserDto.email,
        password: newCreateUserDto.password,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      };

      const prismaCreateSpy = jest
        .spyOn(prisma.user, 'create')
        .mockImplementation((): any => {
          return Promise.resolve(mockCreatedUser);
        });

      const result = await service.create(newCreateUserDto);

      expect(result).toEqual(mockCreatedUser);
      expect(prismaCreateSpy).toHaveBeenCalledTimes(1);
      expect(prismaCreateSpy).toHaveBeenCalledWith({ data: newCreateUserDto });
    });

    it('fails to create a new user with missing values', async () => {
      // const newCreateUserDto = {
      //   username: 'new-user-name',
      //   password: 'testPassword',
      // }
      // const createSpy = jest.spyOn(service, 'create').mockRejectedValue(
      //   new BadRequestException
      // );
      // const result = await controller.create(newCreateUserDto);
      // expect(result).toEqual(mockCreatedUser);
      // expect(createSpy).toHaveBeenCalledTimes(1)
      // expect(createSpy).toHaveBeenCalledWith(newCreateUserDto);
    });
  });

  describe('findAll', () => {
    it('return full array of users', async () => {
      const prismaFindManySpy = jest
        .spyOn(prisma.user, 'findMany')
        .mockImplementation((): any => Promise.resolve(usersMockData));

      const users = await service.findAll();

      expect(users).toEqual(usersMockData);
      expect(prismaFindManySpy).toHaveBeenCalledTimes(1);
    });
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
      };

      const prismaFindUniqueOrThrowSpy = jest
        .spyOn(prisma.user, 'findUniqueOrThrow')
        .mockImplementation((): any => {
          return Promise.resolve(testUser);
        });

      const result = await service.findOne(
        '822a75c0-e0d7-4343-a627-c0b793b3dd03',
      );

      expect(result).toBe(testUser);
      expect(prismaFindUniqueOrThrowSpy).toHaveBeenCalledTimes(1);
      expect(prismaFindUniqueOrThrowSpy).toHaveBeenCalledWith({
        where: { id: '822a75c0-e0d7-4343-a627-c0b793b3dd03' },
      });
    });

    it('return error if user is not found', async () => {
      const prismaFindUniqueOrThrowSpy = jest
        .spyOn(prisma.user, 'findUniqueOrThrow')
        .mockRejectedValue(
          new PrismaClientKnownRequestError('User not found', {
            code: 'P2025',
            clientVersion: '4.0.0',
          }),
        );

      await expect(service.findOne('not-real-id')).rejects.toThrow(
        PrismaClientKnownRequestError,
      );

      expect(prismaFindUniqueOrThrowSpy).toHaveBeenCalledWith({
        where: { id: 'not-real-id' },
      });
    });
  });

  describe('update', () => {
    it('updates the user information', async () => {
      const userId = '822a75c0-e0d7-4343-a627-c0b793b3dd03';
      const updatedUserDto: UpdateUserDto = {
        username: 'newUserNameForUser',
        email: 'newEmailForUser',
      };

      const mockUpdateUser = {
        id: userId,
        username: updatedUserDto.username,
        email: updatedUserDto.email,
        password: 'password1',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      const prismaUpdateSpy = jest
        .spyOn(prisma.user, 'update')
        .mockImplementation((): any => {
          return Promise.resolve(mockUpdateUser);
        });

      const userUpdated = await service.update(
        '822a75c0-e0d7-4343-a627-c0b793b3dd03',
        updatedUserDto,
      );

      expect(userUpdated).toBe(mockUpdateUser);
      expect(prismaUpdateSpy).toHaveBeenCalledTimes(1);
      expect(prismaUpdateSpy).toHaveBeenCalledWith({
        data: { email: 'newEmailForUser', username: 'newUserNameForUser' },
        where: { id: '822a75c0-e0d7-4343-a627-c0b793b3dd03' },
      });
    });

    it('updates the user password', async () => {
      // Todo: Make update user pass endpoint
      // const userId = '822a75c0-e0d7-4343-a627-c0b793b3dd03'
      // const updatedUserPassDto: UpdateUserPasswordDto = {
      //   new_password: 'updatedUserPassword',
      //   old_password: 'oldPasswordEnteredForValidation'
      // }
      // const mockUpdateUser = {
      //   id: userId,
      //   username: 'asdasdfUser',
      //   email: 'faker-email@fake.com',
      //   password: updatedUserPassDto.new_password,
      //   isActive: true,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      //   deletedAt: null
      // }
      // const updateSpy = jest.spyOn(service, 'update').mockImplementation((_userId: string, _updatedUserDto: UpdateUserDto): any => {
      //   return Promise.resolve(mockUpdateUser);
      // })
      // const userUpdated = await controller.update('822a75c0-e0d7-4343-a627-c0b793b3dd03', updatedUserPassDto)
      // expect(userUpdated).toBe(mockUpdateUser);
      // expect(updateSpy).toHaveBeenCalledTimes(1);
      // expect(updateSpy).toHaveBeenCalledWith(userId, updatedUserPassDto);
    });
  });

  describe('remove', () => {
    it('removes specified user', async () => {
      const userId = '822a75c0-e0d7-4343-a627-c0b793b3dd03';

      const mockDeletedUser = {
        id: userId,
        username: 'asdasdfUser',
        email: 'faker-email@fake.com',
        password: 'passpasspass',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      const prismaDeleteSpy = jest
        .spyOn(prisma.user, 'delete')
        .mockImplementation((): any => {
          return Promise.resolve(mockDeletedUser);
        });

      const removedUser = await service.remove(userId);

      expect(removedUser).toBe(mockDeletedUser);
      expect(prismaDeleteSpy).toHaveBeenCalledTimes(1);
      expect(prismaDeleteSpy).toHaveBeenCalledWith({ where: { id: userId } });
    });
  });
});
