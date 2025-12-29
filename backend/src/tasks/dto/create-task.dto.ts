import { IsEnum, IsString, MaxLength } from "class-validator";
import { priorityType } from "../utilities/utilities-types";

export class CreateTaskDto {

    @IsString()
    @MaxLength(40)
    title: string;

    @IsString()
    @MaxLength(100)
    description: string;

    @IsEnum(priorityType)
    priority: priorityType;

    user: Object;
;

}
