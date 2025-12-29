import 'express';
import { ObjectId } from 'mongoose';

declare module 'express' {
    export interface Request {
        user?: {
        _id: string;
        //remplantear quitar email y usar _id solo
        email: string;
        iat: number;
        exp: number;
        };
    }
}