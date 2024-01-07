import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { PoliService } from './poli.service';
import { CreatePoliDto } from './dto/create-poli.dto';
import { UpdatePoliDto } from './dto/update-poli.dto';

@Controller('poli')
export class PoliController {
  constructor(
    private readonly poliService: PoliService,
  ) {}

  @Get()
  async findAll() {
    return {message: 'success', data: await this.poliService.findAll()};
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const idPoli = Number(id);
    if (isNaN(idPoli)){
      throw new HttpException({message: 'Poli Not found', error: 'Not Found', statusCode: 404}, HttpStatus.NOT_FOUND);
    }

    return {message: 'success', data: await this.poliService.findOne(idPoli)};
  }

  @Post()
  async create(@Body() createPoliDto: CreatePoliDto) {
    return {message: 'success', data: await this.poliService.create(createPoliDto)};
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePoliDto: UpdatePoliDto
  ) {
    const idPoli = Number(id);
    if (isNaN(idPoli)){
      throw new HttpException({message: 'Poli Not found', error: 'Not Found', statusCode: 404}, HttpStatus.NOT_FOUND);
    }

    return {message: 'success', data: await this.poliService.update(idPoli, updatePoliDto)}
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const idPoli = Number(id);
    if (isNaN(idPoli)){
      throw new HttpException({message: 'Poli Not found', error: 'Not Found', statusCode: 404}, HttpStatus.NOT_FOUND);
    }

    return {message: 'Poli berhasil dihapus', data: await this.poliService.delete(idPoli)}
  }
}
