export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskStatus = 'active' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string;
  createdAt: string;
  completedAt?: string;
}

export type TaskFilter = 'all' | 'active' | 'completed';
