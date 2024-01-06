import { Module } from '@nestjs/common';
import { PeriksaService } from './periksa.service';
import { PeriksaController } from './periksa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Periksa } from 'src/typeorm/periksa.entity';
import { PasienModule } from 'src/pasien/pasien.module';
import { JadwalPeriksaModule } from 'src/jadwal_periksa/jadwal_periksa.module';
import { DetailPeriksa } from 'src/typeorm/detail_periksa.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Periksa, DetailPeriksa]),
    PasienModule,
    JadwalPeriksaModule,
  ],
  providers: [PeriksaService],
  controllers: [PeriksaController],
  exports: [PeriksaService],
})
export class PeriksaModule {}
