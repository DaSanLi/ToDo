"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedFunction = exports.InternalExpectionFunction = exports.BadRequestFunction = void 0;
const common_1 = require("@nestjs/common");
const BadRequestFunction = (mensaje) => {
    throw new common_1.BadRequestException(mensaje);
};
exports.BadRequestFunction = BadRequestFunction;
const InternalExpectionFunction = (mensaje) => {
    throw new common_1.InternalServerErrorException(mensaje);
};
exports.InternalExpectionFunction = InternalExpectionFunction;
const UnauthorizedFunction = (mensaje) => {
    throw new common_1.UnauthorizedException(mensaje);
};
exports.UnauthorizedFunction = UnauthorizedFunction;
//# sourceMappingURL=task.scripts.js.map