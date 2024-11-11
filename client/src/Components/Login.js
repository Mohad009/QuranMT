import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [role, setRole] = useState('teacher');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
    switch (role) {
      case 'teacher':
        navigate('/teacher');
        break;
      case 'parent':
        navigate('/parent');
        break;
      case 'admin':
        navigate('/admin');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-100 min-h-screen">
      <div className="container mx-auto px-4 h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-600">Quran LMS</h1>
            <p className="text-gray-600 mt-2">Welcome back! Please login to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="flex space-x-4 mb-6">
              {['teacher', 'parent'].map((roleOption) => (
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
                Username
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>

            <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input type="password" 
                           class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                           required/>
                </div>
                <div class="text-right">
                    <a href="#" class="text-sm text-emerald-600 hover:text-emerald-700">Forgot password?</a>
                </div>


            <button
              type="submit"
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