import { User } from '../user/entities/user.entity';
import { LoginUserDto } from './dto/login-auth.dto';
import { RegisterUserDto } from './dto/register-auth.dto';
import { Model } from 'mongoose';
export declare class AuthService {
    private userModel;
    constructor(userModel: Model<User>);
    login(LoginUserDto: LoginUserDto): Promise<User>;
    register(createUserDto: RegisterUserDto): Promise<User>;
}
