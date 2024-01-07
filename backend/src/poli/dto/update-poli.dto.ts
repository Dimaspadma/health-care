import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdatePoliDto {

  @IsOptional()
  @IsString()
  nama_poli: string;

  @IsOptional()
  @IsString()
  keterangan: string;
}