import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membeli } from 'src/typeorm/membeli.entity';
import { Repository } from 'typeorm';
import { CreateMembeliDto } from './dto/create-membeli.dto';
import { ObatService } from 'src/obat/obat.service';
import { PeriksaService } from 'src/periksa/periksa.service';

@Injectable()
export class MembeliService {
  constructor(
    @InjectRepository(Membeli)
    private readonly membeliRepository: Repository<Membeli>,
    private readonly obatService: ObatService,
    private readonly periksaService: PeriksaService,
  ) {}

  findAll(): Promise<Membeli[]> {
    return this.membeliRepository.find();
  }

  findAllByPeriksa(id_periksa: number): Promise<Membeli[]> {
    return this.membeliRepository.find({
      where: {
        id_periksa: id_periksa,
      },
    });
  }

  findAllByPasien(id_pasien: number): Promise<Membeli[]> {
    return this.membeliRepository.createQueryBuilder('membeli')
        .leftJoinAndSelect('membeli.periksa', 'periksa')
        .leftJoinAndSelect('periksa.pasien', 'pasien')
        .where('pasien.id = :id_pasien', {id_pasien: id_pasien})
        .select([
          'membeli.id',
          'membeli.jumlah',
          'membeli.id_obat',
          'membeli.id_periksa',
        ])
        .getMany();
  }

  async create(createMembeliDto: CreateMembeliDto): Promise<Membeli> {
    const obat = await this.obatService.findOne(createMembeliDto.id_obat);
    if (!obat) {
      throw new HttpException({message: 'Obat not found', error: 'Not Found', statusCode: 404}, HttpStatus.NOT_FOUND);
    }

    const periksa = await this.periksaService.findOne(createMembeliDto.id_periksa);
    if (!periksa) {
      throw new HttpException({message: 'Periksa not found', error: 'Not Found', statusCode: 404}, HttpStatus.NOT_FOUND);
    }
    
    const membeli = this.membeliRepository.create(createMembeliDto);
    return this.membeliRepository.save(membeli);
  }
}
