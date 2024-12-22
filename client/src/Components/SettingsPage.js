import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileValidationSchema, passwordValidationSchema } from '../Validation/settingsValidation';
import { updateProfile, updatePassword } from '../Features/UserSlice';
import Location from './Location';
const SettingsPage = () => {
  const { user } = useSelector(state => state.users);

  return (
    <div className="h-full overflow-y-auto">
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Account Settings</h2>
        </div>
      </header>

      <div className="p-6">
        <ProfileSettings userInfo={user} />
        <PasswordSettings userInfo={user}/>
      </div>
    </div>
  );
};

const ProfileSettings = ({ userInfo }) => {
  const dispatch = useDispatch();
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(profileValidationSchema),
    defaultValues: {
      fullName: userInfo.name,
      phoneNumber: userInfo.PNumber
    }
  });

  const onSubmit = (data) => {
    dispatch(updateProfile({
      userId: userInfo._id,
      userData: data
    }))
      .unwrap()
      .then(() => {
        alert('Profile updated successfully');
      })
      .catch((error) => {
        alert('Failed to update profile: ' + error.message);
      });
  };

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Profile Information</h3>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                {...register("fullName")}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 
                  ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                {...register("phoneNumber")}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 
                  ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
      <Location />
    </div>
  );
};

const PasswordSettings = ({userInfo}) => {
  const dispatch = useDispatch();
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(passwordValidationSchema)
  });

  const onSubmit = (data) => {
    dispatch(updatePassword({
      userId: userInfo._id,
      newPassword: data.newPassword
    }))
      .unwrap()
      .then(() => {
        alert("Password updated successfully")
        reset();
      })
      .catch((error) => {
        console.error('Failed to update password:', error);
      });
  };

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Change Password</h3>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                {...register("newPassword")}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 
                  ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                {...register("confirmPassword")}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 
                  ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;

