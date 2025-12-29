import { HydratedDocument } from 'mongoose';
import { priorityType } from '../utilities/utilities-types';
import * as mongoose from 'mongoose';
export type TaskDocument = HydratedDocument<Task>;
export declare class Task {
    title: string;
    description: string;
    priority: priorityType;
    user: mongoose.Schema.Types.ObjectId;
}
export declare const TaskSchema: mongoose.Schema<Task, mongoose.Model<Task, any, any, any, mongoose.Document<unknown, any, Task, any, mongoose.DefaultSchemaOptions> & Task & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any, Task>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Task, mongoose.Document<unknown, {}, Task, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<Task & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: mongoose.SchemaDefinitionProperty<string, Task, mongoose.Document<unknown, {}, Task, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<Task & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: mongoose.SchemaDefinitionProperty<string, Task, mongoose.Document<unknown, {}, Task, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<Task & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    priority?: mongoose.SchemaDefinitionProperty<priorityType, Task, mongoose.Document<unknown, {}, Task, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<Task & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    user?: mongoose.SchemaDefinitionProperty<mongoose.Schema.Types.ObjectId, Task, mongoose.Document<unknown, {}, Task, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<Task & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Task>;
