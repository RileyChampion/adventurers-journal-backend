import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('CharactersService', () => {
  let service: CharactersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [CharactersService],
    }).compile();

    service = module.get<CharactersService>(CharactersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
