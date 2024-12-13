import React, { useState ,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchStudents } from "../Features/studentSlice";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { recordAttendance } from '../Features/studentSlice';

const AttendancePage = () => {
  const dispatch=useDispatch()
  const {user}=useSelector((state)=>state.users)
  const {students,countStudents,msg,currentAttendance,error}=useSelector((state)=>state.students)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendance,setAttendance]=useState({})


  useEffect(()=>{
    dispatch(fetchStudents(user._id))
  },[dispatch])

  const handleAttendanceChange = (studentId) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: {
        studentId: studentId,
        status: prev[studentId]?.status === 'Present' ? 'Absent' : 'Present'
      }
    }));
  };

  const handleSubmitAttendance = () => {

    const records = students?.map(student => ({
      studentId: student._id,
      // If the student exists in state, use that status, otherwise 'Absent'
      status: attendance[student._id]?.status || 'Absent'
    }));
    const attendanceData = {
      date: selectedDate,
      teacherId: user._id,
      records: Object.values(records)
    };

    try {
   dispatch(recordAttendance(attendanceData)) // Debug log
      alert('Attendance recorded successfully');
      setAttendance({}); // Reset form after successful submission
    } catch (err) {
      console.error('Failed to record attendance:', err);
      alert('Failed to record attendance: ' + err.message);
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Attendance Management</h2>
        </div>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Calendar 
              selectedDate={selectedDate} 
              onDateSelect={setSelectedDate} 
            />
            <QuickActions 
            submit={handleSubmitAttendance} 
            setStudentAttendance={setAttendance}
            students={students}
            
            />
          </div>
          <div className="lg:col-span-2">

    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Student Attendance - {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              Present: <span>{Object.values(attendance).filter(record => record.status === 'Present').length}</span>/{countStudents}
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Present
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map(student => (
              <tr key={student.parentNumber}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img 
                       src={`https://ui-avatars.com/api/?name=${encodeURIComponent(`${student.firstName} ${student.lastName}`)}`} 
                      alt={student.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{student.firstName} {student.lastName}</div>
                      <div className="text-sm text-gray-500">Phone: {student.parentNumber}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <input 
                    type="checkbox"
                    checked={attendance[student._id]?.status === 'Present'}
                    onChange={() => handleAttendanceChange(student._id)}
                    className="attendance-checkbox w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
 
  </div>
</div>
</div>
</div>
  );
};

export default AttendancePage;

const Calendar = ({ onDateSelect, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Get days of current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get the day of week for the first day (0-6)
  const startDay = monthStart.getDay();

  // Previous and next month handlers
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Calculate padding days for the start of the month
  const paddingDays = Array(startDay).fill(null);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex space-x-2">
          <button 
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button 
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {/* Padding days */}
        {paddingDays.map((_, index) => (
          <div key={`padding-${index}`} className="calendar-day disabled text-center py-2 rounded-lg text-gray-400">
            {/* Empty padding day */}
          </div>
        ))}

        {/* Actual days */}
        {daysInMonth.map((day) => (
          <div 
            key={day.toISOString()}
            onClick={() => onDateSelect(day)}
            className={`calendar-day text-center py-2 rounded-lg cursor-pointer
              ${isSameDay(day, selectedDate) ? 'bg-emerald-600 text-white' : 'hover:bg-gray-100'}
              ${isSameDay(day, new Date()) ? 'border-2 border-emerald-500' : ''}
            `}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
};

const QuickActions = ({submit,setStudentAttendance,students}) => {
  const handleMarkAllPresent = () => {
    const allPresent = {};
    students.forEach(student => {
      allPresent[student._id] = {
        studentId: student._id,
        status: 'Present'
      };
    });
    setStudentAttendance(allPresent);
  };
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
      <div className="space-y-4">
        <button 
          className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
          onClick={handleMarkAllPresent}
        >
          Mark All Present
        </button>
        <button 
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={submit}
        >
          Submit Attendance
        </button>
      </div>
    </div>
  );
};
