import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Periksa } from 'src/typeorm/periksa.entity';
import { In, Repository } from 'typeorm';
import { CreatePeriksaDto } from './dto/create-periksa.dto';
import { PasienService } from 'src/pasien/pasien.service';
import { JadwalPeriksaService } from 'src/jadwal_periksa/jadwal_periksa.service';
import { DetailPeriksa } from 'src/typeorm/detail_periksa.entity';
import { Who } from './who.enum';
import { CreateDetailPeriksaDto } from './dto/create-detailPeriksa.dto';

@Injectable()
export class PeriksaService {
    constructor(
        @InjectRepository(Periksa)
        private readonly periksaRepository: Repository<Periksa>,
        @InjectRepository(DetailPeriksa) private readonly detailPeriksaRepository: Repository<DetailPeriksa>,
        private readonly pasienService: PasienService,
        private readonly jadwalPeriksaService: JadwalPeriksaService,
    ) {}

    async findAll(): Promise<Periksa[]> {
        const query = this.periksaRepository.createQueryBuilder('periksa');
        query.leftJoinAndSelect('periksa.pasien', 'pasien')
        query.leftJoinAndSelect('periksa.jadwalPeriksa', 'jadwalPeriksa')
        query.leftJoinAndSelect('jadwalPeriksa.dokter', 'dokter')
        query.leftJoinAndSelect('jadwalPeriksa.poli', 'poli')
        query.leftJoinAndSelect('periksa.detailPeriksa', 'detailPeriksa')
        query.select([
                'periksa.id',
                'periksa.keluhan',
                'periksa.tgl_periksa',
                'periksa.no_antrian',
                'jadwalPeriksa.jam_mulai',
                'jadwalPeriksa.jam_selesai',
                'jadwalPeriksa.hari',
                'poli.nama_poli',
                'dokter.nama',
                'pasien.id',
                'pasien.nama',
                'detailPeriksa.catatan',
                'detailPeriksa.biaya_periksa',
            ])

        return query.getMany();
    }

    async findOne(id: number): Promise<Periksa> {
        const query = this.periksaRepository.createQueryBuilder('periksa');
        query.leftJoinAndSelect('periksa.pasien', 'pasien')
        query.leftJoinAndSelect('periksa.jadwalPeriksa', 'jadwalPeriksa')
        query.leftJoinAndSelect('jadwalPeriksa.dokter', 'dokter')
        query.leftJoinAndSelect('jadwalPeriksa.poli', 'poli')
        query.leftJoinAndSelect('periksa.detailPeriksa', 'detailPeriksa')
        query.where('periksa.id = :id', { id })
        query.select([
                'periksa.id',
                'periksa.keluhan',
                'periksa.tgl_periksa',
                'periksa.no_antrian',
                'jadwalPeriksa.jam_mulai',
                'jadwalPeriksa.jam_selesai',
                'jadwalPeriksa.hari',
                'poli.nama_poli',
                'dokter.nama',
                'pasien.id',
                'pasien.nama',
                'detailPeriksa.catatan',
                'detailPeriksa.biaya_periksa',
            ])

        return await query.getOne();
    }

    async findAllById(who: Who, check: string, id: number): Promise<Periksa[]> {
        const query = this.periksaRepository.createQueryBuilder('periksa');
        query.leftJoinAndSelect('periksa.pasien', 'pasien')
        query.leftJoinAndSelect('periksa.jadwalPeriksa', 'jadwalPeriksa')
        query.leftJoinAndSelect('jadwalPeriksa.dokter', 'dokter')
        query.leftJoinAndSelect('jadwalPeriksa.poli', 'poli')
        query.leftJoinAndSelect('periksa.detailPeriksa', 'detailPeriksa')
        if (who === Who.PASIEN) {
            query.where('pasien.id = :id', { id })
        } else if (who === Who.DOKTER) {
            query.where('dokter.id = :id', { id })
        }
        if (check === 'sudah') {
            query.andWhere('detailPeriksa.id IS NOT NULL')
        }else if (check === 'belum') {
            query.andWhere('detailPeriksa.id IS NULL')
        }
        query.select([
                'periksa.id',
                'periksa.keluhan',
                'periksa.tgl_periksa',
                'periksa.no_antrian',
                'jadwalPeriksa.id',
                'jadwalPeriksa.jam_mulai',
                'jadwalPeriksa.jam_selesai',
                'jadwalPeriksa.hari',
                'poli.id',
                'poli.nama_poli',
                'dokter.id',
                'dokter.nama',
                'pasien.id',
                'pasien.nama',
                'detailPeriksa.id',
                'detailPeriksa.catatan',
                'detailPeriksa.biaya_periksa',
            ])

        return await query.getMany();
    }

    async findAllByIdJadwalPeriksa(check: string, idJadwalPeriksa: number): Promise<Periksa[]> {
        const query = this.periksaRepository.createQueryBuilder('periksa');
        query.leftJoinAndSelect('periksa.pasien', 'pasien')
        query.leftJoinAndSelect('periksa.jadwalPeriksa', 'jadwalPeriksa')
        query.leftJoinAndSelect('jadwalPeriksa.dokter', 'dokter')
        query.leftJoinAndSelect('jadwalPeriksa.poli', 'poli')
        query.leftJoinAndSelect('periksa.detailPeriksa', 'detailPeriksa')
        query.where('jadwalPeriksa.id = :idJadwalPeriksa', { idJadwalPeriksa })
        if (check === 'sudah') {
            query.andWhere('detailPeriksa.id IS NOT NULL')
        }else if (check === 'belum') {
            query.andWhere('detailPeriksa.id IS NULL')
        }
        query.select([
                'periksa.id',
                'periksa.keluhan',
                'periksa.tgl_periksa',
                'periksa.no_antrian',
                'jadwalPeriksa.id',
                'jadwalPeriksa.jam_mulai',
                'jadwalPeriksa.jam_selesai',
                'jadwalPeriksa.hari',
                'poli.id',
                'poli.nama_poli',
                'dokter.id',
                'dokter.nama',
                'pasien.id',
                'pasien.nama',
                'detailPeriksa.id',
                'detailPeriksa.catatan',
                'detailPeriksa.biaya_periksa',
            ])

        return await query.getMany();
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

    async createDetailPeriksa(createDetailPeriksaDto: CreateDetailPeriksaDto): Promise<DetailPeriksa> {
        const periksa = await this.findOne(createDetailPeriksaDto.id_periksa);
        if (!periksa) {
            return null;
        }
        if (periksa.detailPeriksa) {
            return null;
        }
        const detailPeriksa = this.detailPeriksaRepository.create(createDetailPeriksaDto);
        return this.detailPeriksaRepository.save(detailPeriksa);
    }
    
}
