import { Test, TestingModule } from '@nestjs/testing';
import { JadwalPeriksaService } from './jadwal_periksa.service';

describe('JadwalPeriksaService', () => {
  let service: JadwalPeriksaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JadwalPeriksaService],
    }).compile();

    service = module.get<JadwalPeriksaService>(JadwalPeriksaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
