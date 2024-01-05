import { IsInt, IsMilitaryTime, IsNotEmpty, IsString } from "class-validator";

// Export class
export class CreateJadwalPeriksaDto {
  @IsNotEmpty()
  @IsString()
  hari: string;

  @IsNotEmpty()
  @IsMilitaryTime()
  jam_mulai: Date;

  @IsNotEmpty()
  @IsMilitaryTime()
  jam_selesai: Date;

  @IsNotEmpty()
  @IsInt()
  id_dokter: number;

  @IsNotEmpty()
  @IsInt()
  id_poli: number;
}