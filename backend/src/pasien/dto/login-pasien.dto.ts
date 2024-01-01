import { IsNotEmpty, IsString } from 'class-validator';

export class LoginPasienDto {
  @IsNotEmpty()
  @IsString()
  nama: string;

  @IsNotEmpty()
  @IsString()
  no_ktp: string;
}
