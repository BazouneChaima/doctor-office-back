import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from 'src/auth/strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule],
  providers: [DoctorService , AuthService , UserService , JwtStrategy , JwtService],
  controllers: [DoctorController],
})
export class DoctorModule {}
