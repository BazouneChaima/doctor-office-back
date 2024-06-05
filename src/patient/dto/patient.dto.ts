import { Type } from 'class-transformer';
import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class createPatient {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  firstname: string;
  @IsString()
  @IsNotEmpty()
  lastname: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  address: string;
  //@Type(() => Date)
  @IsDateString()
  dateOfBirth: string;
}
