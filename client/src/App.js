import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Sidebar from './Components/SideBar';
import TeacherDashboard from './Components/TeacherDashboard';
import AdminDashboard from './Components/AdminDashboard';
import { useSelector } from 'react-redux';
import ProgressTracking from './Components/PrograssTracking';
import AttendancePage from './Components/AttendancePage';
import SettingsPage from './Components/SettingsPage';
import ManageUsers from './Components/ManageUsers';
import ProtectedRoute from './Components/ProtectedRoute';

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
            <Route path="/settings" element={<SettingsPage/>} />
            <Route path="/manageUsers" element={<ManageUsers/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;