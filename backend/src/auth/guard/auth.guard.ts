<<<<<<< HEAD
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from '../JWT/constants'
import { payloadType, RequestWithUser } from '../scripts/auth.types'
=======
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthCookiesService } from '../scripts/auth-cookies.service'
import { RequestWithUser } from '../scripts/auth.types'
>>>>>>> main


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authCookiesService: AuthCookiesService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
<<<<<<< HEAD

        const request = ctx.getContext<{ req: RequestWithUser }>().req;
        const token = request.headers.authorization;

        if (!token) {
            throw new UnauthorizedException("No se ha proporcionado el token");
        }


        try {
            const payload: payloadType = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });
            request.user = payload;
        } catch {
            throw new UnauthorizedException("Token no valido");
        }

        return true;
    }
}
=======
        const request = ctx.getContext<{ req: RequestWithUser }>().req;

        const payload = await this.authCookiesService.verifyTokenFromCookie(request);
        this.authCookiesService.attachUserToRequest(request, payload);

        return true;
    }
}
>>>>>>> main
