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
exports.TaskResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const task_service_1 = require("./task.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const auth_guard_1 = require("../auth/guard/auth.guard");
const common_1 = require("@nestjs/common");
const task_entity_1 = require("./entities/task.entity");
let TaskResolver = class TaskResolver {
    taskService;
    constructor(taskService) {
        this.taskService = taskService;
    }
    createTask(createTaskDto, req) {
        return this.taskService.createTask(createTaskDto, req.user);
    }
    findAllTasks(req) {
        return this.taskService.findAllTask(req.user);
    }
    findOneTask(id, req) {
        return this.taskService.findOneTask(id, req.user);
    }
    updateTask(id, updateTaskDto, req) {
        return this.taskService.updateTask(id, updateTaskDto, req.user);
    }
    removeTask(id, req) {
        return this.taskService.removeTask(id, req.user);
    }
};
exports.TaskResolver = TaskResolver;
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe),
    (0, graphql_1.Mutation)(() => String, { description: "Crea una nueva tarea" }),
    __param(0, (0, graphql_1.Args)('createTaskDto')),
    __param(1, (0, graphql_1.Context)('req')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto, Object]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "createTask", null);
__decorate([
    (0, graphql_1.Query)(() => [task_entity_1.Task], { description: "Encuentra todas las tareas creadas por el usuario" }),
    __param(0, (0, graphql_1.Context)('req')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "findAllTasks", null);
__decorate([
    (0, graphql_1.Query)(() => task_entity_1.Task, { description: "Encuentra una tarea por el identificador de la tarea" }),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Context)('req')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "findOneTask", null);
__decorate([
    (0, graphql_1.Mutation)(() => String, { description: "Actualiza una tarea por el identificador de la tarea" }),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('updateTaskDto')),
    __param(2, (0, graphql_1.Context)('req')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_task_dto_1.UpdateTaskDto, Object]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "updateTask", null);
__decorate([
    (0, graphql_1.Mutation)(() => String, { description: "Eliminar una tarea por el identificador" }),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Context)('req')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TaskResolver.prototype, "removeTask", null);
exports.TaskResolver = TaskResolver = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskResolver);
//# sourceMappingURL=task.resolver.js.map