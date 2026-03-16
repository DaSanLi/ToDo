import { ResponseWithCookie } from './auth.types';
declare function hashPassword(password: string): Promise<string>;
declare function verifyHashPassword(passwordUser: string, passwordDB: string): Promise<boolean>;
declare function setTokenCookie(res: ResponseWithCookie, token: string): void;
export { hashPassword, verifyHashPassword, setTokenCookie };
