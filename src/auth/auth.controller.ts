import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUser, findUser } from 'src/user/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('login')
  async login(@Body() userDto: findUser) {
    //throw new BadRequestException("ts")
    return await this.authService.login(userDto);
  }

  @Post('signup')
  async signup(@Body() userDto: createUser) {
    
    return await this.authService.signup(userDto);
  }
}
