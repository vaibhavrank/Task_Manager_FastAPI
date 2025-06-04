// src/components/Dashboard/StatsCards.js
import React from 'react';

const StatsCards = ({ tasks }) => {
  const stats = {
    total: tasks.length,
    pending: tasks.filter(task => task.status === 'pending').length,
    inProgress: tasks.filter(task => task.status === 'in-progress').length,
    completed: tasks.filter(task => task.status === 'completed').length,
    overdue: tasks.filter(task => 
      new Date(task.deadline) < new Date() && task.status !== 'completed'
    ).length,
    highPriority: tasks.filter(task => task.priority === 'high').length
  };

  const StatCard = ({ title, value, color, icon }) => (
    <div className="card" style={{ 
      minHeight: '120px', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center',
      borderTop: `4px solid ${color}` 
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: color, 
            margin: 0 
          }}>
            {value}
          </h3>
          <p style={{ 
            color: '#666', 
            fontSize: '14px', 
            margin: '4px 0 0 0',
            fontWeight: '500' 
          }}>
            {title}
          </p>
        </div>
        <div style={{ 
          fontSize: '2rem', 
          color: color, 
          opacity: 0.7 
        }}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
      gap: '1rem', 
      marginBottom: '2rem' 
    }}>
      <StatCard 
        title="Total Tasks" 
        value={stats.total} 
        color="#007bff" 
        icon="📋"
      />
      <StatCard 
        title="Pending" 
        value={stats.pending} 
        color="#6c757d" 
        icon="⏳"
      />
      <StatCard 
        title="In Progress" 
        value={stats.inProgress} 
        color="#17a2b8" 
        icon="🔄"
      />
      <StatCard 
        title="Completed" 
        value={stats.completed} 
        color="#28a745" 
        icon="✅"
      />
      <StatCard 
        title="Overdue" 
        value={stats.overdue} 
        color="#dc3545" 
        icon="⚠️"
      />
      <StatCard 
        title="High Priority" 
        value={stats.highPriority} 
        color="#ffc107" 
        icon="🔥"
      />
    </div>
  );
};

export default StatsCards;