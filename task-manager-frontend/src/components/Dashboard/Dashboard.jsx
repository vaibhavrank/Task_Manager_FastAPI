
// src/components/Dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import TaskList from './TaskList';
import TaskModal from './TaskModal';
import Analytics from './Analytics';
import TaskFilters from './TaskFilters';
import { fetchTasks, fetchTaskStats } from '../../store/slices/taskSlice';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks(filters));
    dispatch(fetchTaskStats());
  }, [dispatch, filters]);

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tasks'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tasks
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'tasks' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
              <button
                onClick={handleCreateTask}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Create Task
              </button>
            </div>
            
            <TaskFilters />
            <TaskList onEditTask={handleEditTask} />
          </div>
        )}

        {activeTab === 'analytics' && <Analytics />}
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingTask={editingTask}
      />
    </div>
  );
};

export default Dashboard;
