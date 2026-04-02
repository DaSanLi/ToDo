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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const auth_scripts_1 = require("./scripts/auth.scripts");
const auth_cookies_service_1 = require("./scripts/auth-cookies.service");
const jwt_1 = require("@nestjs/jwt");
const task_scripts_1 = require("../task/scripts/task.scripts");
let AuthService = class AuthService {
    userRepository;
    jwtService;
    authCookiesService;
    constructor(userRepository, jwtService, authCookiesService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.authCookiesService = authCookiesService;
    }
    async loginUser(body, res) {
        const { email } = body;
        const user = await this.userRepository.findOne({ where: { email, deletedAt: (0, typeorm_2.IsNull)() } });
        if (!user) {
            throw new common_1.BadRequestException("Usuario no encontrado");
        }
        const passwordVerified = await (0, auth_scripts_1.verifyHashPassword)(body.password, user.password);
        if (!passwordVerified)
            return (0, task_scripts_1.BadRequestFunction)("La contraseña ingresada no coincide con la registrada");
        const payload = { email: user.email };
        const token = await this.jwtService.signAsync(payload);
        this.authCookiesService.setTokenCookie(res, token);
        return { email, token };
    }
    async registerUser(body, res) {
        const { email } = body;
        const user = await this.userRepository.findOne({ where: { email }, withDeleted: true });
        if (user) {
            if (user.deletedAt) {
                throw new common_1.BadRequestException("Este email pertenece a una cuenta desactivada. Contacta a soporte.");
            }
            throw new common_1.BadRequestException("Email en uso, ingresa otro");
        }
        const passwordHashed = await (0, auth_scripts_1.hashPassword)(body.password);
        body.password = passwordHashed;
        if (!passwordHashed)
            return (0, task_scripts_1.BadRequestFunction)("Ha ocurrido un error en el registro, vuelve a internarlo");
        const newUser = await this.userRepository.save(body);
        if (!newUser)
            return (0, task_scripts_1.InternalExpectionFunction)("No se ha podido registrar al usuario");
        const payload = { email: body.email };
        const token = await this.jwtService.signAsync(payload);
        this.authCookiesService.setTokenCookie(res, token);
        return { email: body.email };
    }
    async findUserByEmail(email) {
        return await this.userRepository.findOne({ where: { email, deletedAt: (0, typeorm_2.IsNull)() } });
    }
    async verifyAndRefreshToken(cookies, res) {
        const payload = await this.authCookiesService.verifyTokenFromCookie({ cookies });
        const user = await this.userRepository.findOne({ where: { email: payload.email, deletedAt: (0, typeorm_2.IsNull)() } });
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        const newPayload = { email: user.email };
        const newToken = await this.jwtService.signAsync(newPayload);
        this.authCookiesService.setTokenCookie(res, newToken);
        return {
            email: user.email,
            message: 'Verificación exitosa',
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        auth_cookies_service_1.AuthCookiesService])
], AuthService);
//# sourceMappingURL=auth.service.js.map