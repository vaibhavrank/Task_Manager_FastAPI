// src/utils/index.js
import { format, parseISO, isValid, isPast } from 'date-fns';

// Date utilities
export const formatDate = (date, formatString = 'MMM dd, yyyy HH:mm') => {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsedDate) ? format(parsedDate, formatString) : 'Invalid Date';
  } catch (error) {
    return 'Invalid Date';
  }
};

export const isOverdue = (deadline) => {
  try {
    const deadlineDate = typeof deadline === 'string' ? parseISO(deadline) : deadline;
    return isValid(deadlineDate) ? isPast(deadlineDate) : false;
  } catch (error) {
    return false;
  }
};

export const formatDateForInput = (date) => {
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(parsedDate)) return '';
    
    // Format for datetime-local input
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const hours = String(parsedDate.getHours()).padStart(2, '0');
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } catch (error) {
    return '';
  }
};

// Storage utilities
export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// Validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateTaskForm = (task) => {
  const errors = {};
  
  if (!task.title?.trim()) {
    errors.title = 'Title is required';
  }
  
  if (!task.deadline) {
    errors.deadline = 'Deadline is required';
  } else if (isPast(parseISO(task.deadline))) {
    errors.deadline = 'Deadline cannot be in the past';
  }
  
  if (!task.priority) {
    errors.priority = 'Priority is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Array utilities
export const sortTasks = (tasks, sortBy = 'deadline', sortOrder = 'asc') => {
  return [...tasks].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    // Handle date sorting
    if (sortBy === 'deadline' || sortBy === 'created_at' || sortBy === 'updated_at') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

export const filterTasks = (tasks, filters) => {
  return tasks.filter(task => {
    // Status filter
    if (filters.status && filters.status !== 'all' && task.status !== filters.status) {
      return false;
    }
    
    // Priority filter
    if (filters.priority && filters.priority !== 'all' && task.priority !== filters.priority) {
      return false;
    }
    
    // Date range filter
    if (filters.dateFrom) {
      const taskDate = new Date(task.created_at);
      const fromDate = new Date(filters.dateFrom);
      if (taskDate < fromDate) return false;
    }
    
    if (filters.dateTo) {
      const taskDate = new Date(task.created_at);
      const toDate = new Date(filters.dateTo);
      if (taskDate > toDate) return false;
    }
    
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const titleMatch = task.title.toLowerCase().includes(searchTerm);
      const descriptionMatch = task.description?.toLowerCase().includes(searchTerm);
      if (!titleMatch && !descriptionMatch) return false;
    }
    
    return true;
  });
};

// String utilities
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Task statistics utilities
export const getTaskStats = (tasks) => {
  const stats = {
    total: tasks.length,
    pending: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
    byPriority: { low: 0, medium: 0, high: 0 },
    completionRate: 0
  };
  
  tasks.forEach(task => {
    // Count by status
    if (task.status === 'pending') stats.pending++;
    else if (task.status === 'in-progress') stats.inProgress++;
    else if (task.status === 'completed') stats.completed++;
    
    // Count overdue (not completed and past deadline)
    if (task.status !== 'completed' && isOverdue(task.deadline)) {
      stats.overdue++;
    }
    
    // Count by priority
    if (task.priority === 'low') stats.byPriority.low++;
    else if (task.priority === 'medium') stats.byPriority.medium++;
    else if (task.priority === 'high') stats.byPriority.high++;
  });
  
  // Calculate completion rate
  stats.completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  
  return stats;
};

// Error handling utilities
export const getErrorMessage = (error) => {
  if (error.response) {
    // Server responded with error status
    return error.response.data?.message || error.response.data?.detail || 'Server Error';
  } else if (error.request) {
    // Request was made but no response received
    return 'Network Error - Please check your connection';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred';
  }
};

// Debounce utility
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};