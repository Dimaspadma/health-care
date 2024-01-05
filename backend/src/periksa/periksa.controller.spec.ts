import { Test, TestingModule } from '@nestjs/testing';
import { PeriksaController } from './periksa.controller';

describe('PeriksaController', () => {
  let controller: PeriksaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeriksaController],
    }).compile();

    controller = module.get<PeriksaController>(PeriksaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
