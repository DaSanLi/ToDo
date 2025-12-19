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