import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateObatDto } from './dto/create-obat.dto';
import { ObatService } from './obat.service';
import { UpdateObatDto } from './dto/update-obat.dto';

@Controller('obat')
export class ObatController {
  constructor(private readonly obatService: ObatService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.obatService.findAll();
  }

  @Post()
  async create(@Body() createObatDto: CreateObatDto) {
    return this.obatService.create(createObatDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateObatDto: UpdateObatDto) {
    return this.obatService.update(id, updateObatDto);
  }
}
