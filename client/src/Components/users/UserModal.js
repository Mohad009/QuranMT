import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserModal = ({ isOpen, onClose, mode, user }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    userType: 'teacher',
    password: ''
  });

  useEffect(() => {
    if (user && mode === 'edit') {
      setFormData({
        fullName: user.name,
        phoneNumber: user.phoneNumber || '',
        userType: user.type || 'teacher',
        password: ''
      });
    }
  }, [user, mode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        {/* Modal content remains the same */}
      </div>
    </div>
  );
};

UserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['add', 'edit']).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    type: PropTypes.string
  })
};

export default UserModal; 