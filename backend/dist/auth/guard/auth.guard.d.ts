import { CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthCookiesService } from '../scripts/auth-cookies.service';
export declare class AuthGuard implements CanActivate {
    private readonly authCookiesService;
    constructor(authCookiesService: AuthCookiesService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
