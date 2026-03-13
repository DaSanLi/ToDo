import * as bcrypt from 'bcrypt';
import { ResponseWithCookie } from './auth.types';


async function hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash
}

async function verifyHashPassword(passwordUser: string, passwordDB: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(passwordUser, passwordDB);
    return isMatch
}

function setTokenCookie(res: ResponseWithCookie, token: string): void {
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 3600 * 1000,
    });
}


export { hashPassword, verifyHashPassword, setTokenCookie }
