import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth-login.dto';
import { UserClass, VerificationResponse, ResponseWithCookie, RequestWithUser } from './scripts/auth.types';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthCookiesService } from './scripts/auth-cookies.service';
export declare class AuthResolver {
    private authService;
    private readonly authCookiesService;
    constructor(authService: AuthService, authCookiesService: AuthCookiesService);
    login(body: LoginDto, context: {
        res: ResponseWithCookie;
    }): Promise<UserClass>;
    register(body: CreateUserDto, context: {
        res: ResponseWithCookie;
    }): Promise<UserClass>;
    verification(context: {
        req: RequestWithUser;
        res: ResponseWithCookie;
    }): Promise<VerificationResponse>;
}
