import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class createDoctor {
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
  specialization: string;
}


// export class updateDoctor { 
//   @IsString()
//   @IsNotEmpty()
//   name: string;
//   @IsEmail()
//   @IsNotEmpty()
//   email: string;
//   @IsString()
//   @IsNotEmpty()
//   username: string;
//   @IsString()
//   @IsNotEmpty()
//   firstname: string;
//   @IsString()
//   @IsNotEmpty()
//   lastname: string;
//   @IsString()
//   @IsNotEmpty()
//   password: string;
//   @IsString()
//   @IsNotEmpty()
//   specialization: string;
// }