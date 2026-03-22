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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("./auth.service");
const auth_login_dto_1 = require("./dto/auth-login.dto");
const auth_types_1 = require("./scripts/auth.types");
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const auth_cookies_service_1 = require("./scripts/auth-cookies.service");
const user_entity_1 = require("../users/entities/user.entity");
let AuthResolver = class AuthResolver {
    authService;
    authCookiesService;
    constructor(authService, authCookiesService) {
        this.authService = authService;
        this.authCookiesService = authCookiesService;
    }
    async login(body, context) {
        const payload = await this.authService.loginUser(body, context.res);
        this.authCookiesService.setTokenCookie(context.res, payload.token);
        return { email: payload.email };
    }
    async register(body, context) {
        return this.authService.registerUser(body, context.res);
    }
    async verification(context) {
        const cookies = context.req?.cookies;
        return this.authService.verifyAndRefreshToken(cookies, context.res);
    }
    async me(context) {
        const payload = await this.authCookiesService.verifyTokenFromCookie(context.req);
        const user = await this.authService.findUserByEmail(payload.email);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    }
    async logout(context) {
        context.res.clearCookie('token');
        return "Sesión cerrada exitosamente";
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, graphql_1.Mutation)(() => auth_types_1.UserClass, { description: "Requiere las credenciales de un usuario registrado y devuelve un token" }),
    __param(0, (0, graphql_1.Args)('body')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, graphql_1.Mutation)(() => auth_types_1.UserClass, { description: "Registra un usuario y devuelve un token de acceso" }),
    __param(0, (0, graphql_1.Args)('body')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
__decorate([
    (0, graphql_1.Query)(() => auth_types_1.VerificationResponse, { description: "Verifica el usuario mediante cookies y renueva el token" }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "verification", null);
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User, { description: "Obtiene el usuario actualmente autenticado" }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "me", null);
__decorate([
    (0, graphql_1.Mutation)(() => String, { description: "Cierra la sesión del usuario clears la cookie" }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "logout", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        auth_cookies_service_1.AuthCookiesService])
], AuthResolver);
//# sourceMappingURL=auth.resolver.js.map