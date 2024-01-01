import { Module } from '@nestjs/common';
import { ObatController } from './obat.controller';
import { ObatService } from './obat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Obat } from 'src/typeorm/obat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Obat])],
  controllers: [ObatController],
  providers: [ObatService],
  exports: [ObatService],
})
export class ObatModule {}
