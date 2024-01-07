import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Poli } from 'src/typeorm/poli.entity';
import { Repository } from 'typeorm';
import { CreatePoliDto } from './dto/create-poli.dto';
import { UpdatePoliDto } from './dto/update-poli.dto';

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

  async create(updatePoliDto: UpdatePoliDto): Promise<Poli> {
    const poli = this.poliRepository.create(updatePoliDto);
    return this.poliRepository.save(poli);
  }

  async update(id: number, updatePoliDto: UpdatePoliDto): Promise<Poli> {

    const poli = await this.poliRepository.findOneBy({id});
    if (!poli) {
      throw new HttpException({message: 'Poli Not found', error: 'Not Found', statusCode: 404}, HttpStatus.NOT_FOUND);
    }

    const updatedPoli = this.poliRepository.create(updatePoliDto);
    await this.poliRepository.update(id, updatedPoli);
    return this.poliRepository.findOneBy({id});
  }

  async delete(id: number): Promise<Poli> {
    const poli = await this.poliRepository.findOneBy({id});
    if (!poli) {
      throw new HttpException({message: 'Poli Not found', error: 'Not Found', statusCode: 404}, HttpStatus.NOT_FOUND);
    }

    await this.poliRepository.delete(id);
    return poli;
  }
}
