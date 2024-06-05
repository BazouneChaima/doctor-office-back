import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PatientService } from './patient.service';
import { createPatient } from './dto/patient.dto';

@Controller('patient')
export class PatientController {
    constructor(private readonly patientService: PatientService) {}
    @Post()
    create(@Body() data: createPatient) {
      return this.patientService.create(data);
    }
  
    @Get()
    findAll() {
      return this.patientService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.patientService.findOne(+id);
    }
  
      // @Put(':id')
      // update(@Param('id') id: string, @Body() data: Prisma.DoctorUpdateInput) {
      //   return this.doctorService.update(+id, data);
      // }
  
    //   @Delete(':id')
    //   remove(@Param('id') id: string) {
    //     return this.doctorService.remove(+id);
    //   }
}
