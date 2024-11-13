import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchTasksRequest, fetchTasksSuccess } from '../features/tasks/taskSlice';
import { fetchUsersRequest, fetchUsersSuccess } from '../features/users/userSlice';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const users = useSelector((state: RootState) => state.users.users);
  const tasksLoading = useSelector((state: RootState) => state.tasks.loading);
  const usersLoading = useSelector((state: RootState) => state.users.loading);

  useEffect(() => {
    dispatch(fetchTasksRequest());
    dispatch(fetchUsersRequest());

    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    dispatch(fetchTasksSuccess(savedTasks));
    dispatch(fetchUsersSuccess(savedUsers));
  }, [dispatch]);


  const todayTasks = tasks.filter((task) => {
    const now = new Date();
    const taskDate = new Date(task.createdAt);
    const tomorrow = new Date(taskDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return task.status !== 'DONE' && now < tomorrow;
  });


  const completedTasks = tasks.filter((task) => task.status === 'DONE');

  if (tasksLoading || usersLoading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">Tasks for Today</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {todayTasks.length > 0 ? (
            todayTasks.map((task) => (
              <TaskItem
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                status={task.status}
                createdAt={new Date(task.createdAt).toLocaleString()}
                assignedUser={users.find((user) => user.id === task.userId)?.name || 'None'}
                statusColor={task.status === 'TO DO' ? 'bg-yellow-200' : task.status === 'IN PROGRESS' ? 'bg-blue-200' : 'bg-green-200'}
              />
            ))
          ) : (
            <p>No tasks to display.</p>
          )}
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">Completed Tasks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                status={task.status}
                createdAt={new Date(task.createdAt).toLocaleString()}
                assignedUser={users.find((user) => user.id === task.userId)?.name || 'None'}
                statusColor={task.status === 'TO DO' ? 'bg-yellow-200' : task.status === 'IN PROGRESS' ? 'bg-blue-200' : 'bg-green-200'}
              />
            ))
          ) : (
            <p>No completed tasks.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
