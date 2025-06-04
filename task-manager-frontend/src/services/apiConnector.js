// src/services/apiConnector.js
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:8000';

class ApiConnector {
  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(credentials) {
    try {
      const response = await this.api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Login failed');
      throw error;
    }
  }

  async register(userData) {
    try {
        console.log("Register User ID: ",userData);
      const response = await this.api.post('/auth/register', userData);

      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Registration failed');
      throw error;
    }
  }

  // Task endpoints
  async getTasks(filters = {}) {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await this.api.get(`/tasks?${params}`);
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch tasks');
      throw error;
    }
  }

  async createTask(taskData) {
    try {
      const response = await this.api.post('/tasks', taskData);
      toast.success('Task created successfully');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to create task');
      throw error;
    }
  }

  async updateTask(taskId, taskData) {
    try {
      const response = await this.api.put(`/tasks/${taskId}`, taskData);
      toast.success('Task updated successfully');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to update task');
      throw error;
    }
  }

  async deleteTask(taskId) {
    try {
      const response = await this.api.delete(`/tasks/${taskId}`);
      toast.success('Task deleted successfully');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to delete task');
      throw error;
    }
  }

  async getTaskStats() {
    try {
      const response = await this.api.get('/tasks/stats');
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch task statistics');
      throw error;
    }
  }
}

export const apiConnector = new ApiConnector();
