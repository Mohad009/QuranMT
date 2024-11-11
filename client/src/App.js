import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Sidebar from './Components/SideBar';
// import AdminDashboard from './pages/AdminDashboard';
// import TeacherDashboard from './pages/TeacherDashboard';
// import ParentDashboard from './pages/ParentDashboard';
// import Attendance from './pages/Attendance';
// import Progress from './pages/Progress';
// import Settings from './pages/Settings';
// import ManageUsers from './pages/ManageUsers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/sidebar'  element={<Sidebar/>}/>
        {/* // <Route path="/admin/*" element={<AdminDashboard />} />
        // <Route path="/teacher/*" element={<TeacherDashboard />} />
        // <Route path="/parent/*" element={<ParentDashboard />} />
        // <Route path="/attendance" element={<Attendance />} />
        // <Route path="/progress" element={<Progress />} />
        // <Route path="/settings" element={<Settings />} />
        // <Route path="/manage-users" element={<ManageUsers />} /> */}
      </Routes>
    </Router>
  );
}

export default App;