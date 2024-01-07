import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePoliDto {

  @IsNotEmpty()
  @IsString()
  nama_poli: string;

  @IsOptional()
  @IsString()
  keterangan: string;
}