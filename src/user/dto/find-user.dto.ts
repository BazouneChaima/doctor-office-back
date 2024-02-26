import { IsEmail , IsNotEmpty, IsString, isNotEmpty } from "class-validator"

export class findUser {
    @IsEmail()
    @IsNotEmpty()
    email : string
    @IsString()
    @IsNotEmpty()
    password : string
}