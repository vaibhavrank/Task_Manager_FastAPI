// src/components/Dashboard/EmptyState.js
import React from 'react';

const EmptyState = ({ 
  title = "No tasks found", 
  message = "Create your first task to get started!",
  actionText = "Create Task",
  onAction,
  icon = "📝"
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 2rem',
      textAlign: 'center',
      color: '#666'
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
        {icon}
      </div>
      <h3 style={{ 
        fontSize: '1.5rem', 
        marginBottom: '0.5rem', 
        color: '#333' 
      }}>
        {title}
      </h3>
      <p style={{ 
        fontSize: '1rem', 
        marginBottom: '2rem', 
        maxWidth: '400px',
        lineHeight: '1.5'
      }}>
        {message}
      </p>
      {onAction && (
        <button 
          className="btn btn-primary"
          onClick={onAction}
          style={{ fontSize: '1rem', padding: '12px 24px' }}
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;