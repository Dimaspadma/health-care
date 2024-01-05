import { IsInt, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/roles/role.enum';

// Export class for update
export class UpdateObatDto {
  @IsOptional()
  @IsString()
  nama_obat: string;

  @IsOptional()
  @IsString()
  kemasan: string;

  @IsOptional()
  @IsInt()
  harga: number;

  @IsOptional()
  @IsInt()
  stok: number;

  roles: Role[];
}
