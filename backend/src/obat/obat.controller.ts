import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateObatDto } from './dto/create-obat.dto';
import { ObatService } from './obat.service';
import { UpdateObatDto } from './dto/update-obat.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@Controller('obat')
export class ObatController {
  constructor(private readonly obatService: ObatService) {}

  @Get()
  async findAll(){
    return {message: 'success', data: await this.obatService.findAll()};
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // Check if id is a number
    let idNumber: number = Number(id);
    if (isNaN(idNumber)) {
      return {message: 'success', data: {}};
    }
    return {message: 'success', data: await this.obatService.findOne(idNumber)};
  }

  @Post()
  async create(@Body() createObatDto: CreateObatDto) {
    return {message: 'success', data: await this.obatService.create(createObatDto)};
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateObatDto: UpdateObatDto) {
    let result = await this.obatService.update(id, updateObatDto);
    if (result.affected === 0) {
      return {message: 'id not found', error: "Not Found", statusCode: 404};
    }
    return {message: 'data updated', data: {}};
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let result = await this.obatService.remove(id);
    if (result.affected === 0) {
      return {message: 'id not found', error: "Not Found", statusCode: 404};
    }
    return {message: 'data deleted', data: {}};
  }
}
