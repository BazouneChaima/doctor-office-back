import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { createDoctor } from './dto/doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  create(@Body() data: createDoctor) {
    return this.doctorService.create(data);
  }

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
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
