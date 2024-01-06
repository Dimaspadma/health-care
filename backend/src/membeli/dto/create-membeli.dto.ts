import { IsInt, IsNotEmpty } from "class-validator";

export class CreateMembeliDto {

    @IsNotEmpty()
    @IsInt()
    id_obat: number;

    @IsNotEmpty()
    @IsInt()
    id_periksa: number;

    @IsNotEmpty()
    @IsInt()
    jumlah: number;
}