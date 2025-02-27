import { Test, TestingModule } from '@nestjs/testing';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('CharactersController', () => {
  let controller: CharactersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [CharactersController],
      providers: [CharactersService],
    }).compile();

    controller = module.get<CharactersController>(CharactersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
