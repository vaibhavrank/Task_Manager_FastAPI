// src/components/Dashboard/Analytics.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { fetchTaskStats } from '../../store/slices/taskSlice';

const Analytics = () => {
  const dispatch = useDispatch();
  const { stats: taskStats, loading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTaskStats());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const statusData = [
    { name: 'Completed', value: taskStats?.completed || 0, color: '#10B981' },
    { name: 'In Progress', value: taskStats?.in_progress || 0, color: '#F59E0B' },
    { name: 'Pending', value: taskStats?.pending || 0, color: '#6B7280' }
  ];

  const priorityData = [
    { name: 'High', value: taskStats?.high_priority || 0, color: '#EF4444' },
    { name: 'Medium', value: taskStats?.medium_priority || 0, color: '#F59E0B' },
    { name: 'Low', value: taskStats?.low_priority || 0, color: '#10B981' }
  ];

  const weeklyData = [
    { day: 'Mon', completed: 3, created: 2 },
    { day: 'Tue', completed: 5, created: 4 },
    { day: 'Wed', completed: 2, created: 3 },
    { day: 'Thu', completed: 7, created: 1 },
    { day: 'Fri', completed: 4, created: 5 },
    { day: 'Sat', completed: 1, created: 2 },
    { day: 'Sun', completed: 2, created: 1 }
  ];

  const completionRate = taskStats?.completed && taskStats?.total_tasks
    ? Math.round((taskStats.completed / taskStats.total_tasks) * 100)
    : 0;

  const StatCard = ({ title, value, subtitle, color = 'indigo' }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg px-6 py-5">
      <div className="flex items-center space-x-4">
        <div className={`w-10 h-10 bg-${color}-100 rounded-full flex items-center justify-center`}>
          <span className="text-black font-bold text-sm">{title.charAt(0)}</span>
        </div>
        <div className="flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="text-3xl font-bold text-gray-900">{value}</dd>
            {subtitle && <dd className="text-sm text-gray-500">{subtitle}</dd>}
          </dl>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-12 gap-7 flex flex-col m-5">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Task Analytics</h1>
        <p className="text-gray-600">Overview of your task management performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-6 p-10">
        <StatCard title="Total Tasks" value={taskStats?.total_tasks || 0} color="blue" />
        <StatCard title="Completed" value={taskStats?.completed || 0} subtitle={`${completionRate}% completion rate`} color="green" />
        <StatCard title="In Progress" value={taskStats?.in_progress || 0} color="yellow" />
        <StatCard title="Pending" value={taskStats?.pending || 0} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        <div className="bg-white px-6 py-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Task Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white px-6 py-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Tasks by Priority</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white px-6 py-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Weekly Activity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} name="Tasks Completed" />
            <Line type="monotone" dataKey="created" stroke="#6366F1" strokeWidth={2} name="Tasks Created" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white px-6 py-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Productivity Insights</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Average completion time:</span>
              <span className="font-medium">2.3 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Most productive day:</span>
              <span className="font-medium">Thursday</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tasks created this week:</span>
              <span className="font-medium">18</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tasks completed this week:</span>
              <span className="font-medium">24</span>
            </div>
          </div>
        </div>

        <div className="bg-white px-6 py-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Goals & Targets</h3>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Weekly completion goal</span>
                <span className="text-sm text-gray-900">24/20</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <p className="text-xs text-green-600 mt-1">Goal exceeded! 🎉</p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Overdue reduction</span>
                <span className="text-sm text-gray-900">3/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">Good progress, keep it up!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
