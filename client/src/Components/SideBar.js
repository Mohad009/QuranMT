import { Link, useLocation } from 'react-router-dom';

function Sidebar({ userType = 'admin' }) {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  const menuItems = {
    admin: [
      { path: '/admin', label: 'Dashboard', icon: 'HomeIcon' },
      { path: '/manage-users', label: 'Manage Users', icon: 'UsersIcon' },
      { path: '/reports', label: 'Reports', icon: 'DocumentTextIcon' },
      { path: '/settings', label: 'Settings', icon: 'Cog6ToothIcon' },
    ],
    teacher: [
      { path: '/teacher', label: 'Dashboard', icon: 'HomeIcon' },
      { path: '/attendance', label: 'Attendance', icon: 'ClipboardIcon' },
      { path: '/progress', label: 'Progress Tracking', icon: 'ChartBarIcon' },
      { path: '/reports', label: 'Reports', icon: 'DocumentTextIcon' },
    ],
    // Add parent menu items as needed
  };

  return (
    <aside className="bg-emerald-800 text-white w-64 flex-shrink-0">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Quran LMS</h1>
        <p className="text-sm text-emerald-200">{userType.charAt(0).toUpperCase() + userType.slice(1)} Dashboard</p>
      </div>
      
      <nav className="mt-8">
        {menuItems[userType].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 ${
              isActive(item.path) ? 'bg-emerald-900' : 'hover:bg-emerald-700'
            }`}
          >
            {/* Add icon component here */}
            <span className="ml-3">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;