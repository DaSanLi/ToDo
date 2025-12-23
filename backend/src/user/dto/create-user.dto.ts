<<<<<<< HEAD
import { IsString, IsEnum } from 'class-validator';
import { genderType } from '../types/types';
=======
import { IsEmail, IsString } from "class-validator";
import { genderType } from "../types/types";
>>>>>>> dev

export class CreateUserDto {

    @IsString()
<<<<<<< HEAD
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
=======
    @IsEmail()
>>>>>>> dev
    email: string;

    @IsString()
    password: string;
<<<<<<< HEAD

    @IsEnum(genderType)
    gender: genderType;

    @IsString()
    fullName: string;

    fullNameGenerator(): string {
        return this.firstName + this.lastName
    }
=======
    
    @IsString()
    gender: genderType;
    
    @IsString()
    fullName?: string;
>>>>>>> dev
}
