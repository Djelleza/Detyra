import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskStatus } from '../../interface/TaskUserInterface';

const loadTasksFromLocalStorage = (): Task[] => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

interface TaskState {
  tasks: Task[];
  loading: boolean;  
}

const initialState: TaskState = {
  tasks: loadTasksFromLocalStorage(),
  loading: true,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasksRequest: (state) => {
      state.loading = true;
    },
    fetchTasksSuccess: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      state.loading = false; 
      saveTasksToLocalStorage(state.tasks);
    },
    fetchTasksFailure: (state) => {
      state.loading = false; 
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    updateTaskStatus: (state, action: PayloadAction<{ id: string; status: TaskStatus }>) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
        saveTasksToLocalStorage(state.tasks);
      }
    },
  },
});

export const { addTask, fetchTasksRequest, fetchTasksSuccess, fetchTasksFailure,updateTaskStatus } = taskSlice.actions;
export default taskSlice.reducer;
