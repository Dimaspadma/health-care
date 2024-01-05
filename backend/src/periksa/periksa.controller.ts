import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { PeriksaService } from './periksa.service';
import { CreatePeriksaDto } from './dto/create-periksa.dto';

@Controller('periksa')
export class PeriksaController {
    constructor(
        private readonly periksaService: PeriksaService,
    ) {}

    @Get()
    async findAll() {
        return await this.periksaService.findAll();
    }

    @Get(':idJadwalPeriksa')
    async findOne(@Param('idJadwalPeriksa') idJadwalPeriksa: number) {
        let idNumber: number = Number(idJadwalPeriksa);
        if (isNaN(idNumber)) {
            return [];
        }
        return await this.periksaService.findOne(idNumber);
    }

    @Post()
    async create(@Body() createPeriksaDto: CreatePeriksaDto) {
        const result = await this.periksaService.create(createPeriksaDto);
        if (result) {
            return result;
        }

        throw new HttpException('Data tidak valid', HttpStatus.BAD_REQUEST);
    }
}
