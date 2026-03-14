"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
<<<<<<< HEAD
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../JWT/constants");
=======
const auth_cookies_service_1 = require("../scripts/auth-cookies.service");
>>>>>>> main
let AuthGuard = class AuthGuard {
    authCookiesService;
    constructor(authCookiesService) {
        this.authCookiesService = authCookiesService;
    }
    async canActivate(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
<<<<<<< HEAD
        const token = request.headers.authorization;
        if (!token) {
            throw new common_1.UnauthorizedException("No se ha proporcionado el token");
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: constants_1.jwtConstants.secret,
            });
            request.user = payload;
        }
        catch {
            throw new common_1.UnauthorizedException("Token no valido");
        }
=======
        const payload = await this.authCookiesService.verifyTokenFromCookie(request);
        this.authCookiesService.attachUserToRequest(request, payload);
>>>>>>> main
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_cookies_service_1.AuthCookiesService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map