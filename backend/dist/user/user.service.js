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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const scripts_1 = require("../auth/scripts/scripts");
let UserService = class UserService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        const { email, password, ...userInformation } = createUserDto;
        const userExist = await this.userModel.findOne({ email });
        if (userExist) {
            throw new common_1.BadRequestException("El usuario con el email usado ya ha sido creado, intenta otro email");
        }
        const hashedPassword = await (0, scripts_1.hashPassword)(createUserDto.password);
        if (!hashedPassword) {
            throw new common_1.InternalServerErrorException("No se ha podido crear el usuario.");
        }
        const newUser = {
            ...userInformation,
            email,
            password: hashedPassword
        };
        try {
            const userInstance = new this.userModel(newUser);
            await userInstance.save();
        }
        catch {
            throw new common_1.InternalServerErrorException("No se ha podido crear el usuario.");
        }
        return { "message": "usuario creado correctamente" };
    }
    async findAll() {
        const user = await this.userModel.find().exec();
        if (!user) {
            throw new common_1.InternalServerErrorException("Ha ocurrido un error al buscar los usuarios");
        }
        return user;
    }
    async findOne(_id) {
        const userExist = await this.userModel.findOne({ _id });
        if (!userExist) {
            throw new common_1.BadRequestException("No existe un usuario con ese identificador");
        }
        return userExist;
    }
    async update(updateUserDto, _id) {
        const userExist = await this.userModel.findOne({ _id });
        if (!userExist) {
            throw new common_1.InternalServerErrorException("El usuario no existe");
        }
        if (updateUserDto?.password) {
            const hashedPassword = await (0, scripts_1.hashPassword)(updateUserDto?.password);
            if (!hashedPassword) {
                throw new common_1.BadRequestException("La contraseña ingresada es incorrecta");
            }
            updateUserDto = {
                password: hashedPassword
            };
        }
        try {
            await this.userModel.findByIdAndUpdate(_id, updateUserDto, { new: true });
        }
        catch {
            throw new common_1.InternalServerErrorException("Ha ocurrido un error al actualizar el usuario");
        }
        return { "message": "usuario actualizado correctamente" };
    }
    async remove(_id) {
        const userExist = await this.userModel.findOne({ _id });
        if (!userExist) {
            throw new common_1.BadRequestException("No existe un usuario con ese identificador");
        }
        try {
            await this.userModel.deleteOne({ _id });
        }
        catch {
            throw new common_1.InternalServerErrorException("No se ha podido crear el usuario.");
        }
        return { "message": "usuario borrado correctamente" };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map