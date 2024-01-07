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
    return await this.jadwalPeriksaRepository.find({
      relations: {
        dokter: true,
        poli: true,
        periksa: true,
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
        periksa: {
          id: true,
        },
      },  
    });
  }

  async findOne(id: number): Promise<JadwalPeriksa> {
    return this.jadwalPeriksaRepository.createQueryBuilder('jadwal_periksa')
      .leftJoinAndSelect('jadwal_periksa.poli', 'poli')
      .leftJoinAndSelect('jadwal_periksa.dokter', 'dokter')
      .where('jadwal_periksa.id = :id', {id})
      .select([
        'jadwal_periksa',
        'poli.id',
        'poli.nama_poli',
        'dokter.id',
        'dokter.nama',
      ])
      .getOne();
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
    return await this.jadwalPeriksaRepository.find({
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
      throw new HttpException({mesage:'Poli not found', error:'Bad Request', statusCode: 401}, HttpStatus.BAD_REQUEST);
    }
    const poli = await this.poliService.findOne(id_poli);
    if (!poli) {
      throw new HttpException({mesage:'Poli not found', error:'Bad Request', statusCode: 401}, HttpStatus.BAD_REQUEST);
    }

    // Check if dokter exists
    const id_dokter = Number(createJadwalPeriksaDto.id_dokter);
    if (isNaN(id_dokter)) {
      throw new HttpException({mesage:'Dokter not found', error:'Bad Request', statusCode: 401}, HttpStatus.BAD_REQUEST);
    }
    const dokter = await this.dokterService.findOneById(id_dokter);
    if (!dokter) {
      throw new HttpException({mesage:'Dokter not found', error:'Bad Request', statusCode: 401}, HttpStatus.BAD_REQUEST);
    }

    const newJadwalPeriksa = this.jadwalPeriksaRepository.create(createJadwalPeriksaDto);
    return {message: 'jadwal berhasil ditambah', data: await this.jadwalPeriksaRepository.save(newJadwalPeriksa)};
  }

  async countById(id: number): Promise<number> {
    return await this.jadwalPeriksaRepository.count({
      where: {
        id,
      },
    });
  }

  async update(id: number, createJadwalPeriksaDto: CreateJadwalPeriksaDto) {
    const jadwalPeriksa = await this.jadwalPeriksaRepository.findOneBy({id});
    if (!jadwalPeriksa) {
      throw new HttpException({message: 'Jadwal Periksa not found', error: 'Not Found', statusCode: 404}, HttpStatus.NOT_FOUND);
    }

    // Check if poli exists
    const id_poli = Number(createJadwalPeriksaDto.id_poli);
    if (isNaN(id_poli)) {
      throw new HttpException({mesage:'Poli not found', error:'Bad Request', statusCode: 401}, HttpStatus.BAD_REQUEST);
    }
    const poli = await this.poliService.findOne(id_poli);
    if (!poli) {
      throw new HttpException({mesage:'Poli not found', error:'Bad Request', statusCode: 401}, HttpStatus.BAD_REQUEST);
    }

    // Check if dokter exists
    const id_dokter = Number(createJadwalPeriksaDto.id_dokter);
    if (isNaN(id_dokter)) {
      throw new HttpException({mesage:'Dokter not found', error:'Bad Request', statusCode: 401}, HttpStatus.BAD_REQUEST);
    }
    const dokter = await this.dokterService.findOneById(id_dokter);
    if (!dokter) {
      throw new HttpException({mesage:'Dokter not found', error:'Bad Request', statusCode: 401}, HttpStatus.BAD_REQUEST);
    }

    const result = await this.jadwalPeriksaRepository.update(id, createJadwalPeriksaDto);
    if (result.affected === 0) {
      throw new HttpException({message: 'Jadwal Periksa not found', error: 'Not Found', statusCode: 404}, HttpStatus.NOT_FOUND);
    }
    return this.jadwalPeriksaRepository.findOneBy({id});
  }

  async delete(id: number) {
    const jadwalPeriksa = await this.jadwalPeriksaRepository.findOneBy({id});
    if (!jadwalPeriksa) {
      throw new HttpException({message: 'Jadwal Periksa not found', error: 'Not Found', statusCode: 404}, HttpStatus.NOT_FOUND);
    }
    try{
      const result = await this.jadwalPeriksaRepository.delete(id);

      if (result.affected === 0) {
        throw new HttpException({message: 'Jadwal Periksa not found', error: 'Not Found', statusCode: 404}, HttpStatus.NOT_FOUND);
      }
    }catch(e){
      throw new HttpException({message: 'Jadwal tidak bisa dihapus', error: 'Unauthorized', statusCode: 401}, HttpStatus.UNAUTHORIZED);
    }
    return {id: jadwalPeriksa.id};
  }

}
