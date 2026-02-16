import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, DeleteDateColumn, JoinColumn } from "typeorm";
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity'
import { priorityState } from "../scripts/task.types";

@Entity()
@ObjectType({ description: "Resprenta una tarea del usuario y solo podran acceder usuarios con tokens validos" })
export class Task {

        @PrimaryGeneratedColumn( 'increment' )
        @Field( () => ID, {description: "Identificador unico de la entidad"} )
        id: string; 

        @ManyToOne(() => User, (user) => user.tasks,{
                onDelete: 'CASCADE'
        })
        @JoinColumn({ name: 'userId' })
        user: User;

        @Column({ type: 'varchar' })
        @Field( () => String, {description: "Titulo de la tarea"})
        title: string;

        @Column()
        @Field({ description: "Prioridad de la tarea (baja, media, alta o urgente)"})
        priority: priorityState;

        @Column({ type: 'varchar' })
        @Field( () => String, { description: "Descripción referente a la tarea" } )
        description: string;

        @DeleteDateColumn()
        deletedAt?: Date|null;
}
