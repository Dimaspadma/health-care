import { Controller, Get } from '@nestjs/common';
import { PoliService } from './poli.service';

@Controller('poli')
export class PoliController {
  constructor(
    private readonly poliService: PoliService,
  ) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.poliService.findAll();
  }
}
