import { Module } from '@nestjs/common';
import { PoliService } from './poli.service';
import { PoliController } from './poli.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poli } from 'src/typeorm/poli.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Poli])],
  controllers: [PoliController],
  providers: [PoliService],
  exports: [PoliService],
})
export class PoliModule {}
