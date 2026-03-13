import { Resolver, Args, Mutation, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service'
import { LoginDto } from './dto/auth-login.dto';
import { UserClass, VerificationResponse, ResponseWithCookie, RequestWithUser } from './scripts/auth.types';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Resolver()
export class AuthResolver {

    constructor(private authService: AuthService){}

    @UsePipes(new ValidationPipe())
    @Mutation(() => UserClass, {description: "Requiere las credenciales de un usuario registrado y devuelve un token"})
    async login(
        @Args('body') body: LoginDto,
        @Context() context: { res: ResponseWithCookie }
    ): Promise<UserClass> {
        return this.authService.loginUser(body, context.res);
    }

    @UsePipes(new ValidationPipe())
    @Mutation(() => UserClass, {description: "Registra un usuario y devuelve un token de acceso"})
    async register(
        @Args('body') body: CreateUserDto,
        @Context() context: { res: ResponseWithCookie }
    ): Promise<UserClass> {
        return this.authService.registerUser(body, context.res);
    }

    @Query(() => VerificationResponse, { description: "Verifica el usuario mediante cookies y renueva el token" })
    async verification(@Context() context: { req: RequestWithUser; res: ResponseWithCookie }): Promise<VerificationResponse> {
        const cookies = context.req?.cookies;
        return this.authService.verifyAndRefreshToken(cookies, context.res);
    }
}
