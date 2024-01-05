import { Test, TestingModule } from '@nestjs/testing';
import { MembeliController } from './membeli.controller';

describe('MembeliController', () => {
  let controller: MembeliController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembeliController],
    }).compile();

    controller = module.get<MembeliController>(MembeliController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
