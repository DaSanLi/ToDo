import { CookieOptions } from 'express';
import { genderType } from '../../user/types/types';
interface payloadType {
    email: string;
    token: string;
}
interface cookieBodyType {
    name: string;
    value: string;
    options: CookieOptions;
}
interface userServiceResponse {
    fullName: string;
    email: string;
    gender: genderType;
    token: string;
}
export type { payloadType, cookieBodyType, userServiceResponse };
