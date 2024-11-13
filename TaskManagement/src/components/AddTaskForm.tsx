import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Task, User } from '../interface/TaskUserInterface';
import { addTask } from '../features/tasks/taskSlice';
import { v4 as uuidv4 } from 'uuid';

const AddTaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'TO DO' | 'IN PROGRESS' | 'DONE'>('TO DO');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState(''); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      status,
      createdAt: Date.now(),
      userId: selectedUser
    };

    dispatch(addTask(newTask));
    setSuccessMessage('Task added successfully!');

    setTitle('');
    setDescription('');
    setStatus('TO DO');
    setSelectedUser('');

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-sm bg-white p-4 rounded-lg shadow-md space-y-3 mx-auto mb-6">
        <div>
          <label className="block text-sm font-medium text-purple-700">Task Title</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-pink-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-purple-700">Description</label>
          <textarea
            className="mt-1 block w-full rounded-md border border-pink-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-purple-700">Status</label>
          <select
            className="mt-1 block w-full rounded-md border border-pink-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value as Task['status'])}
          >
            <option value="TO DO" className="text-yellow-500">TO DO</option>
            <option value="IN PROGRESS" className="text-blue-500">IN PROGRESS</option>
            <option value="DONE" className="text-green-500">DONE</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-purple-700">Assign to User</label>
          <select
            className="mt-1 block w-full rounded-md border border-pink-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 text-sm"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select User</option>
              {users.map((user: User) => (
                <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 text-sm">
          Add Task
        </button>
      </form>

      {successMessage && (<div className="bg-green-500 text-white text-center py-2 px-4 rounded-md shadow-md mt-4">
                              {successMessage}
                          </div>)}
    </div>
  );
};

export default AddTaskForm;
