import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { genderType } from "../types/types";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User { 
    
    @Prop({id: true})
    id: string; 
    
    @Prop() 
    fullName: string; 
    
    @Prop({ unique: true }) 
    email: string;
    
    @Prop()
    password: string; 
    
    @Prop()
    gender: genderType;

}

export const UserSchema = SchemaFactory.createForClass(User);