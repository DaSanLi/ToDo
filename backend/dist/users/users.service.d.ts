import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Task } from '../task/entities/task.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly UserRepository;
    private readonly TaskRepository;
    constructor(UserRepository: Repository<User>, TaskRepository: Repository<Task>);
    createUser(body: CreateUserDto): Promise<User>;
    findAllUsers(): Promise<User[]>;
    findOneUser(id: string): Promise<User>;
    updateUser(id: string, body: UpdateUserDto): Promise<string>;
    softDeleteUSer(id: string): Promise<string>;
    cancelSoftDelete(id: string): Promise<string>;
    hardDelete(id: string): Promise<string>;
}
