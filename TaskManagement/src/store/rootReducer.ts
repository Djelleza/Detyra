import { combineReducers } from '@reduxjs/toolkit';
import taskReducer from '../features/tasks/taskSlice';
import userReducer from '../features/users/userSlice';

const rootReducer = combineReducers({
  tasks: taskReducer,
  users: userReducer,
});

export default rootReducer;
