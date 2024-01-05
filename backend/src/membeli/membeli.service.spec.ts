import { Test, TestingModule } from '@nestjs/testing';
import { MembeliService } from './membeli.service';

describe('MembeliService', () => {
  let service: MembeliService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembeliService],
    }).compile();

    service = module.get<MembeliService>(MembeliService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
