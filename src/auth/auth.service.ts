import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2';
import { createUser, findUser } from 'src/user/dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ApiResponse } from 'src/response/dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(userDto: findUser): Promise<object> {
    try {
      const user = await this.userService.findOneByEmail(userDto.email);

      if (!user) {
        throw new BadRequestException(
          new ApiResponse('error', null, 'Invalide Credentials !', 400),
        );
      }
      //compare user hash with the password entred
      const pwMatch = await argon.verify(user.password, userDto.password);
      if (!pwMatch) {
        throw new BadRequestException(
          new ApiResponse('error', null, 'Invalide Credentials !', 400),
        );
      }
      const token = await this.signToken(user.id, user.email);
      delete user.password;

      return new ApiResponse('success', { user: user, access_token: token });
    } catch (e) {
      throw new UnauthorizedException(
        new ApiResponse('error', null, 'Invalide Credentials !', 401),
      );
      //return new ApiResponse('error', null, 'Invalide Credentials !', 401);
    }
  }

  async signup(userDto: createUser): Promise<object> {
    //hash the password
    userDto.password = await argon.hash(userDto.password);
    const user = await this.userService.create(userDto);
    const token = await this.signToken(user.id, user.email);
    delete user.password;
    return new ApiResponse('success', { user: user, access_token: token });
  }

  async create(userDto: createUser): Promise<{user , token}> {
    //hash the password
    userDto.password = await argon.hash(userDto.password);
    const user = await this.userService.create(userDto);
    
    const token = await this.signToken(user.id, user.email);
    return {user, token}
  }
  

  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.configService.get('JWT_SECRET');
    const expiresIn = this.configService.get('EXPIRES_IN');
    const token = await this.jwtService.signAsync(payload, {
      expiresIn,
      secret,
    });
    return token;
  }
}
