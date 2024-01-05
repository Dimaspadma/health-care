import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { JadwalPeriksaService } from './jadwal_periksa.service';
import { CreateJadwalPeriksaDto } from './dto/create-jadwal_periksa.dto';

@Controller('jadwal-periksa')
export class JadwalPeriksaController {
  constructor(
    private readonly jadwalPeriksaService: JadwalPeriksaService,
  ) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.jadwalPeriksaService.findAll();
  }

  @Get('poli/:poliId')
  async findByPoliId(@Param('poliId') poliId: string): Promise<any[]> {
    let id: number;

    id = Number(poliId);
    if (isNaN(id)) {
      return [];
    }

    return this.jadwalPeriksaService.findByPoliId(id);
  }

  @Get('dokter/:dokterId')
  async findByDokterId(@Param('dokterId') dokterId: string): Promise<any[]> {
    let id: number;

    id = Number(dokterId);
    if (isNaN(id)) {
      return [];
    }

    return this.jadwalPeriksaService.findByDokterId(id);
  }

  @Post()
  async create(@Body() createJadwalPeriksaDto: CreateJadwalPeriksaDto) {
    return this.jadwalPeriksaService.create(createJadwalPeriksaDto);
  }
}
