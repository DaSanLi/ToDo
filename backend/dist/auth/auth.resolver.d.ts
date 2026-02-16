import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth-login.dto';
import { UserClass } from './scripts/auth.types';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    login(body: LoginDto): Promise<UserClass>;
    register(body: CreateUserDto): Promise<UserClass>;
}
