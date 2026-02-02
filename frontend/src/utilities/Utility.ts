import { FactoryExceptionHandler } from "./Exceptions/FactoryExceptionHandler";
import { KnowException } from "./Exceptions/KnowException";
import { FetchOptions } from "./types";

const URLBASE = "http://localhost:4000";


const fetchApi = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
    try{
        const res = await fetch(`${URLBASE}/${endpoint}`, options);
        if(!res.ok){
        FactoryExceptionHandler.throwIfError(res.status)
        }
        const response = await res.json() as T
        return  response 
    }catch(e: unknown){
        if(e instanceof KnowException){
            //si la excepción fuera conocida entrará dentro de este condicional gracias al FactoryExceptionHandler
            throw e
        }else{
            throw new Error("Ha ocurrido un error inesperado.")
        }
    }
}


export { URLBASE, fetchApi };