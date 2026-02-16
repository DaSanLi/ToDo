import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import type { ReqTaskAuth } from './scripts/task.types';
export declare class TaskResolver {
    private readonly taskService;
    constructor(taskService: TaskService);
    createTask(createTaskDto: CreateTaskDto, req: ReqTaskAuth): Promise<string>;
    findAllTasks(req: ReqTaskAuth): Promise<Task[]>;
    findOneTask(id: string, req: ReqTaskAuth): Promise<CreateTaskDto>;
    updateTask(id: string, updateTaskDto: UpdateTaskDto, req: ReqTaskAuth): Promise<string>;
    removeTask(id: string, req: ReqTaskAuth): Promise<string>;
}
