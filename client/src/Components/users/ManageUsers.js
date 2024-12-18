import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../Features/UserSlice';
import SearchAndFilter from './SearchAndFilter';
import UsersTable from './UsersTable';
import Pagination from './Pagination';
import UserModal from './UserModal';

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector(state => state.users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    userType: '',
    status: ''
  });

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      let filtered = [...users];
      
      if (filters.search) {
        filtered = filtered.filter(user => 
          user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          user.PNumber.includes(filters.search)
        );
      }
      
      if (filters.userType) {
        filtered = filtered.filter(user => user.utype === filters.userType);
      }
      
      if (filters.status) {
        filtered = filtered.filter(user => 
          filters.status === 'active' ? user.isActive : !user.isActive
        );
      }
      
      setFilteredUsers(filtered);
    }
  }, [users, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleAddUser = () => {
    setModalMode('add');
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setModalMode('edit');
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="h-full overflow-y-auto">
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Manage Users</h2>
          <button
            onClick={handleAddUser}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Add New User
          </button>
        </div>
      </header>

      <div className="p-6">
        <SearchAndFilter onFilterChange={handleFilterChange} filters={filters} />
        <UsersTable users={filteredUsers} onEditUser={handleEditUser} />
        <Pagination />
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        user={selectedUser}
      />
    </div>
  );
};

export default ManageUsers; 