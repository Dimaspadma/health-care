import { Module } from '@nestjs/common';
import { JadwalPeriksaService } from './jadwal_periksa.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JadwalPeriksa } from 'src/typeorm/jadwal_periksa.entity';
import { JadwalPeriksaController } from './jadwal_periksa.controller';
import { PoliModule } from 'src/poli/poli.module';
import { DokterModule } from 'src/dokter/dokter.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([JadwalPeriksa]),
    PoliModule,
    DokterModule,
  ],
  controllers: [JadwalPeriksaController],
  providers: [JadwalPeriksaService],
  exports: [JadwalPeriksaService],
})
export class JadwalPeriksaModule {}
