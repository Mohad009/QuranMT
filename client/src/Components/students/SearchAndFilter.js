import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const SearchAndFilter = ({ onFilterChange, filters }) => {
  const { users } = useSelector(state => state.users);
  const teachers = users.filter(user => user.utype === 'teacher' && user.isActive);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  const handleReset = () => {
    onFilterChange({
      search: '',
      teacherId: ''
    });
  };

  return (
    <div className="bg-white rounded-lg shadow mb-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search students..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <select
            name="teacherId"
            value={filters.teacherId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">All Teachers</option>
            {teachers.map(teacher => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
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
    teacherId: PropTypes.string.isRequired
  }).isRequired
};

export default SearchAndFilter; 