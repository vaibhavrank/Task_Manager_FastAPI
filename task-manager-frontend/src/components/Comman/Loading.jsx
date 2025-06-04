// src/components/Common/Loading.js
import React from 'react';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <span style={{ marginLeft: '10px' }}>{message}</span>
    </div>
  );
};

export default Loading;