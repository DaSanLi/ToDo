import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity';
export declare class TaskService {
    private readonly TaskRepository;
    private readonly UserRepository;
    constructor(TaskRepository: Repository<Task>, UserRepository: Repository<User>);
    createTask(CreateTaskDto: CreateTaskDto, { email }: {
        email: string;
    }): Promise<string>;
    findAllTask({ email }: {
        email: string;
    }): Promise<Task[]>;
    findOneTask(id: string, { email }: {
        email: string;
    }): Promise<CreateTaskDto>;
    updateTask(id: string, updateTaskDto: UpdateTaskDto, { email }: {
        email: string;
    }): Promise<string>;
    removeTask(id: string, { email }: {
        email: string;
    }): Promise<string>;
}
