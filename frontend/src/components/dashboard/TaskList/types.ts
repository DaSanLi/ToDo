import { taskPriority } from '../NewTask/types'

export interface Task {
    _id: string;
    title: string;
    description: string;
    priority: taskPriority;
}