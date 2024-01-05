import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JadwalPeriksa } from 'src/typeorm/jadwal_periksa.entity';
import { Repository } from 'typeorm';
import { CreateJadwalPeriksaDto } from './dto/create-jadwal_periksa.dto';
import { PoliService } from 'src/poli/poli.service';
import { DokterService } from 'src/dokter/dokter.service';

@Injectable()
export class JadwalPeriksaService {
  constructor(
    @InjectRepository(JadwalPeriksa) private readonly jadwalPeriksaRepository: Repository<JadwalPeriksa>,
    private readonly poliService: PoliService,
    private readonly dokterService: DokterService,
  ) {}

  async findAll(): Promise<JadwalPeriksa[]> {
    return this.jadwalPeriksaRepository.find({
      relations: {
        dokter: true,
        poli: true,
      },
      select : {
        dokter: {
          id: true,
          nama: true,
        },
        poli: {
          id: true,
          nama_poli: true,
        },
      },  
    });
  }

  async findOne(id: number): Promise<JadwalPeriksa> {
    return this.jadwalPeriksaRepository.findOneBy({ id });
  }

  async findByPoliId(poliId: number): Promise<JadwalPeriksa[]> {
    return this.jadwalPeriksaRepository.find({
      relations: {
        dokter: true,
        poli: true,
      },
      select : {
        dokter: {
          id: true,
          nama: true,
        },
        poli: {
          id: true,
          nama_poli: true,
        },
      },
      where: {
        poli: {
          id: poliId,
        },
      },
    });
  }

  async findByDokterId(dokterId: number): Promise<JadwalPeriksa[]> {
    return this.jadwalPeriksaRepository.find({
      relations: {
        dokter: true,
        poli: true,
      },
      select : {
        dokter: {
          id: true,
          nama: true,
        },
        poli: {
          id: true,
          nama_poli: true,
        },
      },
      where: {
        dokter: {
          id: dokterId,
        },
      },
    });
  }

  async create(createJadwalPeriksaDto: CreateJadwalPeriksaDto) {

    // Check if poli exists
    const id_poli = Number(createJadwalPeriksaDto.id_poli);
    if (isNaN(id_poli)) {
      throw new HttpException('Poli not found', HttpStatus.NOT_FOUND);
    }
    const poli = await this.poliService.findOne(id_poli);
    if (!poli) {
      throw new HttpException('Poli not found', HttpStatus.NOT_FOUND);
    }

    // Check if dokter exists
    const id_dokter = Number(createJadwalPeriksaDto.id_dokter);
    if (isNaN(id_dokter)) {
      throw new HttpException('Dokter not found', HttpStatus.NOT_FOUND);
    }
    const dokter = await this.dokterService.findOneById(id_dokter);
    if (!dokter) {
      throw new HttpException('Dokter not found', HttpStatus.NOT_FOUND);
    }

    const newJadwalPeriksa = this.jadwalPeriksaRepository.create(createJadwalPeriksaDto);
    return this.jadwalPeriksaRepository.save(newJadwalPeriksa);
  }

  async countById(id: number): Promise<number> {
    return this.jadwalPeriksaRepository.count({
      where: {
        id,
      },
    });
  }
}
