import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import UserList from './components/UserList';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUsersRequest } from './features/users/userSlice';
import { fetchTasksRequest } from './features/tasks/taskSlice';
import Header from './components/Header';
import AddTaskForm from './components/AddTaskForm';

const App: React.FC = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasksRequest());
    dispatch(fetchUsersRequest()); 
  }, [dispatch]);

  return (
    <Router>
    <div className="w-full min-h-screen bg-pink-100">
      <Header />
      <div className="container mx-auto  mt-6">
        <Routes>
          <Route path="/" element={
              <>
                <AddTaskForm /> 
                <TaskList />
              </>
            } 
          />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
};



export default App;
