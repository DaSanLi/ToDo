import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { genderType } from "../types/types";
import { Task, TaskSchema } from '../../tasks/entities/task.entity';
import * as mongoose from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    _id: string;

    @Prop()
    fullName: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop()
    gender: genderType;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
    tasks: mongoose.Schema.Types.ObjectId;

}

export const UserSchema = SchemaFactory.createForClass(User);