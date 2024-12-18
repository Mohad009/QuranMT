import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Sidebar from './Components/SideBar';
import TeacherDashboard from './Components/TeacherDashboard';
import AdminDashboard from './Components/AdminDashboard';
import { useSelector } from 'react-redux';
import ProgressTracking from './Components/PrograssTracking';
import AttendancePage from './Components/AttendancePage';
import SettingsPage from './Components/SettingsPage';
import ManageStudents from './Components/students/ManageStudents';
import ProtectedRoute from './Components/ProtectedRoute';
import ManageUsers from './Components/users/ManageUsers';

function App() {
  const { isLogin, user } = useSelector((state) => state.users);

  // Define role-based routes
  const getHomeRoute = () => {
    switch (user?.utype) {
      case 'admin':
        return '/admin';
      case 'teacher':
        return '/teacher';
      case 'parent':
        return '/parent-dashboard';
      default:
        return '/';
    }
  };

  return (
    <Router>
      <div className="flex h-screen">
        {isLogin && <Sidebar />}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Login />} />
            
            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/manageUsers" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ManageUsers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/manageStudents" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ManageStudents />
                </ProtectedRoute>
              } 
            />

            {/* Teacher Routes */}
            <Route 
              path="/teacher" 
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/attendance" 
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <AttendancePage />
                </ProtectedRoute>
              } 
            />

            {/* Shared Routes */}
            <Route 
              path="/progress" 
              element={
                <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                  <ProgressTracking />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute allowedRoles={['admin', 'teacher', 'parent']}>
                  <SettingsPage />
                </ProtectedRoute>
              } 
            />

            {/* Catch-all redirect to appropriate dashboard */}
            <Route 
              path="*" 
              element={<Navigate to={getHomeRoute()} replace />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;