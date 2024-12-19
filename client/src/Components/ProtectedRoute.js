import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isLogin, loading, user } = useSelector((state) => state.users);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // If not logged in, redirect to login page
  if (!isLogin) {
    return <Navigate to="/" replace />;
  }

  // Check if user's role is allowed to access this route
  if (allowedRoles && !allowedRoles.includes(user?.utype)) {
    return (
      <div className="h-screen flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-600">You don't have permission to access this resource.</p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute; 