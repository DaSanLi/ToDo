import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-auth.dto';
import { RegisterUserDto } from './dto/register-auth.dto';
import type { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginUserDto, response: Response): Promise<{
        fullName: string;
        gender: import("../user/types/types").genderType;
        email: string;
    }>;
    register(dto: RegisterUserDto, response: Response): Promise<{
        fullName: string;
        gender: import("../user/types/types").genderType;
        email: string;
    }>;
}
