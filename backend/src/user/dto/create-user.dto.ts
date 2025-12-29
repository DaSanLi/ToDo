import { IsEmail, IsString } from "class-validator";
import { genderType } from "../types/types";

export class CreateUserDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;
    
    @IsString()
    gender: genderType;
    
    @IsString()
    fullName: string;
}
