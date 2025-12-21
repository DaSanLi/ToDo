declare function hashPassword(password: string): Promise<string>;
declare function verifyPassword(password: string, passwordBD: string): Promise<boolean>;
export { hashPassword, verifyPassword };
