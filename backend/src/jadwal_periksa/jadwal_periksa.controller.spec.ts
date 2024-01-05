import { Test, TestingModule } from '@nestjs/testing';
import { JadwalPeriksaController } from './jadwal_periksa.controller';

describe('JadwalPeriksaController', () => {
  let controller: JadwalPeriksaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JadwalPeriksaController],
    }).compile();

    controller = module.get<JadwalPeriksaController>(JadwalPeriksaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
