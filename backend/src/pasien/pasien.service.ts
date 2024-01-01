import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pasien } from 'src/typeorm/pasien.entity';
import { ILike, Repository } from 'typeorm';
import { LoginPasienDto } from './dto/login-pasien.dto';
import { RegisterPasienDto } from './dto/register-pasien.dto';

@Injectable()
export class PasienService {
  constructor(
    @InjectRepository(Pasien)
    private readonly pasienRepository: Repository<Pasien>,
  ) {}

  async register(registerPasienDto: RegisterPasienDto) {
    // Check if pasien already exists by no_ktp
    const pasien = await this.pasienRepository.findOneBy({
      no_ktp: registerPasienDto.no_ktp,
    });

    // If pasien already exists, throw error
    if (pasien) {
      return null;
    }

    // count pasien
    const countPasien = await this.pasienRepository.count();

    // Get date now with format yyyymm
    const date = new Date();
    const dateNow = `${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}`;

    registerPasienDto.no_rm = `${dateNow}-${(countPasien + 1)
      .toString()
      .padStart(3, '0')}`;

    const newPasien = this.pasienRepository.create(registerPasienDto);
    return this.pasienRepository.save(newPasien);
  }

  // login pasien by nama and no_ktp
  async login(loginPasienDto: LoginPasienDto) {
    const pasien = await this.pasienRepository.findOneBy({
      nama: ILike(loginPasienDto.nama),
      no_ktp: loginPasienDto.no_ktp,
    });
    if (pasien) {
      return pasien;
    }
    return null;
  }
}
