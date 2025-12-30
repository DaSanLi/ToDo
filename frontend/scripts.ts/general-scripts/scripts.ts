import { FetchOptions } from "../types/types";

const URLBASE = "http://localhost:4000";


const fetchApi = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T|null> => {
    try{
        const res = await fetch(`${URLBASE}/${endpoint}`, options);
        if(res.status === 401){
            return null as T
        }
        const response = await res.json() as T
        return  response 
    }catch{
        throw new Error("Error al conectar con la API");
    }
}

const fetchAuthApi = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T|null> => {
    try{
        const res = await fetch(`${URLBASE}/${endpoint}`, options);
        if(res.status === 401){
            return null as T
        }else if(res.status === 500){
            throw new Error("Ha ocurrido un error en el servidor")
        }
        const response = await res.json() as T
        return  response 
    }catch{
        throw new Error("Error al conectar con la API");
    }
}


export { URLBASE, fetchApi, fetchAuthApi };