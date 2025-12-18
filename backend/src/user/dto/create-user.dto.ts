import { IsString, IsEnum } from 'class-validator';
import { genderType } from '../types/types';

export class CreateUserDto {

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsEnum(genderType)
    gender: genderType;

    @IsString()
    fullName: string;

    fullNameGenerator(): string {
        return this.firstName + this.lastName
    }
}
