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
const jwt_1 = require("@nestjs/jwt");
const task_scripts_1 = require("../task/scripts/task.scripts");
let AuthService = class AuthService {
    userRepository;
    jwtService;
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async loginUser(body) {
        const { email } = body;
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new common_1.BadRequestException("Usuario no encontrado");
        }
        const passwordVerified = await (0, auth_scripts_1.verifyHashPassword)(body.password, user.password);
        if (!passwordVerified)
            return (0, task_scripts_1.BadRequestFunction)("La contraseña ingresada no coincide con la registrada");
        const payload = { email: user.email };
        const token = await this.jwtService.signAsync(payload);
        const response = { email: user.email, token: token };
        return response;
    }
    async registerUser(body) {
        const { email } = body;
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new common_1.BadRequestException("Usuario no encontrado");
        }
        const passwordVerified = await (0, auth_scripts_1.verifyHashPassword)(body.password, user.password);
        if (!passwordVerified)
            return (0, task_scripts_1.BadRequestFunction)("La contraseña ingresada no coincide con la registrada");
        const payload = { username: user.email };
        const token = await this.jwtService.signAsync(payload);
        const response = { email: user.email, token: token };
        return response;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map