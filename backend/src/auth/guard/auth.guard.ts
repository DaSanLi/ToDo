import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from '../JWT/constants'
import { payloadType } from '../scripts/scripts-types';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const token = request?.cookies?.auth_token;

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