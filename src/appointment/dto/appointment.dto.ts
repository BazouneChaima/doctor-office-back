import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class createAppointment {
  @IsDateString()
  @IsNotEmpty()
  date: string;
  @IsDateString()
  @IsNotEmpty()
  time: string;
  @IsString()
  @IsNotEmpty()
  reason: string;
  @IsNumber()
  @IsNotEmpty()
  patientId: number;
  @IsNumber()
  @IsNotEmpty()
  doctorId: number;
}

export class updateAppointment {
  @IsDateString()
  @IsNotEmpty()
  date: string;
  @IsDateString()
  @IsNotEmpty()
  time: string;
  @IsString()
  @IsNotEmpty()
  reason: string;
  @IsNumber()
  @IsNotEmpty()
  patientId: number;
  @IsNumber()
  @IsNotEmpty()
  doctorId: number;
}
