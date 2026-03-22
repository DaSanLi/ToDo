import { useQuery } from '@apollo/client/react';
import { FIND_ALL_TASKS } from '../queries/tasks';

interface Task {
  id: string;
  title: string;
  priority: string;
  description: string;
}

interface FindAllTasksData {
  findAllTasks: Task[];
}

export function useTasks() {
  const { data, loading, error, refetch } = useQuery<FindAllTasksData>(FIND_ALL_TASKS, {
    context: {
      credentials: 'include',
    },
  });

  const tasks: Task[] = data?.findAllTasks || [];

  return { tasks, loading, error, refetch };
}
