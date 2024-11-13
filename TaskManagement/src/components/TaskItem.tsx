import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTaskStatus } from '../features/tasks/taskSlice';
import { TaskStatus } from '../interface/TaskUserInterface';

interface TaskItemProps {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  assignedUser: string;
  statusColor: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, description, status, createdAt, assignedUser,statusColor }) => {
  const dispatch = useDispatch();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateTaskStatus({ id, status: e.target.value as TaskStatus }));
  };

  return (
    <div className={`p-4 rounded-lg ${statusColor}`}>
      <h3 className="text-lg font-semibold text-purple-800">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
      <p className="mt-2"><strong>Status:</strong> {status}</p>
      <p className="mt-2"><strong>Created At:</strong> {createdAt}</p>
      <p className="mt-2"><strong>Assigned User:</strong> {assignedUser}</p>
      <select 
            value={status} 
            onChange={handleStatusChange}
            className="mt-3 p-2 border border-purple-300 rounded bg-white focus:border-purple-500"
      >
        <option value="TO DO">TO DO</option>
        <option value="IN PROGRESS">IN PROGRESS</option>
        <option value="DONE">DONE</option>
      </select>
    </div>
  );
};

export default TaskItem;
