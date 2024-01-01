import { Module } from '@nestjs/common';
import { DokterController } from './dokter.controller';
import { DokterService } from './dokter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dokter } from 'src/typeorm/dokter.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Dokter]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [DokterController],
  providers: [DokterService],
})
export class DokterModule {}
