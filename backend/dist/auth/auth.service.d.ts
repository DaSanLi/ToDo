import { Repository } from 'typeorm';
import { LoginDto } from './dto/auth-login.dto';
import { UserClass, userResponse } from './scripts/auth.types';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<userResponse>, jwtService: JwtService);
    loginUser(body: LoginDto): Promise<UserClass>;
    registerUser(body: CreateUserDto): Promise<UserClass>;
}
