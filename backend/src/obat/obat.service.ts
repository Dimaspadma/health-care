import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Obat } from 'src/typeorm/obat.entity';
import { CreateObatDto } from './dto/create-obat.dto';

@Injectable()
export class ObatService {
  constructor(
    @InjectRepository(Obat) private readonly obatRepository: Repository<Obat>,
  ) {}

  create(createObatDto: CreateObatDto) {
    const newObat = this.obatRepository.create(createObatDto);
    return this.obatRepository.save(newObat);
  }

  findAll(): Promise<Obat[]> {
    return this.obatRepository.find();
  }

  update(id: string, updateObatDto: CreateObatDto) {
    return this.obatRepository.update(id, updateObatDto);
  }
}
