import { genderType } from "../types/types";
export declare class User {
    id: string;
    fullName: string;
    email: string;
    password: string;
    gender: genderType;
    active?: boolean;
    deleteAt?: Date;
}
