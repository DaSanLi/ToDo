import { User } from '../user/entities/user.entity';
import { LoginUserDto } from './dto/login-auth.dto';
import { userServiceResponse } from './scripts/scripts-types';
import { RegisterUserDto } from './dto/register-auth.dto';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
export declare class AuthService {
    private userModel;
    private readonly jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    login(LoginUserDto: LoginUserDto): Promise<userServiceResponse>;
    register(createUserDto: RegisterUserDto): Promise<userServiceResponse>;
}
