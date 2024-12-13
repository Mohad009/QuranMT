import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { isLogin, loading } = useSelector((state) => state.users);

  // Optional: Add a loading spinner
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!isLogin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 