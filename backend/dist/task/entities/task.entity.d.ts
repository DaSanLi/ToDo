import { User } from '../../users/entities/user.entity';
import { priorityState, taskStatus } from "../scripts/task.types";
export declare class Task {
    id: string;
    user: User;
    title: string;
    priority: priorityState;
    description: string;
    status: taskStatus;
    orderInStatus: number;
    deletedAt?: Date | null;
}
