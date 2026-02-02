"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachAuthCookie = void 0;
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
async function hashPassword(password) {
    const saltOrRounds = 10;
    return await bcrypt_1.default.hash(password, saltOrRounds);
}
async function verifyPassword(password, passwordBD) {
    const isMatch = await bcrypt_1.default.compare(password, passwordBD);
    return isMatch;
}
const attachAuthCookie = (res, token) => {
    const { name, value, options } = createCookie(token);
    return res.cookie(name, value, options);
};
exports.attachAuthCookie = attachAuthCookie;
function createCookie(token) {
    return {
        name: 'auth_token',
        value: token,
        options: httpCookieConfig
    };
}
const httpCookieConfig = {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/'
};
//# sourceMappingURL=scripts.js.map