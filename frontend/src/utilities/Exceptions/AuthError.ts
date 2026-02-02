import { KnowException } from "./KnowException";

export class AuthError extends KnowException {

    constructor(message: string, statusCode: number){
        super(message, statusCode);
        this.name = "Auth Error - Invalid credentials";
    }
}