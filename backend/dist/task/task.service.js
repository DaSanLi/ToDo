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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
const user_entity_1 = require("../users/entities/user.entity");
const task_scripts_1 = require("./scripts/task.scripts");
let TaskService = class TaskService {
    TaskRepository;
    UserRepository;
    constructor(TaskRepository, UserRepository) {
        this.TaskRepository = TaskRepository;
        this.UserRepository = UserRepository;
    }
    async createTask(CreateTaskDto, { email }) {
        const user = await this.UserRepository.findOneBy({ email });
        if (!user)
            return (0, task_scripts_1.BadRequestFunction)("El usuario no esta registrado o fue eliminado.");
        const newTask = { ...CreateTaskDto, user: user };
        try {
            await this.TaskRepository.save(newTask);
        }
        catch {
            (0, task_scripts_1.InternalExpectionFunction)("Ha ocurrido un error al registrar la tarea, vuelve a intentarlo.");
        }
        return "Tarea creada correctamente";
    }
    async findAllTask({ email }) {
        const user = await this.UserRepository.findOne({ where: { email }, relations: ['tasks'] });
        if (!user)
            return (0, task_scripts_1.BadRequestFunction)("No se ha podido encontrar al usuario, vuelve a intentarlo");
        const { tasks } = user;
        if (!tasks)
            return (0, task_scripts_1.InternalExpectionFunction)("No se han podido carga las tareas de este usuario");
        return tasks;
    }
    async findOneTask(id, { email }) {
        const task = await this.TaskRepository.findOne({ where: { id }, relations: ['user'] });
        if (!task)
            return (0, task_scripts_1.BadRequestFunction)("No se ha encontrado ninguna tarea");
        if (email !== task.user.email) {
            return (0, task_scripts_1.UnauthorizedFunction)("Solo el creador de la tarea puede ver la misma");
        }
        return task;
    }
    async updateTask(id, updateTaskDto, { email }) {
        const task = await this.TaskRepository.findOne({ where: { id }, relations: ['user'] });
        if (!task)
            return (0, task_scripts_1.BadRequestFunction)("No se ha encontrado ninguna tarea");
        if (email !== task?.user?.email) {
            return (0, task_scripts_1.UnauthorizedFunction)("Solo el creador de la tarea puede modificar la misma");
        }
        try {
            await this.TaskRepository.update(id, { ...updateTaskDto });
        }
        catch {
            (0, task_scripts_1.InternalExpectionFunction)("La tarea no se ha podido modificar");
        }
        return "Tarea modificada satisfactoriamente";
    }
    async removeTask(id, { email }) {
        const task = await this.TaskRepository.findOne({ where: { id }, relations: ['user'] });
        if (!task)
            return (0, task_scripts_1.BadRequestFunction)("No se ha encontrado ninguna tarea");
        if (email !== task?.user?.email) {
            return (0, task_scripts_1.UnauthorizedFunction)("Solo el creador de la tarea puede eliminar la misma");
        }
        try {
            await this.TaskRepository.remove(task);
        }
        catch {
            (0, task_scripts_1.InternalExpectionFunction)("Error al borrar la tarea");
        }
        return "Tarea borrada satisfactoriamente";
    }
    async moveTask(id, { status, orderInStatus }, { email }) {
        const task = await this.TaskRepository.findOne({ where: { id }, relations: ['user'] });
        if (!task)
            return (0, task_scripts_1.BadRequestFunction)("No se ha encontrado ninguna tarea");
        if (email !== task?.user?.email) {
            return (0, task_scripts_1.UnauthorizedFunction)("Solo el creador de la tarea puede mover la misma");
        }
        try {
            await this.TaskRepository.update(id, {
                orderInStatus: orderInStatus ? orderInStatus : task.orderInStatus,
                status: status ? status : task.status,
            });
        }
        catch {
            (0, task_scripts_1.InternalExpectionFunction)("La tarea no se ha podido mover");
        }
        return "Tarea movida satisfactoriamente";
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TaskService);
//# sourceMappingURL=task.service.js.map