import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-auth.dto';
import { RegisterUserDto } from './dto/register-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(LoginUserDto: LoginUserDto): Promise<import("../user/entities/user.entity").User>;
    register(LoginUserDto: RegisterUserDto): Promise<import("../user/entities/user.entity").User>;
}
