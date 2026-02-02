export class KnowException extends Error{
    _code: number;
    
    constructor(message:string, _code: number){
        super(message)
        this._code = 0;
    }
}