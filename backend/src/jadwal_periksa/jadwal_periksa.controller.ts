import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { JadwalPeriksaService } from './jadwal_periksa.service';
import { CreateJadwalPeriksaDto } from './dto/create-jadwal_periksa.dto';

@Controller('jadwal-periksa')
export class JadwalPeriksaController {
  constructor(
    private readonly jadwalPeriksaService: JadwalPeriksaService,
  ) {}

  @Get()
  async findAll() {
    return {message: 'list jadwal', data: await this.jadwalPeriksaService.findAll()};
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let jadwalPeriksaId: number;

    jadwalPeriksaId = Number(id);
    if (isNaN(jadwalPeriksaId)) {
      throw new HttpException({message: 'Jadwal Periksa not found', error: 'Not Found', statusCode: 404}, HttpStatus.NOT_FOUND);
    }

    return {message: 'success', data: await this.jadwalPeriksaService.findOne(jadwalPeriksaId)};
  }

  @Get('poli/:poliId')
  async findByPoliId(@Param('poliId') poliId: string){
    let id: number;

    id = Number(poliId);
    if (isNaN(id)) {
      return {message: 'success', data: []};
    }

    return {message: 'success', data: await this.jadwalPeriksaService.findByPoliId(id)};
  }

  @Get('dokter/:dokterId')
  async findByDokterId(
    @Param('dokterId') dokterId: string
  ) {
    let id = Number(dokterId);
    if (isNaN(id)) {
      return {message: 'success', data: []};
    }
    return {message: 'success', data: await this.jadwalPeriksaService.findByDokterId(id)};
  }

  @Post()
  async create(@Body() createJadwalPeriksaDto: CreateJadwalPeriksaDto) {

    //response has been defined  in service
    return await this.jadwalPeriksaService.create(createJadwalPeriksaDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() createJadwalPeriksaDto: CreateJadwalPeriksaDto) {
    let jadwalPeriksaId: number;

    jadwalPeriksaId = Number(id);
    if (isNaN(jadwalPeriksaId)) {
      throw new HttpException({message: 'Jadwal Periksa not found', error: 'Not Found', statusCode: 404}, HttpStatus.NOT_FOUND);
    }

    return {message: 'update berhasil', data: await this.jadwalPeriksaService.update(jadwalPeriksaId, createJadwalPeriksaDto)};
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    let jadwalPeriksaId: number;

    jadwalPeriksaId = Number(id);
    if (isNaN(jadwalPeriksaId)) {
      throw new HttpException({message: 'Jadwal Periksa not found', error: 'Not Found', statusCode: 404}, HttpStatus.NOT_FOUND);
    }

    return {message: 'delete berhasil', data: await this.jadwalPeriksaService.delete(jadwalPeriksaId)};
  }

}
