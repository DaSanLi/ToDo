import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service'
import { LoginDto } from './dto/auth-login.dto';
import { UserClass } from './scripts/auth.types';
import { UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import type { Response } from 'express';
import { setAuthCookie } from './scripts/auth.scripts';

@Resolver()
export class AuthResolver {

    constructor(private authService: AuthService){}

    @UsePipes(new ValidationPipe())
    @Mutation(() => UserClass, {description: "Requiere las credenciales de un usuario registrado y devuelve un token"})
    async login(@Args('body') body: LoginDto, @Res({ passthrough: true }) res: Response): Promise<UserClass> {
        const result = await this.authService.loginUser(body);
        setAuthCookie(res, result.token);
        return result;
    }

    @UsePipes(new ValidationPipe())
    @Mutation(() => UserClass, {description: "Registra un usuario y devuelve un token de acceso"})
    async register(@Args('body') body: CreateUserDto, @Res({ passthrough: true }) res: Response): Promise<UserClass> {
        const result = await this.authService.registerUser(body);
        setAuthCookie(res, result.token);
        return result;
    }
}
