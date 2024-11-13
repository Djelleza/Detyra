import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
    <nav className="bg-purple-800 text-white shadow-md">

      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-2xl font-bold">Task Management App</Link>

        <div className="flex space-x-4">
          <Link to="/" className="text-pink-200 hover:text-white">Tasks</Link>
         <Link to="/users" className="text-pink-200 hover:text-white">Users</Link>
        </div>

      </div>
    </nav>
);

export default Header;
