import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import surat from '../quranSurahData';
function ParentDashboard() {
  const { user } = useSelector(state => state.users);
  const { students } = useSelector(state => state.students);
  const [parentStudents, setParentStudents] = useState([]);

  useEffect(() => {
    // Filter students based on parent's phone number
    const filteredStudents = students.filter(
      student =>  parseInt(student.parentNumber) === parseInt(user.PNumber)
    );
    setParentStudents(filteredStudents);
  }, [students, user.PNumber]);

  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Welcome, {user.name}</h2>
          </div>
        </header>

        <div className="p-6">
          {parentStudents.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              No students found linked to your phone number.
            </div>
          ) : (
            parentStudents.map(student => (
              <StudentSection key={student._id} student={student} surat={surat}/>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

function StudentSection({ student,surat }) {
  return (
    <div className="mb-8">
      {/* Student Overview Card */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl font-semibold">
            {student.firstName[0]}{student.lastName[0]}
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {student.firstName} {student.lastName}
            </h3>
            <p className="text-gray-500">Teacher: {student.teacherId?.name || 'Not Assigned'}</p>
          </div>
        </div>
      </div>

      {/* Hifz History Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h4 className="text-lg font-semibold text-gray-800">Hifz History</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Surah
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mark
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {student.hifz && student.hifz.length > 0 ? (
                student.hifz.map((record, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {moment(record.date).format('MMMM Do YYYY')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {surat.find((s) => s.surah === record.chapter)?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.ayahRange}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.mark}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {record.notes || '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No Hifz records available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ParentDashboard; 