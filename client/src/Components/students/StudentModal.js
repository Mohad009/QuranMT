import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, updateStudent } from '../../Features/studentSlice';
import { studentValidationSchema } from '../../Validation/studentValidation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const StudentModal = ({ isOpen, onClose, mode, student }) => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.users);
  const teachers = users.filter(user => user.utype === 'teacher' && user.isActive);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(studentValidationSchema),
  });

  useEffect(() => {
  

    if (isOpen && mode === 'add') {
      reset({
        firstName: '',
        lastName: '',
        teacherId: '',
        parentNumber: ''
      });
    }
    
    if (isOpen && mode === 'edit' && student) {
      setValue('firstName', student.firstName || '');
      setValue('lastName', student.lastName || '');
      setValue('teacherId', student.teacherId?._id || '');
      setValue('parentNumber', student.parentNumber || '');
    }

  }, [isOpen, mode, student, reset, setValue]);

  const onSubmit = (data) => {
    if (mode === 'add') {
      dispatch(addStudent(data));
    } else if (mode === 'edit' && student?._id) {
      dispatch(updateStudent({
        id: student._id,
        studentData: data
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
              id='firstName'
                type="text"
                {...register('firstName')}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
              id='lastName'
                type="text"
                {...register('lastName')}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="teacherId" className="block text-sm font-medium text-gray-700">Assign Teacher</label>
              <select
              id='teacherId'
                {...register('teacherId')}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.teacherId ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500`}
              >
                <option value="">Select Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
              {errors.teacherId && (
                <p className="text-red-500 text-xs mt-1">{errors.teacherId.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="parentNumber" className="block text-sm font-medium text-gray-700">Parent Phone Number</label>
              <input
              id='parentNumber'
                type="tel"
                {...register('parentNumber')}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.parentNumber ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500`}
              />
              {errors.parentNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.parentNumber.message}</p>
              )}
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
