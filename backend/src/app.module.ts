import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ObatModule } from './obat/obat.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Obat } from './typeorm/obat.entity';
import { PasienModule } from './pasien/pasien.module';
import { Pasien } from './typeorm/pasien.entity';
import { DokterModule } from './dokter/dokter.module';
import { Dokter } from './typeorm/dokter.entity';
import { JadwalPeriksaModule } from './jadwal_periksa/jadwal_periksa.module';
import { JadwalPeriksa } from './typeorm/jadwal_periksa.entity';
import { PoliModule } from './poli/poli.module';
import { Poli } from './typeorm/poli.entity';
import { AdminModule } from './admin/admin.module';
import { Admin } from './typeorm/admin.entity';
import { PeriksaModule } from './periksa/periksa.module';
import { Periksa } from './typeorm/periksa.entity';
import { MembeliModule } from './membeli/membeli.module';
import { DetailPeriksa } from './typeorm/detail_periksa.entity';
import { Membeli } from './typeorm/membeli.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [Obat, Pasien, Dokter, JadwalPeriksa, Poli, Admin, Periksa, DetailPeriksa, Membeli],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ObatModule,
    PasienModule,
    DokterModule,
    JadwalPeriksaModule,
    PoliModule,
    AdminModule,
    PeriksaModule,
    MembeliModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
