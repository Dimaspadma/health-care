import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Poli } from 'src/typeorm/poli.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PoliService {
  constructor(
    @InjectRepository(Poli) private readonly poliRepository: Repository<Poli>,
  ) {}

  findAll(): Promise<Poli[]> {
    return this.poliRepository.find();
  }

  findOne(id: number): Promise<Poli> {
    return this.poliRepository.findOneBy({
      id: id,
    });
  }
}
