import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"; 
import { genderType } from "../types/types";

@Entity()
export class User { 
    
    @PrimaryGeneratedColumn("uuid")
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