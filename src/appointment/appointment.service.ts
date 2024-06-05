import { Injectable } from '@nestjs/common';
import { createAppointment, updateAppointment } from './dto/appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/response/dto';

@Injectable()
export class AppointmentService {
    constructor(
        private prisma: PrismaService,
      ) {}
    
      async create(data: createAppointment) {
        try {
            if(!(await this.prisma.patient.findFirst({where:{id:data.patientId}}))){
                return new ApiResponse('error', 'Patient Not Found', '404');
            }
            if(!(await this.prisma.doctor.findFirst({where:{id:data.patientId}}))){
                return new ApiResponse('error', 'Doctor Not Found', '404');
            }
          const appointment = await this.prisma.appointment.create({data:{...data, active: 'active',date:new Date(data.date)}})
          return new ApiResponse('success', { appointment });
        } catch (e) {
          console.log('insde appointment' + e);
          return new ApiResponse('error', 'Invalid data !', '401');
        }
      }
    
      async findAll() {
        return this.prisma.appointment.findMany();
      }
    
      async findOne(id: number) {
        return this.prisma.appointment.findUnique({
          where: { id },
        });
      }
    
      async update(id: number, data: updateAppointment) {
        return this.prisma.appointment.update({
          where: { id },
          data:{...data, date:new Date(data.date)},
        });
      }
    
      async cancel(id: number) {
        return this.prisma.appointment.update({
            where: { id },
            data:{ active :'canceled'},
          });
      }
}
