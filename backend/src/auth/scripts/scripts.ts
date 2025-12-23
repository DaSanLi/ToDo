import * as bcrypt from 'bcrypt';

async function hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
}

async function verifyPassword(password: string, passwordBD: string): Promise<boolean>{
    const isMatch = await bcrypt.compare(password, passwordBD);
    return isMatch
}


export { hashPassword, verifyPassword }
