import { Module } from '@nestjs/common';
import { MembeliService } from './membeli.service';
import { MembeliController } from './membeli.controller';

@Module({
  providers: [MembeliService],
  controllers: [MembeliController]
})
export class MembeliModule {}
