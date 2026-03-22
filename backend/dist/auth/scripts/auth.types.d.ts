import { Request, Response } from "express";
export interface userResponse {
    email: string;
    password: string;
    deletedAt?: Date | null;
}
export interface payloadType {
    email: string;
    token: string;
}
export interface RequestWithUser extends Request {
    user?: payloadType;
}
export interface ResponseWithCookie extends Response {
    cookie: (name: string, value: string, options?: any) => this;
}
export declare class UserClass {
    email: string;
}
export declare class VerificationResponse {
    message: string;
    email: string;
}
