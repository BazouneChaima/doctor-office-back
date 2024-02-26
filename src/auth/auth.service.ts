import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2';
import { createUser, findUser } from 'src/user/dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(userDto: findUser) : Promise<User> {
    try{ 
        const user =  await this.userService.findOneByEmail(userDto.email)
        
        if (!user){ 
            throw new BadRequestException('Invalide Credentials !')
        }
        //compare user hash with the password entred 
        const pwMatch = await argon.verify(
            user.password,
            userDto.password
        ) 
        if (!pwMatch){
            throw new BadRequestException('Invalide Credentials !')
        }
        console.log("test" + JSON.stringify(user));

        return user
    }catch (e){
        throw new BadRequestException('Invalide Credentials !')
        // return {msg  : "err" }
    }
    
  }

  async signup(user: createUser) : Promise<User> {
    //hash the password
    user.password = await argon.hash(user.password);
    return await this.userService.create(user);
  }

  async logout() {}
}
