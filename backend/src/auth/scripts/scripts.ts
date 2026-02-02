import bcrypt from 'bcrypt';
import { CookieOptions } from 'express';
import { cookieBodyType } from './scripts-types';
import type { Response } from 'express';


async function hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
}


async function verifyPassword(password: string, passwordBD: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, passwordBD);
    return isMatch
}


const attachAuthCookie = (res: Response, token: string) => {
    const {name, value, options} = createCookie(token)
    return res.cookie(name, value, options)
}


function createCookie (token: string): cookieBodyType {
    return{
        name: 'auth_token', 
        value: token,
        options: httpCookieConfig
    }
}

//aqui podemos modificar los valores de la cookie http
const httpCookieConfig: CookieOptions = {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/'
}


export { hashPassword, verifyPassword, attachAuthCookie };
