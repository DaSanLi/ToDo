import { FetchOptions } from "../types/types";

const URLBASE = "http://localhost:4000";


const fetchApi = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
    try{
        const res = await fetch(`${URLBASE}/${endpoint}`, options);
        if (!res.ok) {
            throw new Error("ha ocurrido un error")
        }
        const response = await res.json() as T
        return  response 
    }catch(e: unknown){
        if(e instanceof Error){
            throw new Error("el api ha saltado un error:", e)
        }else{
            throw new Error("Error al conectar con la API");
        }
    }
}


export { URLBASE, fetchApi };