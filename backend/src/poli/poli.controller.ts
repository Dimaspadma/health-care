import { Controller, Get } from '@nestjs/common';
import { PoliService } from './poli.service';

@Controller('poli')
export class PoliController {
  constructor(
    private readonly poliService: PoliService,
  ) {}

  @Get()
  async findAll() {
    return {message: 'success', data: await this.poliService.findAll()};
  }
}
