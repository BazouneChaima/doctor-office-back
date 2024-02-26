import { IsEmail , IsNotEmpty, IsString, isNotEmpty } from "class-validator"

export class createUser {
    @IsEmail()
    @IsNotEmpty()
    email : string
    @IsString()
    @IsNotEmpty()
    username : string
    @IsString()
    @IsNotEmpty()
    firstname : string
    @IsString()
    @IsNotEmpty()
    lastname : string
    @IsString()
    @IsNotEmpty()
    password : string
}