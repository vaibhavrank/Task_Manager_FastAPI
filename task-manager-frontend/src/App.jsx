// # package.json
// {
//   "name": "task-manager-frontend",
//   "version": "0.1.0",
//   "private": true,
//   "dependencies": {
//     "@reduxjs/toolkit": "^1.9.7",
//     "react": "^18.2.0",
//     "react-dom": "^18.2.0",
//     "react-redux": "^8.1.3",
//     "react-router": "^6.18.0",
//     "recharts": "^2.8.0",
//     "chart.js": "^4.4.0",
//     "react-chartjs-2": "^5.2.0",
//     "axios": "^1.6.0",
//     "date-fns": "^2.30.0",
//     "react-datepicker": "^4.23.0",
//     "react-modal": "^3.16.1",
//     "react-toastify": "^9.1.3",
//     "tailwindcss": "^3.3.5"
//   },
//   "scripts": {
//     "start": "react-scripts start",
//     "build": "react-scripts build",
//     "test": "react-scripts test",
//     "eject": "react-scripts eject"
//   },
//   "eslintConfig": {
//     "extends": [
//       "react-app",
//       "react-app/jest"
//     ]
//   },
//   "browserslist": {
//     "production": [
//       ">0.2%",
//       "not dead",
//       "not op_mini all"
//     ],
//     "development": [
//       "last 1 chrome version",
//       "last 1 firefox version",
//       "last 1 safari version"
//     ]
//   },
//   "devDependencies": {
//     "react-scripts": "5.0.1"
//   }
// }

// src/App.js
import { Provider } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../src/components/Auth/Login';
import Register from '../src/components/Auth/Register';
import ProtectedRoute from '../src/components/Comman/ProtectedRoute';
import Dashboard from '../src/components/Dashboard/Dashboard';
import './App.css';
import { store } from './store/store';

function App() {
  return (
     
      <div className="App">
       
        
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        
       
      </div>
     
  );
}

export default App;

