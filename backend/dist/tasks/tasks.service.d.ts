import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../user/entities/user.entity';
import { Model } from 'mongoose';
import { Task } from './entities/task.entity';
export declare class TasksService {
    private userModel;
    private tasksModel;
    constructor(userModel: Model<User>, tasksModel: Model<Task>);
    create(createTaskDto: CreateTaskDto, user_id: object): Promise<object>;
    findAll(user_id: object): Promise<Task[]>;
    findOne(id: string, user_id: object): Promise<Task>;
    update(id: string, updateTaskDto: UpdateTaskDto, user_id: object): Promise<object>;
    remove(id: string, user_id: object): Promise<object>;
}
