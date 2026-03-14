import { Repository } from 'typeorm';
import { LoginDto } from './dto/auth-login.dto';
<<<<<<< HEAD
import { UserClass, userResponse } from './scripts/auth.types';
=======
import { UserClass, userResponse, VerificationResponse, ResponseWithCookie } from './scripts/auth.types';
>>>>>>> main
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<userResponse>, jwtService: JwtService);
<<<<<<< HEAD
    loginUser(body: LoginDto): Promise<UserClass>;
    registerUser(body: CreateUserDto): Promise<UserClass>;
=======
    loginUser(body: LoginDto, res?: ResponseWithCookie): Promise<UserClass>;
    registerUser(body: CreateUserDto, res?: ResponseWithCookie): Promise<UserClass>;
    findUserByEmail(email: string): Promise<userResponse | null>;
    verifyAndRefreshToken(cookies: Record<string, string>, res: ResponseWithCookie): Promise<VerificationResponse>;
>>>>>>> main
}
