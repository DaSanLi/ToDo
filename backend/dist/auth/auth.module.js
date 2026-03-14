"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
<<<<<<< HEAD
=======
const auth_cookies_service_1 = require("./scripts/auth-cookies.service");
>>>>>>> main
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./JWT/constants");
const auth_resolver_1 = require("./auth.resolver");
<<<<<<< HEAD
=======
const auth_guard_1 = require("./guard/auth.guard");
>>>>>>> main
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            jwt_1.JwtModule.register({
                global: true,
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '3600s' },
            }),
        ],
<<<<<<< HEAD
        providers: [auth_service_1.AuthService, auth_resolver_1.AuthResolver],
=======
        providers: [auth_service_1.AuthService, auth_resolver_1.AuthResolver, auth_guard_1.AuthGuard, auth_cookies_service_1.AuthCookiesService],
>>>>>>> main
        controllers: []
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map