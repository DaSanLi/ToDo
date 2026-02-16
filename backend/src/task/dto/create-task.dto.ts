import { IsString,  MinLength, MaxLength, IsNotEmpty, IsEnum } from 'class-validator';
import { priorityState } from '../scripts/task.types'
import { Field, InputType } from '@nestjs/graphql';


@InputType({ description: "Para crear una nueva tarea se deben proporcionar todos los campos"})
export class CreateTaskDto { 

    @IsString()
    @MinLength(5)
    @MaxLength(50)
    @IsNotEmpty()
    @Field()
    title: string;

    @IsEnum(priorityState)
    @Field({ description: "Solo hay 4 estados para nombrar este campo (bajo, medio, alto, urgente)"})
    priority: priorityState; 

    @MinLength(1)
    @IsString()
    @Field()
    description: string;

}
