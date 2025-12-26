import { FetchOptions } from "../types/types";

const URLBASE = "http://localhost:4000";


const fetchApi = async (endpoint: string, options: FetchOptions = {}) => {
    let data: unknown = {};
    try{
        const res = await fetch(`${URLBASE}/${endpoint}`, options);
        data = await res.json();
    }catch{
        throw new Error("Error al conectar con la API");
    }
    return data;
}


export { URLBASE, fetchApi };