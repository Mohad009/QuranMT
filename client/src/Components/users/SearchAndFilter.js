import React from 'react';
import PropTypes from 'prop-types';

const SearchAndFilter = ({ onFilterChange, filters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  const handleReset = () => {
    onFilterChange({
      search: '',
      userType: '',
      status: ''
    });
  };

  return (
    <div className="bg-white rounded-lg shadow mb-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search users..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <select
            name="userType"
            value={filters.userType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">All User Types</option>
            <option value="teacher">Teachers</option>
            <option value="admin">Admins</option>
            <option value="parent">Parents</option>
          </select>
        </div>
        <div>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <button
            onClick={handleReset}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

SearchAndFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    search: PropTypes.string.isRequired,
    userType: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  }).isRequired
};

export default SearchAndFilter; 