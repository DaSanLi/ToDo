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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const task_entity_1 = require("../task/entities/task.entity");
const auth_scripts_1 = require("../auth/scripts/auth.scripts");
const users_scripts_1 = require("./scripts/users.scripts");
let UsersService = class UsersService {
    UserRepository;
    TaskRepository;
    constructor(UserRepository, TaskRepository) {
        this.UserRepository = UserRepository;
        this.TaskRepository = TaskRepository;
    }
    async createUser(body) {
        const passwordHashed = await (0, auth_scripts_1.hashPassword)(body.password);
        body.password = passwordHashed;
        const newUser = await this.UserRepository.save(body);
        if (!newUser)
            return (0, users_scripts_1.InternalExpectionFunction)("No se ha podido registrar al usuario");
        return newUser;
    }
    async findAllUsers() {
        return await this.UserRepository.find();
    }
    async findOneUser(id) {
        const user = await this.UserRepository.findOneBy({ id });
        if (!user)
            return (0, users_scripts_1.BadRequestFunction)("No se ha encontrado un usuario referente");
        return user;
    }
    async updateUser(id, body) {
        const user = await this.UserRepository.findOneBy({ id });
        if (!user)
            return (0, users_scripts_1.BadRequestFunction)("No se ha encontrado un usuario referente");
        let passwordHashed = null;
        if (body?.password) {
            passwordHashed = await (0, auth_scripts_1.hashPassword)(body?.password);
            body.password = passwordHashed;
        }
        const updatedUser = await this.UserRepository.update(id, { ...body });
        if (!updatedUser)
            return (0, users_scripts_1.InternalExpectionFunction)("No se ha podido actualizar el usuario");
        return "Usuario actualizado con exito";
    }
    async softDeleteUSer(id) {
        const user = await this.UserRepository.findOneBy({ id });
        const fecha = new Date();
        if (!user)
            return (0, users_scripts_1.BadRequestFunction)("Usuario no encontrado");
        const deleteUser = await this.UserRepository.softDelete({ id });
        const tasksResult = await this.TaskRepository
            .createQueryBuilder()
            .update()
            .set({ deletedAt: fecha })
            .where('userId = :id', { id })
            .execute();
        if (!deleteUser)
            return (0, users_scripts_1.InternalExpectionFunction)("El usuario no se pudo borrar");
        if (!tasksResult)
            return (0, users_scripts_1.InternalExpectionFunction)("No se pudo borrar las tareas");
        return "Se realizo el borrado blando del usuario satisfactoriamente";
    }
    async cancelSoftDelete(id) {
        const usersDeletedRepository = await this.UserRepository.find({ withDeleted: true, where: { deletedAt: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()) } });
        const userIsDeleted = usersDeletedRepository.find((users) => String(users.id) === String(id));
        if (!userIsDeleted)
            return (0, users_scripts_1.BadRequestFunction)("Usuario no encontrado en la lista de borrado blando");
        const userResult = await this.UserRepository.restore({ id });
        const tasksResult = await this.TaskRepository
            .createQueryBuilder()
            .update()
            .set({ deletedAt: null })
            .where('userId = :id', { id })
            .execute();
        if (!userResult)
            return (0, users_scripts_1.InternalExpectionFunction)("No se pudo sacar al usuario de la lista de eliminados");
        if (!tasksResult)
            return (0, users_scripts_1.InternalExpectionFunction)("No se pudo recuperar la lista de tareas borradas");
        return "Se quito al usuario de la lista de borrado blando satisfactoriamente";
    }
    async hardDelete(id) {
        const user = await this.UserRepository.findOneBy({ id });
        if (!user)
            return (0, users_scripts_1.BadRequestFunction)("Usuario no encontrado");
        try {
            await this.UserRepository.remove(user);
        }
        catch {
            (0, users_scripts_1.InternalExpectionFunction)("No se ha podido borrar al usuario");
        }
        return "Usuario borrado satisfactoriamente";
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map