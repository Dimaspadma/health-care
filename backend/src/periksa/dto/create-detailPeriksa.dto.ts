import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateDetailPeriksaDto {
    @IsNotEmpty()
    @IsInt()
    id_periksa: number;

    catatan: string;

    @IsNotEmpty()
    @IsInt()
    biaya_periksa: number;
}