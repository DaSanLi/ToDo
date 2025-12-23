<<<<<<< HEAD
import { Column, DeleteDateColumn, Entity, PrimaryColumn } from "typeorm";
import { genderType } from "../types/types";

@Entity()
export class User {

    @PrimaryColumn('uuid')
    id: string;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    gender: genderType;

    @Column({ default: true })
    active?: boolean;

    @DeleteDateColumn({ nullable: true })
    deleteAt?: Date;
}
=======
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
>>>>>>> dev
