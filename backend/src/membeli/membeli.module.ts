import { Module } from '@nestjs/common';
import { MembeliService } from './membeli.service';
import { MembeliController } from './membeli.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membeli } from 'src/typeorm/membeli.entity';
import { ObatModule } from 'src/obat/obat.module';
import { PeriksaModule } from 'src/periksa/periksa.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Membeli]),
    ObatModule,
    PeriksaModule,
  ],
  providers: [MembeliService],
  controllers: [MembeliController]
})
export class MembeliModule {}
