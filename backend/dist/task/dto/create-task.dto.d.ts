import { priorityState, taskStatus } from '../scripts/task.types';
export declare class CreateTaskDto {
    title?: string;
    priority?: priorityState;
    description?: string;
    status: taskStatus;
    orderInStatus: number;
}
