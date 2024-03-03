import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { createUser } from './dto/create-user.dto';
import { findUser } from './dto/find-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtGuard } from '../auth/guards';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
    constructor (private userService : UserService){}
    
    // @Get()
    // findOne(@Body() user : findUser){ 
    //     return this.userService.findOneByEmail(user.email)
    // }

    @Get()
    findAll(){ 
        return this.userService.findAll()
    }

    
    @Get('me')
    getMe(@GetUser() user : User) {
        //console.log(req)
        return user;
    }

    // @Post('create')
    // create (@Body() userDto : createUser){ 
    //     return this.userService.create(userDto)
    // }

 
}
