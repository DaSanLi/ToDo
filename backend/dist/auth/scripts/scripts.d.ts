import type { Response } from 'express';
declare function hashPassword(password: string): Promise<string>;
declare function verifyPassword(password: string, passwordBD: string): Promise<boolean>;
declare const attachAuthCookie: (res: Response, token: string) => Response<any, Record<string, any>>;
export { hashPassword, verifyPassword, attachAuthCookie };
