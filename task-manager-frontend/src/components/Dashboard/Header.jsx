
// src/components/Dashboard/Header.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className='p-6'>
          <h1 className="text-2xl font-bold text-gray-900">Task Manager </h1>
        </div>
        <div className='p-6'>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>

  );
};

export default Header;
