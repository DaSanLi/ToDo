import { genderType } from "../types/types";
export declare class CreateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    gender: genderType;
    fullName?: string;
}
