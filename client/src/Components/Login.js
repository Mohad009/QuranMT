import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Features/UserSlice';
import { Navigate } from 'react-router-dom';

function Login() {
  const [role, setRole] = useState('teacher');
  const [pNumber, setPNumber] = useState(0);
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  
  const userTypes = ['teacher', 'parent'];
  const { msg, isLogin, user } = useSelector(state => state.users);

  // If already logged in, redirect to appropriate dashboard
  if (isLogin && user) {
    switch (user.utype) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'teacher':
        return <Navigate to="/teacher" replace />;
      case 'parent':
        return <Navigate to="/parent-dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
     dispatch(login({ pNumber, password }));
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-100 min-h-screen">
      <div className="container mx-auto px-4 h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-600">Quran Memorize Tracker</h1>
            <p className="text-gray-600 mt-2">Welcome back! Please login to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="flex space-x-4 mb-6">
              {userTypes.map((roleOption) => (
                <label key={roleOption} className="flex-1">
                  <input
                    type="radio"
                    name="role"
                    value={roleOption}
                    checked={role === roleOption}
                    onChange={(e) => setRole(e.target.value)}
                    className="peer hidden"
                  />
                  <div className="text-center p-4 border rounded-lg peer-checked:border-emerald-500 peer-checked:bg-emerald-50 cursor-pointer">
                    {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                  </div>
                </label>
              ))}
            </div>

            {/* Form fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
                onChange={(e) => setPNumber(e.target.value)}
              />
            </div>

            <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input type="password" 
                           className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                           onChange={(e) => setPassword(e.target.value)}
                           required/>
                           
                </div>
                <div className="text-right">
                    {/* <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700">Forgot password?</a> */}
                    {msg}
                </div>


            <button
              className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;