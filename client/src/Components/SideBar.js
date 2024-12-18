import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { RiDashboardLine } from 'react-icons/ri';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { TbProgress } from 'react-icons/tb';
import { IoSettingsOutline } from 'react-icons/io5';
import { BsCalendarCheck } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Features/UserSlice';

function Sidebar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const linkClasses = "flex items-center px-4 py-3";

  const handleLogout = () => {
    dispatch(logout());
  };
  
  return (
    <aside className="bg-emerald-800 text-white w-64 flex-shrink-0 relative">
      <div className="p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Quran MT</h1>
          <p className="text-sm text-emerald-200">Teacher Dashboard</p>
        </div>
        {/* Profile Icon and Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="p-2 rounded-full hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
          </button>
          
          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  <p className="font-medium">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500">{user?.phone || ''}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  role="menuitem"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <nav className="mt-8">
        <NavLink 
          to="/teacher" 
          className={({ isActive }) => 
            `${linkClasses} ${isActive ? 'bg-emerald-900' : 'hover:bg-emerald-900'}`
          }
        >
          <RiDashboardLine className="w-5 h-5 mr-3" />
          Dashboard
        </NavLink>

        <NavLink 
          to="/attendance" 
          className={({ isActive }) => 
            `${linkClasses} ${isActive ? 'bg-emerald-900' : 'hover:bg-emerald-900'}`
          }
        >
          <BsCalendarCheck className="w-5 h-5 mr-3" />
          Attendance
        </NavLink>

        <NavLink 
          to="/progress" 
          className={({ isActive }) => 
            `${linkClasses} ${isActive ? 'bg-emerald-900' : 'hover:bg-emerald-900'}`
          }
        >
          <TbProgress className="w-5 h-5 mr-3" />
          Progress Tracking
        </NavLink>

        <NavLink 
          to="/manageUsers" 
          className={({ isActive }) => 
            `${linkClasses} ${isActive ? 'bg-emerald-900' : 'hover:bg-emerald-900'}`
          }
        >
          <MdOutlinePersonOutline className="w-5 h-5 mr-3" />
          Users
        </NavLink>
        <NavLink 
          to="/manageStudents" 
          className={({ isActive }) => 
            `${linkClasses} ${isActive ? 'bg-emerald-900' : 'hover:bg-emerald-900'}`
          }
        >
          <MdOutlinePersonOutline className="w-5 h-5 mr-3" />
          Students
        </NavLink>

        <NavLink 
          to="/settings" 
          className={({ isActive }) => 
            `${linkClasses} ${isActive ? 'bg-emerald-900' : 'hover:bg-emerald-900'}`
          }
        >
          <IoSettingsOutline className="w-5 h-5 mr-3" />
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;