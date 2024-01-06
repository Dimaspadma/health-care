import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MembeliService } from './membeli.service';
import { CreateMembeliDto } from './dto/create-membeli.dto';

@Controller('membeli')
export class MembeliController {
  constructor(
    private readonly membeliService: MembeliService,
  ) {}

  @Get()
  async findAll() {
    return {message: 'success', data: await this.membeliService.findAll()};
  }

  @Get('periksa/:id_periksa')
  async findAllByPeriksa(@Param('id_periksa') id_periksa: string) {
    const id = parseInt(id_periksa);
    if (isNaN(id)) {
      return {message: 'success', data: []};
    }
    return {message: 'success', data: await this.membeliService.findAllByPeriksa(id)};
  }

  @Get('pasien/:id_pasien')
  async findAllByPasien(@Param('id_pasien') id_pasien: string) {
    const id = parseInt(id_pasien);
    if (isNaN(id)) {
      return {message: 'success', data: []};
    }
    return {message: 'success', data: await this.membeliService.findAllByPasien(id)};
  }

  @Post()
  async create(@Body() createMembeliDto: CreateMembeliDto) {
    return {message: 'success', data: await this.membeliService.create(createMembeliDto)};
  }
}
