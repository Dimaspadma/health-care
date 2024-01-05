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
    return this.dokterService.findAll();
  }

  @Post('register')
  async register(@Body() registerDokterDto: RegisterDokterDto) {
    const dokter = await this.dokterService.register(registerDokterDto);
    if (dokter) {
      return 'Dokter berhasil ditambahkan';
    }
    throw new HttpException('Dokter already exists', HttpStatus.BAD_REQUEST);
  }

  @Post('login')
  async login(@Body() loginDokterDto: LoginDokterDto) {
    const dokter = await this.dokterService.login(loginDokterDto);
    if (dokter) {
      return dokter;
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
