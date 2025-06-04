
// src/store/slices/taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiConnector } from '../../services/apiConnector';

// Async thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await apiConnector.getTasks(filters);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch tasks');
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await apiConnector.createTask(taskData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to create task');
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, taskData }, { rejectWithValue }) => {
    try {
      const response = await apiConnector.updateTask(taskId, taskData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to update task');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, { rejectWithValue }) => {
    try {
      await apiConnector.deleteTask(taskId);
      return taskId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to delete task');
    }
  }
);

export const fetchTaskStats = createAsyncThunk(
  'tasks/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiConnector.getTaskStats();
      console.log("API RESPONSE: ",response)
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch stats');
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    stats: null,
    loading: false,
    error: null,
    filters: {
      status: '',
      priority: '',
      date_from: '',
      date_to: ''
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create task
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })
      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })
      // Fetch stats
      .addCase(fetchTaskStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export const { setFilters, clearError } = taskSlice.actions;
export default taskSlice.reducer;
