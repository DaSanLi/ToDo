import { Task } from '../../task/entities/task.entity';
import { gender } from "../scripts/types";
export declare class User {
    id: string;
    email: string;
    password: string;
    fullName: string;
    gender: gender;
    deletedAt?: Date | null;
    tasks?: Task[];
}
