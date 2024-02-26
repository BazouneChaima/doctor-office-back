import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { findUser } from 'src/user/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('login')
  async login(@Body() userDto: findUser) {
    //throw new BadRequestException("ts")
    await this.authService.login(userDto)
  }
}
