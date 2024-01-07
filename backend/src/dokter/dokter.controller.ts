import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { DokterService } from './dokter.service';
import { RegisterDokterDto } from './dto/register-dokter.dto';
import { LoginDokterDto } from './dto/login-dokter.dto';

@Controller('dokter')
export class DokterController {
  constructor(private readonly dokterService: DokterService) {}

  @Get()
  async findAll() {
    return {message: 'success', data: await this.dokterService.findAll()};
  }

  @Post('register')
  async register(@Body() registerDokterDto: RegisterDokterDto) {
    const dokter = await this.dokterService.register(registerDokterDto);
    if (dokter) {
      return {message: 'berhasil register', data: {id: dokter.id, nama: dokter.nama}};
    }
    throw new HttpException({message: 'Dokter already exists', error: 'Bad Request', statusCode: 400}, HttpStatus.BAD_REQUEST);
  }

  @Post('login')
  async login(@Body() loginDokterDto: LoginDokterDto) {
    const dokter = await this.dokterService.login(loginDokterDto);
    if (dokter) {
      return {message: 'berhasil login', data: dokter};
    }
    throw new HttpException({message: 'Login tidak berhasil', error: 'Unauthorized', statusCode: 401}, HttpStatus.UNAUTHORIZED);
  }
}
