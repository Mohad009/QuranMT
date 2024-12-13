import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAttendance, fetchStudents } from "../Features/studentSlice";
function TeacherDashboard() {
  const {user}=useSelector((state)=>state.users)
  
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(fetchStudents(user._id))
    dispatch(fetchAttendance(user._id))
  },[dispatch,user._id])

  const {countStudents,countStudentsAttendace}=useSelector((state)=>state.students)

  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-y-auto">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
  <div className="flex items-center justify-between px-6 py-4">
    <h2 className="text-xl font-semibold text-gray-800">Dashboard Overview</h2>
  </div>
</header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatsCard 
              icon="students"
              title="Total Students"
              value={countStudents}
              bgColor="emerald"
            />
            <StatsCard 
              icon="attendance"
              title="Today's Attendance"
              value={countStudentsAttendace}
              bgColor="blue"
            />
            <StatsCard 
              icon="progress"
              title="Average Progress"
              value="85%"
              bgColor="purple"
            />
          </div>

          {/* Students Table */}
          <StudentsTable />
        </div>
      </main>
    </div>
  );
}

// Helper Components
function StatsCard({ icon, title, value, bgColor }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 bg-${bgColor}-100 rounded-full`}>
          {/* Add icon SVG based on prop */}
        </div>
        <div className="ml-4">
          <h3 className="text-gray-500 text-sm">{title}</h3>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
}

function StudentsTable() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Recent Students</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            {/* Table headers */}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Table rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeacherDashboard;
