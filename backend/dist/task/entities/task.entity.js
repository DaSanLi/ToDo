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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../../users/entities/user.entity");
const task_types_1 = require("../scripts/task.types");
let Task = class Task {
    id;
    user;
    title;
    priority;
    description;
    deletedAt;
};
exports.Task = Task;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    (0, graphql_1.Field)(() => graphql_1.ID, { description: "Identificador unico de la entidad" }),
    __metadata("design:type", String)
], Task.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.tasks, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Task.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    (0, graphql_1.Field)(() => String, { description: "Titulo de la tarea" }),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)({ description: "Prioridad de la tarea (baja, media, alta o urgente)" }),
    __metadata("design:type", String)
], Task.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    (0, graphql_1.Field)(() => String, { description: "Descripción referente a la tarea" }),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Object)
], Task.prototype, "deletedAt", void 0);
exports.Task = Task = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)({ description: "Resprenta una tarea del usuario y solo podran acceder usuarios con tokens validos" })
], Task);
//# sourceMappingURL=task.entity.js.map