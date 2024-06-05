import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/response/dto';
import { createPatient } from './dto/patient.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';

import * as argon from 'argon2';

@Injectable()
export class PatientService {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  async create(data: createPatient) {
    try {
      const { name,dateOfBirth,address,   ...result } = data;
      const { username, firstname, lastname, ...patientData } = data;
      const patient = await this.prisma.patient.create({
        data: {
            ...patientData,
            dateOfBirth: new Date(dateOfBirth),
          user: {
            create: {
              role: 'PATIENT',
              ...result,
              password: await argon.hash(data.password),
            },
          },
        },
      });
      const token = await this.authService.signToken(
        patient.userId,
        patient.email,
      );
      return new ApiResponse('success', { patient, access_token: token });
    } catch (e) {
      console.log('insde patient' + e);
      return new ApiResponse('error', 'Invalid data !', '401');
    }
  }

  async findAll() {
    return this.prisma.patient.findMany();
  }

  async findOne(id: number) {
    return this.prisma.patient.findUnique({
      where: { id },
    });
  }

  // async update(id: number, data: Prisma.DoctorUpdateInput) {
  //   return this.prisma.doctor.update({
  //     where: { id },
  //     data,
  //   });
  // }

  // async remove(id: number) {
  //   return this.prisma.doctor.delete({
  //     where: { id },
  //   });
  // }
}
