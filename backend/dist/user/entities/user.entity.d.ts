import { HydratedDocument } from 'mongoose';
import { genderType } from "../types/types";
export type UserDocument = HydratedDocument<User>;
export declare class User {
    id: string;
    fullName: string;
    email: string;
    password: string;
    gender: genderType;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User, any, import("mongoose").DefaultSchemaOptions> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any, User>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, User, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<string, User, import("mongoose").Document<unknown, {}, User, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    fullName?: import("mongoose").SchemaDefinitionProperty<string, User, import("mongoose").Document<unknown, {}, User, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, User, import("mongoose").Document<unknown, {}, User, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    password?: import("mongoose").SchemaDefinitionProperty<string, User, import("mongoose").Document<unknown, {}, User, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    gender?: import("mongoose").SchemaDefinitionProperty<genderType, User, import("mongoose").Document<unknown, {}, User, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, User>;
