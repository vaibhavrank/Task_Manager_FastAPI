# Smart Task Manager - Complete Setup Instructions

This guide will help you set up both the backend (FastAPI) and frontend (React) of the Smart Task Manager application.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Python 3.8+** (for backend)
- **Node.js 14+** (for frontend)
- **npm or yarn** (comes with Node.js)
- **Git** (for version control)
- **A code editor** (VS Code recommended)

## Backend Setup (FastAPI)

### 1. Clone and Setup Backend

```bash
# Create backend directory
mkdir smart-task-manager-backend
cd smart-task-manager-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn sqlalchemy sqlite3 passlib[bcrypt] python-jose[cryptography] python-multipart emails python-dotenv
```

### 2. Create Backend Files

Create the following files in your backend directory (you should have these from the previous chat):

- `main.py` - FastAPI application entry point
- `models.py` - SQLAlchemy models
- `database.py` - Database configuration
- `auth.py` - Authentication utilities
- `schemas.py` - Pydantic schemas
- `crud.py` - Database operations
- `email_service.py` - Email notification service
- `requirements.txt` - Python dependencies

### 3. Environment Configuration

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL=sqlite:///./test.db

# JWT Configuration
SECRET_KEY=your-secret-key-here-make-it-very-long-and-random
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Email Configuration (for production)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com

# App Configuration
APP_NAME=Smart Task Manager
DEBUG=True
```

### 4. Run Backend

```bash
# Make sure virtual environment is activated
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at `http://localhost:8000`

# Smart Personal Task Manager - Frontend

A modern, full-featured task management application built with React, Redux, and various modern web technologies.

## Features

- **User Authentication**: JWT-based authentication with login/register
- **Task Management**: Full CRUD operations for tasks
- **Task Filtering & Sorting**: Filter by status, priority, date range, and search
- **Analytics Dashboard**: Visual charts and statistics about task completion
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: State management with Redux for consistent UI updates
- **Persistent Storage**: User preferences and filters saved locally
- **Email Notifications**: Automated notifications for task deadlines
- **Modern UI**: Clean, intuitive interface with loading states and error handling

## Technology Stack

- **React 18**: Modern React with hooks and functional components
- **Redux Toolkit**: State management with RTK Query for API calls
- **React Router**: Client-side routing with protected routes
- **Chart.js & Recharts**: Data visualization for analytics
- **Axios**: HTTP client for API communication
- **Date-fns**: Date manipulation and formatting
- **CSS3**: Modern styling with flexbox/grid layouts

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── Login.js
│   │   └── Register.js
│   ├── Common/
│   │   ├── ProtectedRoute.js
│   │   ├── Loading.js
│   │   ├── Notification.js
│   │   ├── ConfirmModal.js
│   │   └── ErrorBoundary.js
│   └── Dashboard/
│       ├── Dashboard.js
│       ├── Header.js
│       ├── TaskList.js
│       ├── TaskCard.js
│       ├── TaskModal.js
│       ├── TaskFilters.js
│       ├── Analytics.js
│       ├── StatsCards.js
│       └── EmptyState.js
├── store/
│   ├── store.js
│   └── slices/
│       ├── authSlice.js
│       └── taskSlice.js
├── services/
│   └── apiConnector.js
├── hooks/
│   └── index.js
├── utils/
│   └── index.js
├── constants/
│   └── index.js
├── App.js
├── index.js
└── index.css
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on http://localhost:8000

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smart-task-manager-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the environment variables in `.env` file as needed.

5. Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run lint` - Runs ESLint to check code quality
- `npm run lint:fix` - Automatically fixes ESLint issues
- `npm run format` - Formats code with Prettier

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_NAME=Smart Task Manager
REACT_APP_VERSION=1.0.0
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_NOTIFICATIONS=true
REACT_APP_DEBUG=false
```

### API Integration

The frontend communicates with the FastAPI backend through the `apiConnector` service. All API calls are centralized and include:

- Automatic token attachment for authenticated requests
- Request/response interceptors for error handling
- Consistent error message formatting
- Loading state management

## Key Components

### Authentication
- **Login/Register**: Form validation and error handling
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Token Management**: Automatic token refresh and storage

### Task Management
- **Task CRUD**: Create, read, update, delete operations
- **Task Filtering**: Multi-criteria filtering with persistent state
- **Task Sorting**: Sortable by date, priority, status
- **Bulk Operations**: Select and modify multiple tasks

### Analytics
- **Statistics Cards**: Quick overview of task metrics
- **Charts**: Visual representation using Chart.js and Recharts
- **Progress Tracking**: Completion rates and productivity insights

### UI/UX Features
- **Responsive Design**: Mobile-first approach
- **Loading States**: Skeleton screens and spinners
- **Error Boundaries**: Graceful error handling
- **Notifications**: Toast messages for user feedback
- **Modals**: Confirmation dialogs and forms

## State Management

Redux Toolkit is used for state management with the following slices:

- **authSlice**: User authentication state
- **taskSlice**: Task data and operations

State is persisted using Redux Persist for user preferences and authentication.

## API Integration

All API calls are handled through the `apiConnector` service which provides:

- Centralized axios configuration
- Automatic token management
- Error handling and transformation
- Request/response logging (development mode)

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Implement proper error boundaries
- Use TypeScript-style prop validation where needed

### Performance
- Implement proper memoization with useMemo/useCallback
- Lazy load components where appropriate
- Optimize re-renders with proper dependency arrays

### Testing
- Write unit tests for utility functions
- Test component behavior with React Testing Library
- Mock API calls in tests

## Deployment

### Production Build

```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Environment Configuration

For production deployment, ensure environment variables are properly set:

- `REACT_APP_API_URL`: Production API URL
- Other configuration variables as needed

## Troubleshooting

### Common Issues

1. **API Connection Issues**
   - Verify backend is running on correct port
   - Check CORS configuration
   - Validate environment variables

2. **Authentication Problems**
   - Clear localStorage/sessionStorage
   - Check token expiration
   - Verify JWT configuration matches backend

3. **Build Issues**
   - Clear node_modules and reinstall
   - Check for conflicting dependencies
   - Verify Node.js version compatibility

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please create an issue in the repository or contact the development team.