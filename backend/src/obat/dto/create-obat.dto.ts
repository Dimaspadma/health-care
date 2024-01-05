import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/roles/role.enum';

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

  roles: Role[];
}
