"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
    app.enableCors({
        "origin": "http://localhost:3000",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "credentials": true,
    });
    app.use((0, cookie_parser_1.default)());
    console.log(`servidor corriendo en : http://localhost:${port}, entra en: http://localhost:${port}/graphql`);
    await app.listen(port);
}
void bootstrap();
//# sourceMappingURL=main.js.map