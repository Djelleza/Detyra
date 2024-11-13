import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchUsersRequest } from '../features/users/userSlice';
import { User } from '../interface/TaskUserInterface';

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  return (
    <div className="p-8 bg-purple-50 min-h-screen">
      <h2 className="text-2xl font-bold text-purple-900 mb-6">Users</h2>
      {loading ? (
        <p className="text-purple-700">Loading users...</p>
       ) : users.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user: User) => (
            <div
              key={user.id}
              className="flex flex-col items-center p-4 border border-purple-300 rounded-lg bg-white shadow-lg space-y-2"
            >
              <img
                src={`https://robohash.org/${user.name}.png?size=100x100`} 
                alt={`${user.name} profile`}
                className="w-20 h-20 rounded-full mb-2"
              />
              <h3 className="text-lg font-medium text-purple-800">{user.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-purple-700">No users available.</p>
      )}
    </div>
  );
};

export default UserList;
