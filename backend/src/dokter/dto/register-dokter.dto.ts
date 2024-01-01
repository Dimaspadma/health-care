import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDokterDto {
  @IsNotEmpty()
  @IsString()
  nip: string;

  @IsNotEmpty()
  @IsString()
  nama: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  alamat: string;

  @IsNotEmpty()
  @IsString()
  no_hp: string;
}
