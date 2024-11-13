export type TaskStatus = 'TO DO' | 'IN PROGRESS' | 'DONE';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: number;
  userId?: string; 
}

  
  export interface User {
    id: string;
    name: string;
  }