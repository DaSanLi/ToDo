import { Request, Response } from "express";
import { ObjectType, Field } from '@nestjs/graphql';


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

export interface ResponseWithCookie extends Response {
    cookie: (name: string, value: string, options?: any) => this;
}


@ObjectType()
export class UserClass {
    @Field({ description: "Email del usuario autenticado" })
    email!: string;
}

@ObjectType()
export class VerificationResponse {
    @Field()
    message!: string;
    @Field()
    email!: string;
}
