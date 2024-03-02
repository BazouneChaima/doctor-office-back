import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2';
import { createUser, findUser } from 'src/user/dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(userDto: findUser) : Promise<object>{
    try {
      const user = await this.userService.findOneByEmail(userDto.email);

      if (!user) {
        throw new BadRequestException('Invalide Credentials !');
      }
      //compare user hash with the password entred
      const pwMatch = await argon.verify(user.password, userDto.password);
      if (!pwMatch) {
        throw new BadRequestException('Invalide Credentials !');
      }
      return this.signToken(user.id, user.email);
    } catch (e) {
      throw new BadRequestException('Invalide Credentials !');
      // return {msg  : "err" }
    }
  }

  async signup(userDto: createUser): Promise<object> {
    //hash the password
    userDto.password = await argon.hash(userDto.password);
    const user =  await this.userService.create(userDto);
    return this.signToken(user.id, user.email);
  }

  async logout() {}

  async signToken(userId: number, email: string)  : Promise<object>{
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.configService.get('JWT_SECRET');
    const expiresIn = this.configService.get('EXPIRES_IN');
    const token  = await this.jwtService.signAsync(payload, {
      expiresIn,
      secret,
    });
    return { 
      access_token :  token
    }
  }
}
