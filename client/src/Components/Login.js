import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Features/UserSlice';
import { Navigate } from 'react-router-dom';
import { loginValidationSchema } from '../Validation/loginValidation';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function Login() {
  const dispatch = useDispatch();
  const { msg, isLogin, user } = useSelector(state => state.users);

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(loginValidationSchema)
  });

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

  const onSubmit = (data) => {
    dispatch(login({ pNumber: data.pNumber, password: data.password }));
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-100 min-h-screen">
      <div className="container mx-auto px-4 h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-600">Quran Memorize Tracker</h1>
            <p className="text-gray-600 mt-2">Welcome back! Please login to continue.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                {...register("pNumber")}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.pNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your phone number"
              />
              {errors.pNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.pNumber.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input 
                type="password"
                {...register("password")}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {msg && (
              <div className="text-center">
                <p className={`text-sm ${msg.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
                  {msg}
                </p>
              </div>
            )}

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