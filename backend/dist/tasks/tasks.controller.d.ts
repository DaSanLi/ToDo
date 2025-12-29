import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import type { Request } from 'express';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto, request: Request): Promise<object>;
    findAll(request: Request): Promise<import("./entities/task.entity").Task[]>;
    findOne(id: string, request: Request): Promise<import("./entities/task.entity").Task>;
    update(id: string, updateTaskDto: UpdateTaskDto, request: Request): Promise<object>;
    remove(id: string, request: Request): Promise<object>;
}
