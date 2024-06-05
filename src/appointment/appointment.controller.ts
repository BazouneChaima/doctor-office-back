import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { createAppointment, updateAppointment } from './dto/appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}
  @Post()
  create(@Body() data: createAppointment) {
    return this.appointmentService.create(data);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: updateAppointment) {
    return this.appointmentService.update(+id, data);
  }

  @Patch(':id')
  cancel(@Param('id') id: string) {
    return this.appointmentService.cancel(+id);
  }
}
