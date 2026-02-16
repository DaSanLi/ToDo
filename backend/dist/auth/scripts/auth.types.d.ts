import { Request } from "express";
export interface userResponse {
    email: string;
    password: string;
}
export interface payloadType {
    email: string;
    token: string;
}
export interface RequestWithUser extends Request {
    user?: payloadType;
}
export declare class UserClass {
    email: string;
    token: string;
}
