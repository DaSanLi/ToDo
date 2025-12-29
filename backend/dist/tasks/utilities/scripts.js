"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._idTransformRequest = _idTransformRequest;
exports._idTransform = _idTransform;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
function _idTransformRequest(_id, request) {
    if (_id && request.user?._id) {
        return _id = _idTransform(request.user._id);
    }
    throw new common_1.InternalServerErrorException("No se ha podido procesar las credenciales del usuario");
}
function _idTransform(_id) {
    return new mongoose_1.Types.ObjectId(_id);
}
//# sourceMappingURL=scripts.js.map