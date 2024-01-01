import { IsInt, IsNotEmpty, IsString } from 'class-validator';

// Export class
export class CreateObatDto {
  @IsNotEmpty()
  @IsString()
  nama_obat: string;

  @IsNotEmpty()
  @IsString()
  kemasan: string;

  @IsNotEmpty()
  @IsInt()
  harga: number;

  @IsInt()
  stok: number;
}
