import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { LoginPasienDto } from './dto/login-pasien.dto';
import { PasienService } from './pasien.service';
import { RegisterPasienDto } from './dto/register-pasien.dto';

@Controller('pasien')
export class PasienController {
  constructor(private readonly pasienService: PasienService) {}

  @Get()
  async findAll() {
    return {message: ['list pasien','(for debugging only)'], data: await this.pasienService.findAll()};
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: string) {
    const idPasien = Number(id);
    if (isNaN(idPasien)) {
      return {message: 'detail pasien', data: []};
    }
    const pasien = await this.pasienService.findOne(idPasien);
    if (pasien) {
      return {message: 'detail pasien', data: [pasien]};
    }
    throw new HttpException({message: ['Pasien tidak ditemukan'], error: 'Not Found', statusCode: 404}, HttpStatus.NOT_FOUND);
  }

  @Post('register')
  async register(@Body() registerPasienDto: RegisterPasienDto) {
    const pasien = await this.pasienService.register(registerPasienDto);
    if (pasien) {
      return {message: 'pasien berhasil ditambahkan', data: [{id:pasien.id, nama:pasien.nama}]};
    }
    throw new HttpException({message: ['no_ktp sudah terdaftar'], error: 'Bad Request', statusCode: 400}, HttpStatus.BAD_REQUEST);
  }

  @Post('login')
  async login(@Body() loginPasienDto: LoginPasienDto) {
    const pasien = await this.pasienService.login(loginPasienDto);
    if (pasien) {
      return {message: 'berhasil login', data: {id:pasien.id, nama:pasien.nama}};
    }
    throw new HttpException({message: ['Pasien tidak ditemukan'], error: 'Unauhorized', statusCode: 401}, HttpStatus.UNAUTHORIZED);
  }
}
