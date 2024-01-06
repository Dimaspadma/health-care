import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { PeriksaService } from './periksa.service';
import { CreatePeriksaDto } from './dto/create-periksa.dto';
import { Who } from './who.enum';
import { CreateDetailPeriksaDto } from './dto/create-detailPeriksa.dto';

@Controller('periksa')
export class PeriksaController {
    constructor(
        private readonly periksaService: PeriksaService,
    ) {}

    @Get()
    async findAll() {
        return {message: 'success', data: await this.periksaService.findAll()};
    }

    @Get('detail/:id')
    async findOne(@Param('id') id: string) {
        const idPeriksa = Number(id);
        if (isNaN(idPeriksa)) {
            return {message: 'success', data: {}};
        }
        const periksa = await this.periksaService.findOne(idPeriksa);
        if (periksa) {
            return {message: 'success', data: periksa};
        }
        throw new HttpException({message: ['Periksa tidak ditemukan'], error: 'Not Found', statusCode: 404}, HttpStatus.NOT_FOUND);
    }

    @Get(':idJadwalPeriksa')
    async findAllByIdJadwalPeriksa(
        @Param('idJadwalPeriksa') idJadwalPeriksa: number,
        @Query('check') check: string,
    ) {
        let idNumber: number = Number(idJadwalPeriksa);
        if (isNaN(idNumber)) {
            return { message: 'success', data: []};
        }
        return {message: 'success', data: await this.periksaService.findAllByIdJadwalPeriksa(check, idNumber), };
    }

    @Get('pasien/:idPasien')
    async findAllByIdPasien(
        @Param('idPasien') idPasien: number,
        @Query('check') check: string,
    ) {
        let idNumber: number = Number(idPasien);
        if (isNaN(idNumber)) {
            return {message: 'success', data: []};
        }
        return {message: 'success', data: await this.periksaService.findAllById(Who.PASIEN ,check, idNumber)};
    }

    @Get('dokter/:idDokter')
    async findAllByIdDokter(
        @Param('idDokter') idDokter: number,
        @Query('check') check: string,
    ) {
        let idNumber: number = Number(idDokter);
        if (isNaN(idNumber)) {
            return {message: 'success', data: []};
        }
        return {message: 'success' ,data: await this.periksaService.findAllById(Who.DOKTER, check, idNumber)};
    }

    @Post()
    async create(@Body() createPeriksaDto: CreatePeriksaDto) {
        const result = await this.periksaService.create(createPeriksaDto);
        if (result) {
            return {message: 'success create periksa', data: result, };
        }

        throw new HttpException({message: ['Data tidak valid'], error: "Bad Request", statusCode: 400}, HttpStatus.BAD_REQUEST);
    }

    @Post('sudah')
    async createDetailPeriksa(@Body() createDetailPeriksa: CreateDetailPeriksaDto){
        const result = await this.periksaService.createDetailPeriksa(createDetailPeriksa);
        if (result) {
            return {message: 'success create detail periksa', data: result, };
        }

        throw new HttpException({message: ['Data tidak valid'], error: "Bad Request", statusCode: 400}, HttpStatus.BAD_REQUEST);
    } 

}