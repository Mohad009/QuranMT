import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="bg-emerald-800 text-white w-64 flex-shrink-0">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Quran MT</h1>
        <p className="text-sm text-emerald-200">Teacher Dashboard</p>
      </div>
      
      <nav className="mt-8">
        <Link to="/dashboard" className="flex items-center px-4 py-3 bg-emerald-900">
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          Dashboard
        </Link>
        {/* Add other navigation links similarly */}
      </nav>
    </aside>
  );
}

export default Sidebar;