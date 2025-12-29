import { InternalServerErrorException } from '@nestjs/common';
import type { Request } from 'express';
import { Types } from "mongoose";

function _idTransformRequest (_id: string|undefined|object, request: Request): object|never {
    if(_id && request.user?._id){
        return _id = _idTransform(request.user._id)
    }
    throw new InternalServerErrorException("No se ha podido procesar las credenciales del usuario")
}

function _idTransform (_id: string): object{
    return new Types.ObjectId(_id)
}

export { _idTransformRequest, _idTransform }