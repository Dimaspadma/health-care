import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDokterDto {
  @IsNotEmpty()
  @IsString()
  nama: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
