import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
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
    return this.pasienService.findAll();
  }

  @Post('register')
  async register(@Body() registerPasienDto: RegisterPasienDto) {
    const pasien = await this.pasienService.register(registerPasienDto);
    if (pasien) {
      return 'pasien berhasil ditambahkan';
    }
    throw new HttpException('Pasien already exists', HttpStatus.BAD_REQUEST);
  }

  @Post('login')
  async login(@Body() loginPasienDto: LoginPasienDto) {
    const pasien = await this.pasienService.login(loginPasienDto);
    if (pasien) {
      return 'pasien berhasil login';
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
