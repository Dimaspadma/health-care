import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Periksa } from 'src/typeorm/periksa.entity';
import { Repository } from 'typeorm';
import { CreatePeriksaDto } from './dto/create-periksa.dto';
import { PasienService } from 'src/pasien/pasien.service';
import { JadwalPeriksaService } from 'src/jadwal_periksa/jadwal_periksa.service';

@Injectable()
export class PeriksaService {
    constructor(
        @InjectRepository(Periksa)
        private readonly periksaRepository: Repository<Periksa>,
        private readonly pasienService: PasienService,
        private readonly jadwalPeriksaService: JadwalPeriksaService,
    ) {}

    async findAll(): Promise<Periksa[]> {
        return await this.periksaRepository.find({
            relations: {
                pasien: true,
                jadwalPeriksa: true,
            },
            
        });
    }


    async findOne(idJadwalPeriksa: number): Promise<Periksa[]> {
        return await this.periksaRepository.find({
            relations: {
                pasien: true,
                jadwalPeriksa: true,
            },
            where: {
                jadwalPeriksa: {
                    id: idJadwalPeriksa,
                },
            },
        });
    }

    async create(createPeriksaDto: CreatePeriksaDto): Promise<Periksa> {

        // Check if pasien exists
        const pasien = await this.pasienService.findOne(createPeriksaDto.id_pasien);
        if (!pasien) {
            return null;
        }

        // Check if jadwal periksa exists
        const jadwalPeriksa = await this.jadwalPeriksaService.findOne(createPeriksaDto.id_jadwal_periksa);
        if (!jadwalPeriksa) {
            return null;
        }

        // Convert string date "yyyy-mm-dd" to Date object
        const date = new Date(createPeriksaDto.tgl_periksa);
        createPeriksaDto.tgl_periksa = date;

        // Get no_antrian
        const countPeriksa = await this.jadwalPeriksaService.countById(createPeriksaDto.id_jadwal_periksa);
        createPeriksaDto.no_antrian = countPeriksa + 1;

        // Set default value of keluhan
        if (!createPeriksaDto.keluhan) {
            createPeriksaDto.keluhan = '';
        }
        
        return await this.periksaRepository.save(createPeriksaDto);
    }
    
}
