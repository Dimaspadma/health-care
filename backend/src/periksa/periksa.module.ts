import { Module } from '@nestjs/common';
import { PeriksaService } from './periksa.service';
import { PeriksaController } from './periksa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Periksa } from 'src/typeorm/periksa.entity';
import { PasienModule } from 'src/pasien/pasien.module';
import { JadwalPeriksaModule } from 'src/jadwal_periksa/jadwal_periksa.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Periksa]),
    PasienModule,
    JadwalPeriksaModule,
  ],
  providers: [PeriksaService],
  controllers: [PeriksaController]
})
export class PeriksaModule {}
