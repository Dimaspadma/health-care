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

@Module({
  imports: [
    ObatModule,
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
        entities: [Obat, Pasien, Dokter],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    PasienModule,
    DokterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
