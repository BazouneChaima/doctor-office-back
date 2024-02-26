import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createUser } from './dto/create-user.dto';
import { findUser } from './dto/find-user.dto';

@Controller('user')
export class UserController {
    constructor (private userService : UserService){}
    
    @Get()
    findOne(@Body() user : findUser){ 
        return this.userService.findOneByEmail(user.email)
    }

    @Post('create')
    create (@Body() userDto : createUser){ 
        return this.userService.create(userDto)
    }

 
}
