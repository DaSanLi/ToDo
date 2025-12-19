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
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
let UserService = class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const { firstName, lastName, email, ...userInformation } = createUserDto;
        const userExist = await this.userRepository.findOneBy({ email });
        if (userExist) {
            throw new common_1.BadRequestException("El usuario con el email usado ya ha sido creado, intenta otro email");
        }
        const newUser = {
            ...userInformation,
            email,
            fullName: `${firstName} ${lastName}`
        };
        const res = await this.userRepository.save(newUser);
        if (!res) {
            throw new common_1.InternalServerErrorException("No se ha podido crear el usuario.");
        }
        return res;
    }
    async findAll() {
        const user = await this.userRepository.find();
        if (!user) {
            throw new common_1.InternalServerErrorException("Ha ocurrido un error al buscar los usuarios");
        }
        return user;
    }
    async findOne(id) {
        const userExist = await this.userRepository.findOneBy({ id });
        if (!userExist) {
            throw new common_1.BadRequestException("No existe un usuario con ese identificador");
        }
        return userExist;
    }
    async update(id, updateUserDto) {
        const findingUser = await this.userRepository.findOneBy({ id });
        if (!findingUser) {
            throw new common_1.BadRequestException("No existe un usuario con ese identificador");
        }
        const updateUser = await this.userRepository.update(id, updateUserDto);
        if (!updateUser) {
            throw new common_1.InternalServerErrorException("Ha ocurrido un error al buscar los usuarios");
        }
        return "Se han actualizado los datso correctamente";
    }
    async remove(id) {
        const userExist = await this.userRepository.findOneBy({ id });
        if (!userExist) {
            throw new common_1.BadRequestException("No existe un usuario con ese identificador");
        }
        const deleteUser = this.userRepository.delete({ id });
        if (!deleteUser) {
            throw new common_1.InternalServerErrorException("No se ha podido crear el usuario.");
        }
        return "Se ha borrado el usuario correctamente";
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map