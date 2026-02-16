"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
const typeorm_1 = require("typeorm");
const configuration_1 = __importDefault(require("./configuration"));
const config = (0, configuration_1.default)();
exports.AppDataSource = new typeorm_1.DataSource({
    ...config.database,
});
//# sourceMappingURL=Data-Source.js.map