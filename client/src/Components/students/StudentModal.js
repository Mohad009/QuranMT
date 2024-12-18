import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, updateStudent } from '../../Features/studentSlice';

const initialFormState = {
  firstName: '',
  lastName: '',
  teacherId: '',
  parentNumber: ''
};

const StudentModal = ({ isOpen, onClose, mode, student }) => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.users);
  const teachers = users.filter(user => user.utype === 'teacher' && user.isActive);
  
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (!isOpen || mode === 'add') {
      setFormData(initialFormState);
    }
    
    if (isOpen && mode === 'edit' && student) {
      setFormData({
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        teacherId: student.teacherId?._id || '',
        parentNumber: student.parentNumber || ''
      });
    }
  }, [isOpen, mode, student]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'add') {
       dispatch(addStudent(formData));
    } else if (mode === 'edit' && student?._id) {
       dispatch(updateStudent({ 
        id: student._id, 
        studentData: formData 
      }));
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {mode === 'add' ? 'Add New Student' : 'Edit Student'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assign Teacher
              </label>
              <select
                name="teacherId"
                value={formData.teacherId}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                required
              >
                <option value="">Select Teacher</option>
                {teachers.map(teacher => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Parent Phone Number
              </label>
              <input
                type="tel"
                name="parentNumber"
                value={formData.parentNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                {mode === 'add' ? 'Add Student' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

StudentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['add', 'edit']).isRequired,
  student: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    teacherId: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string
    }),
    parentNumber: PropTypes.string
  })
};

export default StudentModal; 