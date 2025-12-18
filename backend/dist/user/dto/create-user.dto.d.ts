import { genderType } from '../types/types';
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: genderType;
    fullName: string;
    fullNameGenerator(): string;
}
