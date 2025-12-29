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
const user_entity_1 = require("../user/entities/user.entity");
const scripts_1 = require("./scripts/scripts");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_service_1 = require("@nestjs/jwt/dist/jwt.service");
let AuthService = class AuthService {
    userModel;
    jwtService;
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async login(LoginUserDto) {
        const { email, password } = LoginUserDto;
        const userExist = await this.userModel.findOne({ email });
        if (!userExist) {
            throw new common_1.BadRequestException("Email no encontrado");
        }
        const verificationPassword = await (0, scripts_1.verifyPassword)(password, userExist.password);
        if (!verificationPassword) {
            throw new common_1.BadRequestException("La contraseña ingresada es incorrecta");
        }
        const payload = { _id: userExist._id };
        const token = await this.jwtService.signAsync(payload);
        let response = {
            email,
            gender: userExist.gender,
            fullName: userExist.email,
            token
        };
        return response;
    }
    async register(createUserDto) {
        const { email, gender, fullName, password } = createUserDto;
        const userExist = await this.userModel.findOne({ email });
        if (!userExist) {
            throw new common_1.BadRequestException("El usuario con el email usado ya ha sido creado, intenta otro email");
        }
        const hashedPassword = await (0, scripts_1.hashPassword)(password);
        if (!hashedPassword) {
            throw new common_1.BadRequestException("La contraseña ingresada es incorrecta");
        }
        const newUser = {
            fullName,
            gender,
            email,
            password: hashedPassword
        };
        const userInstance = new this.userModel(newUser);
        await userInstance.save();
        if (!userInstance) {
            throw new common_1.InternalServerErrorException("No se ha podido crear el usuario.");
        }
        const payload = { email, _id: userExist._id };
        const token = await this.jwtService.signAsync(payload);
        return { fullName, email, gender, token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_service_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map