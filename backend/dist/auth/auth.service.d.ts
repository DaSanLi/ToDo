import { Repository } from 'typeorm';
import { LoginDto } from './dto/auth-login.dto';
import { UserClass, userResponse, VerificationResponse, ResponseWithCookie, payloadType } from './scripts/auth.types';
import { AuthCookiesService } from './scripts/auth-cookies.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    private readonly authCookiesService;
    constructor(userRepository: Repository<userResponse>, jwtService: JwtService, authCookiesService: AuthCookiesService);
    loginUser(body: LoginDto, res: ResponseWithCookie): Promise<payloadType>;
    registerUser(body: CreateUserDto, res: ResponseWithCookie): Promise<UserClass>;
    findUserByEmail(email: string): Promise<userResponse | null>;
    verifyAndRefreshToken(cookies: Record<string, string>, res: ResponseWithCookie): Promise<VerificationResponse>;
}
