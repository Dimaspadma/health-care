import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dokter } from 'src/typeorm/dokter.entity';
import { ILike, Repository } from 'typeorm';
import { RegisterDokterDto } from './dto/register-dokter.dto';
import { LoginDokterDto } from './dto/login-dokter.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DokterService {
  constructor(
    @InjectRepository(Dokter)
    private readonly dokterRepository: Repository<Dokter>,
    private jwtService: JwtService,
  ) {}

  async findOne(name: string) {
    return this.dokterRepository.findOneBy({
      nama: ILike(name),
    });
  }

  async register(registerDokterDto: RegisterDokterDto) {
    // Check if dokter already exists by no_ktp
    const dokter = await this.dokterRepository.findOneBy({
      nama: registerDokterDto.nama,
    });

    // If dokter already exists, throw error
    if (dokter) {
      return null;
    }

    // Hash password
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(registerDokterDto.password, saltOrRounds);

    registerDokterDto.password = hash;

    const newPasien = this.dokterRepository.create(registerDokterDto);
    return this.dokterRepository.save(newPasien);
  }

  // login dokter by nama and password
  async login(loginDokterDto: LoginDokterDto) {
    // Compare hash password
    const dokter = await this.dokterRepository.findOneBy({
      nama: ILike(loginDokterDto.nama),
    });
    if (dokter) {
      const match = await bcrypt.compare(
        loginDokterDto.password,
        dokter.password,
      );
      if (match) {
        const payload = { sub: dokter.id, name: dokter.nama, role: 'dokter' };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    }
    return null;
  }
}
