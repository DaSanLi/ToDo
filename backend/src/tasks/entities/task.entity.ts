import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { priorityType } from '../utilities/utilities-types';
import { User, UserSchema } from '../../user/entities/user.entity';
import * as mongoose from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    priority: priorityType;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: mongoose.Schema.Types.ObjectId;

}

export const TaskSchema = SchemaFactory.createForClass(Task);