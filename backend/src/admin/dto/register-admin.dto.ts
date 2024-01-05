import { IsNotEmpty, IsString } from "class-validator";

export class RegisterAdminDto {

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}