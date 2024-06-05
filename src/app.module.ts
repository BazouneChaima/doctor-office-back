import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { MedicalHistoryModule } from './medical-history/medical-history.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot(),
    DoctorModule,
    PatientModule,
    AppointmentModule,
    PrescriptionModule,
    MedicalHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
