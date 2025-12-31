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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../user/entities/user.entity");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const task_entity_1 = require("./entities/task.entity");
const scripts_1 = require("./utilities/scripts");
let TasksService = class TasksService {
    userModel;
    tasksModel;
    constructor(userModel, tasksModel) {
        this.userModel = userModel;
        this.tasksModel = tasksModel;
    }
    async create(createTaskDto, user_id) {
        const userExist = await this.userModel.findOne(user_id);
        if (!userExist) {
            throw new common_1.BadRequestException("El identificador del usuario no coincide");
        }
        createTaskDto.user = user_id;
        let tasksInstance = new this.tasksModel(createTaskDto);
        try {
            await tasksInstance.save();
        }
        catch {
            throw new common_1.InternalServerErrorException("Ha ocurrido un error al guardar la tarea");
        }
        return { "message": "Tarea creada correctamente" };
    }
    async findAll(user_id) {
        const userExist = await this.userModel.findById(user_id);
        if (!userExist) {
            throw new common_1.InternalServerErrorException("Ha ocurrido un error");
        }
        const tasks = await this.tasksModel.find({ user: user_id });
        if (!tasks) {
            throw new common_1.InternalServerErrorException("Ha ocurrido un error al encontrar las tareas asociadas al usuario");
        }
        return tasks;
    }
    async findOne(id, user_id) {
        const userExist = await this.userModel.findById(user_id);
        if (!userExist) {
            throw new common_1.InternalServerErrorException("Ha ocurrido un error");
        }
        const _id = (0, scripts_1._idTransform)(id);
        const task = await this.tasksModel.findOne(_id);
        if (!task) {
            throw new common_1.InternalServerErrorException("Ha ocurrido un error al encontrar las tareas asociadas al usuario");
        }
        return task;
    }
    async update(id, updateTaskDto, user_id) {
        const userExist = await this.userModel.findById(user_id);
        if (!userExist) {
            throw new common_1.InternalServerErrorException("Ha ocurrido un error");
        }
        const _id = (0, scripts_1._idTransform)(id);
        try {
            await this.tasksModel.updateOne({ _id }, updateTaskDto);
        }
        catch {
            throw new common_1.InternalServerErrorException("Ha ocurrido un error al encontrar las tareas asociadas al usuario");
        }
        return { "message": "Usuario modificado correctamente" };
    }
    async remove(id, user_id) {
        const userExist = await this.userModel.findById(user_id);
        if (!userExist) {
            throw new common_1.InternalServerErrorException("Ha ocurrido un error");
        }
        const _id = (0, scripts_1._idTransform)(id);
        try {
            await this.tasksModel.deleteOne(_id);
        }
        catch {
            throw new common_1.InternalServerErrorException("Ha ocurrido un error al encontrar las tareas asociadas al usuario");
        }
        return { "message": "Usuario modificado correctamente" };
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, mongoose_2.InjectModel)(task_entity_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], TasksService);
//# sourceMappingURL=tasks.service.js.map