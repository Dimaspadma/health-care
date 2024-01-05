import { Module } from '@nestjs/common';
import { ObatController } from './obat.controller';
import { ObatService } from './obat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Obat } from 'src/typeorm/obat.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/roles/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Obat])],
  controllers: [ObatController],
  providers: [
    ObatService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
  exports: [ObatService],
})
export class ObatModule {}
