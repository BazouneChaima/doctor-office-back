import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createDoctor } from './dto/doctor.dto';
import { AuthService } from 'src/auth/auth.service';
import { ApiResponse } from 'src/response/dto';

import * as argon from 'argon2';

@Injectable()
export class DoctorService {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  async create(data: createDoctor) {
    try {
      const { name, specialization, ...result } = data;
      //const { user, token } = await this.authService.create(result);
      //console.log('here');
      //const doctorData = { user: user, ...data };
      const {username,firstname , lastname, ...doctorData} = data
      const doctor = await this.prisma.doctor.create({
        data: {
          ...doctorData,
          user: {
            create: {
              role: 'DOCTOR',
              ...result,
              password: await argon.hash(data.password),
            },
          },
        },
      });
      const token = await this.authService.signToken(doctor.userId, doctor.email);
      return new ApiResponse('success', { doctor, access_token: token });
    } catch (e) {
      console.log('insde doctore' + e);
      return new ApiResponse('error', 'Invalid data !', '401');
    }
  }

    async findAll() {
      return this.prisma.doctor.findMany();
    }

    async findOne(id: number) {
      return this.prisma.doctor.findUnique({
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
