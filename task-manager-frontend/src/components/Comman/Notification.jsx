// src/components/Common/Notification.js
import React, { useEffect } from 'react';

const Notification = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  if (!message) return null;

  return (
    <div 
      className={`alert alert-${type === 'error' ? 'error' : type}`}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1001,
        minWidth: '300px',
        cursor: 'pointer'
      }}
      onClick={onClose}
    >
      {message}
    </div>
  );
};

export default Notification;