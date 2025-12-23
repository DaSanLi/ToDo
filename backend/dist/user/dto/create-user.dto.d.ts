import { genderType } from "../types/types";
export declare class CreateUserDto {
    email: string;
    password: string;
    gender: genderType;
    fullName?: string;
}
