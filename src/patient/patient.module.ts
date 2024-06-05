import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from 'src/auth/strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [PatientService , AuthService , UserService , JwtStrategy , JwtService],
  controllers: [PatientController]
})
export class PatientModule {}
