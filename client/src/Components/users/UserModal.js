import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../Features/UserSlice';
import { updateUser } from '../../Features/UserSlice';
import { userValidationSchema } from '../../Validation/userValidation';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const initialFormState = {
  name: '',
  pNumber: '',
  utype: 'teacher',
  isActive: true,
  password: ''
};

const UserModal = ({ isOpen, onClose, mode, user }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormState);

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(userValidationSchema),
    defaultValues: {
      ...initialFormState,
      mode
    }
  });

  
  useEffect(() => {

    if (!isOpen) {
      reset();
    }
    if (!isOpen || mode === 'add') {
      reset({
        ...initialFormState,
        mode
      });
      setFormData(initialFormState);
    }
    
    if (isOpen && mode === 'edit' && user) {
      const userData = {
        name: user.name || '',
        pNumber: user.PNumber || '',
        utype: user.utype || 'teacher',
        isActive: user.isActive,
        password: '',
        mode
      };
      Object.keys(userData).forEach(key => {
        setValue(key, userData[key]);
      });
      setFormData(userData);
    }
  }, [isOpen, mode, user, reset, setValue]);

  const onSubmit =  (data) => {
    if (mode === 'add') {
      console.log("new user",data)
       dispatch(registerUser(data));
    }else{
      console.log("Dispatching updateUser with data:", { userId: user._id, userData: data });
      dispatch(updateUser({userId: user._id,
        userData: data}))
       
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {mode === 'add' ? 'Add New User' : 'Edit User'}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                {...register("name", {
                  onChange: (e) => setFormData(prev => ({ ...prev, name: e.target.value }))
                })}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 
                  ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                {...register("pNumber", {
                  onChange: (e) => setFormData(prev => ({ ...prev, pNumber: e.target.value }))
                })}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 
                  ${errors.pNumber ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter phone number"
              />
              {errors.pNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.pNumber.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                User Type
              </label>
              <select
                {...register("utype", {
                  onChange: (e) => setFormData(prev => ({ ...prev, utype: e.target.value }))
                })}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 
                  ${errors.utype ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
                <option value="parent">Parent</option>
              </select>
              {errors.utype && (
                <p className="mt-1 text-sm text-red-600">{errors.utype.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                {...register("isActive", {
                  onChange: (e) => setFormData(prev => ({ ...prev, isActive: e.target.value === 'true' }))
                })}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 
                  ${errors.isActive ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
              {errors.isActive && (
                <p className="mt-1 text-sm text-red-600">{errors.isActive.message}</p>
              )}
            </div>

            { (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 
                    ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder={mode === 'edit' ? "Enter New password" : "Enter password"}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            )}

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
                {mode === 'add' ? 'Add User' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

UserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['add', 'edit']).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    PNumber: PropTypes.number,
    utype: PropTypes.string,
    isActive: PropTypes.bool
  })
};

export default UserModal; 