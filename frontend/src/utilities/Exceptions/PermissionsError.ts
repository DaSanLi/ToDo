import { KnowException } from "./KnowException";

export class PermissionsError  extends KnowException {

    constructor(message: string, _statusCode: number){
        super(message, _statusCode);
        this.name = "Forbidden request";
    }
}