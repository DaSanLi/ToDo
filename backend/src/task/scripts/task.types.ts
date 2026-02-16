import { Request } from 'express';


export enum priorityState {
    baja = "baja",
    media = "media",
    alta = "alta",
    urgente = "urgente"
}


export interface ReqTaskAuth extends Request {
    user: {
        email: string;
    }
}