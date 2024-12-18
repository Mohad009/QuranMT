import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '../../Features/studentSlice';
import SearchAndFilter from './SearchAndFilter';
import StudentsTable from './StudentsTable';
import StudentModal from './StudentModal';

const ManageStudents = () => {
  const dispatch = useDispatch();
  const { loading, error, students, isSuccess } = useSelector(state => state.students);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [filters, setFilters] = useState({
    search: '',
    teacherId: ''
  });

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    if (students) {
      let filtered = [...students];
      
      if (filters.search) {
        filtered = filtered.filter(student => 
          student.firstName?.toLowerCase().includes(filters.search.toLowerCase()) ||
          student.lastName?.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      if (filters.teacherId) {
        filtered = filtered.filter(student => student.teacherId === filters.teacherId);
      }
      
      setFilteredStudents(filtered);
    }
  }, [students, filters]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchStudents());
      setIsModalOpen(false);
    }
  }, [isSuccess, dispatch]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleAddStudent = () => {
    setModalMode('add');
    setSelectedStudent(null);
    setIsModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setModalMode('edit');
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="h-full overflow-y-auto">
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Manage Students</h2>
          <button
            onClick={handleAddStudent}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Add New Student
          </button>
        </div>
      </header>

      <div className="p-6">
        <SearchAndFilter onFilterChange={handleFilterChange} filters={filters} />
        <StudentsTable students={filteredStudents} onEditStudent={handleEditStudent} />
      </div>

      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        student={selectedStudent}
      />
    </div>
  );
};

export default ManageStudents; 