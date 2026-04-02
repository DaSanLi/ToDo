import { Request } from 'express';
export declare enum priorityState {
    baja = "baja",
    media = "media",
    alta = "alta",
    urgente = "urgente"
}
export declare enum taskStatus {
    pendiente = "pendiente",
    asignada = "asignada",
    realizando = "realizando",
    completada = "completada"
}
export interface ReqTaskAuth extends Request {
    user: {
        email: string;
    };
}
