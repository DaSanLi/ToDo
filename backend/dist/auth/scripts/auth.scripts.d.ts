declare function hashPassword(password: string): Promise<string>;
declare function verifyHashPassword(passwordUser: string, passwordDB: string): Promise<boolean>;
export { hashPassword, verifyHashPassword };
