import { Repository } from 'typeorm';
import { LoginDto } from './dto/auth-login.dto';
import { UserClass, userResponse, VerificationResponse, ResponseWithCookie } from './scripts/auth.types';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<userResponse>, jwtService: JwtService);
    loginUser(body: LoginDto, res?: ResponseWithCookie): Promise<UserClass>;
    registerUser(body: CreateUserDto, res?: ResponseWithCookie): Promise<UserClass>;
    findUserByEmail(email: string): Promise<userResponse | null>;
    verifyAndRefreshToken(cookies: Record<string, string>, res: ResponseWithCookie): Promise<VerificationResponse>;
}
