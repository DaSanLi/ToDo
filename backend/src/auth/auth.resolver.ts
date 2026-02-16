import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service'
import { LoginDto } from './dto/auth-login.dto';
import { UserClass } from './scripts/auth.types';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Resolver()
export class AuthResolver {

    constructor(private authService: AuthService){}

    @UsePipes(new ValidationPipe())
    @Mutation(() => UserClass, {description: "Requiere las credenciales de un usuario registrado y devuelve un token"})
    async login(@Args('body') body: LoginDto): Promise<UserClass> {
        return this.authService.loginUser(body);
    }

    @UsePipes(new ValidationPipe())
    @Mutation(() => UserClass, {description: "Registra un usuario y devuelve un token de acceso"})
    async register(@Args('body') body: CreateUserDto): Promise<UserClass> {
        return this.authService.registerUser(body);
    }
}
