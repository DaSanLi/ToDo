import { User } from '../../users/entities/user.entity';
import { priorityState } from "../scripts/task.types";
export declare class Task {
    id: string;
    user: User;
    title: string;
    priority: priorityState;
    description: string;
    deletedAt?: Date | null;
}
