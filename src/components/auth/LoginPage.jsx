import React, { useState } from "react";
import { BarChart3, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import GoogleLoginButton from "../auth/GoogleLoginButton";

const LoginPage = ({ isRegisterModedefault = false }) => {
  const { handlemailLogin, handleEmailregister, loading, error, clearError } =
    useAuth();

  const navigate = useNavigate();

  const [isregisterMode, setIsRegisterMode] = useState(isRegisterModedefault);
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) clearError();
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (isregisterMode) {
      if (!formData.name.trim()) {
        alert("Please enter your name");
        return;
      }
      const success = await handleEmailregister(
        formData.email,
        formData.password,
        formData.name
      );
      if (success) {
        setIsRegisterMode(false);
        setFormData({ name: "", email: "", password: "" });
      }
    } else {
      const success = await handlemailLogin(formData.email, formData.password);
      if (success) {
        navigate("/fileupload");
      }
    }
  };

  const toggleBtn = () => {
    setIsRegisterMode(!isregisterMode);
    setFormData({ name: "", email: "", password: "" });
    clearError();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isregisterMode ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-600">
            {isregisterMode
              ? "Sign up to get started with your dashboard"
              : "Sign in to access your dashboard"}
          </p>
        </div>

        {/* error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        {/* Sign Up form */}
        <form onSubmit={handleEmailSubmit} className="space-y-4 mb-6">
          {isregisterMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={isregisterMode}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength="6"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setshowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg px-4 py-3 disabled:opacity-50"
          >
            {loading ? (
              <LoadingSpinner size="sm" color="white" />
            ) : isregisterMode ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>
        {/* Google Sign in Btn*/}
        <GoogleLoginButton isregisterMode={isregisterMode} loading={loading} />
        <div className="text-center">
          <button
            type="button"
            onClick={toggleBtn}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {isregisterMode
              ? "Already have an account? Sign in"
              : "Need an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
