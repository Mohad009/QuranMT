import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  // Don't show sidebar on login page
  const {isLogin}=useSelector((state)=>state.users)

  return (
    <Router>
      <div className="flex h-screen">
        {isLogin && <Sidebar />}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Login/>} />
            
            <Route path='/teacher' element={<ProtectedRoute><TeacherDashboard/></ProtectedRoute>}/>
            <Route path='/admin' element={<AdminDashboard/>}/>
            <Route path='/progress' element={<ProgressTracking/>}/>
            <Route path="/attendance" element={<ProtectedRoute><AttendancePage/></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage/></ProtectedRoute>} />
            <Route path="/manageUsers" element={<ProtectedRoute><ManageUsers/></ProtectedRoute>} />
            <Route path="/manageStudents" element={<ProtectedRoute><ManageStudents/></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;