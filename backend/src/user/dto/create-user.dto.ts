import { IsEmail, IsString } from "class-validator";
import { genderType } from "../types/types";

export class CreateUserDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    gender: genderType;

    //creado el campo dentro del servicio
    fullName?: string;
}
