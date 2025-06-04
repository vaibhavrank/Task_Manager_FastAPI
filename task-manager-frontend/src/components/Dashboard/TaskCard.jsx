// src/components/Dashboard/TaskCard.js
import React, { useState } from 'react';
import ConfirmModal from '../Common/ConfirmModal';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority.toLowerCase()}`;
  };

  const getStatusClass = (status) => {
    return `status-${status.replace(' ', '-').toLowerCase()}`;
  };

  const isOverdue = () => {
    return new Date(task.deadline) < new Date() && task.status !== 'completed';
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange(task.id, newStatus);
  };

  return (
    <>
      <div className={`card ${isOverdue() ? 'overdue' : ''}`} style={{ 
        borderLeft: isOverdue() ? '4px solid #dc3545' : '4px solid #007bff',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <h4 style={{ margin: 0, color: '#333', fontSize: '16px' }}>{task.title}</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="btn btn-outline" 
              style={{ padding: '4px 8px', fontSize: '12px' }}
              onClick={() => onEdit(task)}
            >
              Edit
            </button>
            <button 
              className="btn btn-danger" 
              style={{ padding: '4px 8px', fontSize: '12px' }}
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </button>
          </div>
        </div>

        {task.description && (
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '1rem', lineHeight: '1.4' }}>
            {task.description}
          </p>
        )}

        <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span className={getPriorityClass(task.priority)}>
            {task.priority}
          </span>
          
          <select 
            value={task.status} 
            onChange={(e) => handleStatusChange(e.target.value)}
            className="form-select"
            style={{ width: 'auto', padding: '2px 8px', fontSize: '12px' }}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div style={{ fontSize: '12px', color: '#888' }}>
          <div style={{ marginBottom: '4px' }}>
            <strong>Deadline:</strong> {formatDate(task.deadline)}
            {isOverdue() && <span style={{ color: '#dc3545', marginLeft: '8px' }}>OVERDUE</span>}
          </div>
          <div style={{ marginBottom: '4px' }}>
            <strong>Created:</strong> {formatDate(task.created_at)}
          </div>
          {task.updated_at !== task.created_at && (
            <div>
              <strong>Updated:</strong> {formatDate(task.updated_at)}
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => onDelete(task.id)}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </>
  );
};

export default TaskCard;