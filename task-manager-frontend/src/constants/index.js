// src/constants/index.js
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed'
};

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  TASKS: 'tasks',
  FILTERS: 'task_filters'
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  TASKS: '/tasks',
  ANALYTICS: '/analytics'
};

export const MESSAGES = {
  SUCCESS: {
    TASK_CREATED: 'Task created successfully!',
    TASK_UPDATED: 'Task updated successfully!',
    TASK_DELETED: 'Task deleted successfully!',
    LOGIN_SUCCESS: 'Welcome back!',
    REGISTER_SUCCESS: 'Account created successfully!',
    LOGOUT_SUCCESS: 'Logged out successfully!'
  },
  ERROR: {
    GENERIC: 'Something went wrong. Please try again.',
    NETWORK: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    VALIDATION: 'Please fill in all required fields.',
    LOGIN_FAILED: 'Invalid email or password.',
    REGISTER_FAILED: 'Failed to create account. Please try again.'
  }
};

export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy HH:mm',
  INPUT: 'yyyy-MM-dd\'T\'HH:mm',
  API: 'yyyy-MM-dd\'T\'HH:mm:ss'
};

export const CHART_COLORS = {
  PRIMARY: '#007bff',
  SUCCESS: '#28a745',
  WARNING: '#ffc107',
  DANGER: '#dc3545',
  INFO: '#17a2b8',
  SECONDARY: '#6c757d'
};