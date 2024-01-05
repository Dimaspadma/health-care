import { IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreatePeriksaDto {
    @IsNotEmpty()
    @IsInt()
    id_pasien: number;

    @IsNotEmpty()
    @IsInt()
    id_jadwal_periksa: number;

    @IsNotEmpty()
    tgl_periksa: Date;

    keluhan: string;

    no_antrian: number;
}