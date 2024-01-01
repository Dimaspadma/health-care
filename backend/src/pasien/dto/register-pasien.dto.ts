import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterPasienDto {
  @IsNotEmpty()
  @IsString()
  nama: string;

  @IsNotEmpty()
  @IsString()
  alamat: string;

  @IsNotEmpty()
  @IsString()
  no_ktp: string;

  @IsNotEmpty()
  @IsString()
  no_hp: string;

  no_rm: string;
}
