"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskStatus = exports.priorityState = void 0;
var priorityState;
(function (priorityState) {
    priorityState["baja"] = "baja";
    priorityState["media"] = "media";
    priorityState["alta"] = "alta";
    priorityState["urgente"] = "urgente";
})(priorityState || (exports.priorityState = priorityState = {}));
var taskStatus;
(function (taskStatus) {
    taskStatus["pendiente"] = "pendiente";
    taskStatus["asignada"] = "asignada";
    taskStatus["realizando"] = "realizando";
    taskStatus["completada"] = "completada";
})(taskStatus || (exports.taskStatus = taskStatus = {}));
//# sourceMappingURL=task.types.js.map