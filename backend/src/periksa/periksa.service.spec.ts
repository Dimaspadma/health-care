import { Test, TestingModule } from '@nestjs/testing';
import { PeriksaService } from './periksa.service';

describe('PeriksaService', () => {
  let service: PeriksaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeriksaService],
    }).compile();

    service = module.get<PeriksaService>(PeriksaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
