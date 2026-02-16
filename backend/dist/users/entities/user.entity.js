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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const task_entity_1 = require("../../task/entities/task.entity");
const types_1 = require("../scripts/types");
let User = class User {
    id;
    email;
    password;
    gender;
    deletedAt;
    tasks;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    (0, graphql_1.Field)(() => graphql_1.ID, { description: "Identificador unico de usuario" }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, unique: true, nullable: false }),
    (0, graphql_1.Field)(() => String, { description: "Nombre de usuario" }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
    (0, graphql_1.Field)(() => String, { description: "Contraseña de usuario" }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
    (0, graphql_1.Field)(() => String, { description: "Género" }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, graphql_1.Field)(() => Date, { nullable: true, description: "Muestra si el usuario ha sido borrado" }),
    __metadata("design:type", Object)
], User.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.Task, (task) => task.user, { eager: true }),
    (0, graphql_1.Field)(() => [task_entity_1.Task], { nullable: true, description: "Muestra todas las tasks de todos los usuarios creados y sus campos" }),
    __metadata("design:type", Array)
], User.prototype, "tasks", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)({ description: "Representa un usuario y sus credenciales" })
], User);
//# sourceMappingURL=user.entity.js.map