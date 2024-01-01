import { Test, TestingModule } from '@nestjs/testing';
import { DokterController } from './dokter.controller';

describe('DokterController', () => {
  let controller: DokterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DokterController],
    }).compile();

    controller = module.get<DokterController>(DokterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
