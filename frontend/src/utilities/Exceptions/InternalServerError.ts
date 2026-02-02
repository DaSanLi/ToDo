import { KnowException } from "./KnowException";

export class InternalServerError extends KnowException {

    constructor(message: string, _statusCode: number){
        super(message, _statusCode);
        this.name = "Internal server error";
    }
}