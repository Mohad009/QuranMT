import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../Features/UserSlice';
import { fetchStudents } from '../Features/studentSlice';
import moment from 'moment';

function AdminDashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-y-auto">
        <Header />
        <div className="p-6">
          <StatisticsCards />
          <RecentActivity />
        </div>
      </main>
    </div>
  );
}

function Header() {
  const {user}=useSelector((state)=>state.users)
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">Welcome, {user.name} </h2>
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
  const { users } = useSelector(state => state.users);
  const { students } = useSelector(state => state.students);

  const stats = [
    { 
      title: 'Total Users', 
      count: users.length, 
      color: 'emerald' 
    },
    { 
      title: 'Students', 
      count: students.length, 
      color: 'blue' 
    },
    { 
      title: 'Teachers', 
      count: users.filter(user => user.utype === 'teacher').length, 
      color: 'purple' 
    },
    { 
      title: 'Parents', 
      count: users.filter(user => user.utype === 'parent').length, 
      color: 'yellow' 
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

function RecentActivity() {
  const { users } = useSelector(state => state.users);
  const { students } = useSelector(state => state.students);

  // Get the 5 most recent users and students
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const recentStudents = [...students]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // Combine and sort both arrays
  const activities = [
    ...recentUsers.map(user => ({
      id: user._id,
      color: user.utype === 'teacher' ? 'purple' : user.utype === 'parent' ? 'yellow' : 'emerald',
      message: `New ${user.utype} account created for ${user.name}`,
      time: user.createdAt,
      type: 'user'
    })),
    ...recentStudents.map(student => ({
      id: student._id,
      color: 'blue',
      message: `New student ${student.firstName} ${student.lastName} added`,
      time: student.createdAt,
      type: 'student'
    }))
  ]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 5)
    .map(activity => ({
      ...activity,
      timeFormatted: moment(activity.time).fromNow(),
      fullDate: moment(activity.time).format('MMMM Do YYYY, h:mm a')
    }));

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
              <div className="ml-auto text-right">
                <span className="text-xs text-gray-400">{activity.timeFormatted}</span>
                <span className="block text-xs text-gray-400">{activity.fullDate}</span>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <p className="text-center text-gray-500">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; 