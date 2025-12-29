import type { Request } from 'express';
declare function _idTransformRequest(_id: string | undefined | object, request: Request): object | never;
declare function _idTransform(_id: string): object;
export { _idTransformRequest, _idTransform };
