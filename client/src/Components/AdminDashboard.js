import { useState } from 'react';
import Sidebar from './SideBar';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('teachers');

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Header />
        <div className="p-6">
          <StatisticsCards />
          <UserManagement activeTab={activeTab} setActiveTab={setActiveTab} />
          <RecentActivity />
        </div>
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
          Add New User
        </button>
      </div>
    </header>
  );
}

function StatCard({ icon, title, count, color }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{count}</p>
        </div>
      </div>
    </div>
  );
}

function StatisticsCards() {
  const stats = [
    { title: 'Total Users', count: 156, color: 'emerald' },
    { title: 'Students', count: 120, color: 'blue' },
    { title: 'Teachers', count: 12, color: 'purple' },
    { title: 'Parents', count: 24, color: 'yellow' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

function UserManagement({ activeTab, setActiveTab }) {
  const tabs = ['teachers', 'students', 'parents'];

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 border-b-2 ${
                activeTab === tab
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } font-medium`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>
      <UserTable />
    </div>
  );
}

function UserTable() {
  const users = [
    {
      id: 'T001',
      name: 'Muhammad Ali',
      email: 'mali@example.com',
      status: 'Active',
      students: '15 Students',
    },
    // Add more users as needed
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Students
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UserRow({ user }) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full"
            src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}`}
            alt=""
          />
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">ID: {user.id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{user.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {user.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.students}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-emerald-600 hover:text-emerald-900 mr-3">Edit</button>
        <button className="text-red-600 hover:text-red-900">Delete</button>
      </td>
    </tr>
  );
}

function RecentActivity() {
  const activities = [
    {
      id: 1,
      color: 'emerald',
      message: 'New teacher account created for Sarah Ahmed',
      time: '2 hours ago',
    },
    {
      id: 2,
      color: 'blue',
      message: 'Student Ahmed Ali assigned to teacher Muhammad Ali',
      time: '5 hours ago',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center">
              <div className={`w-2 h-2 bg-${activity.color}-500 rounded-full`}></div>
              <p className="ml-4 text-sm text-gray-600">{activity.message}</p>
              <span className="ml-auto text-xs text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; 