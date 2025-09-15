import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import googlelogo from "../../assets/images/googlelogo.png";

const GoogleLoginButton = ({ isregisterMode = false, loading = false }) => {
  const { handlegoogleLoginSuccess, handlegoogleLoginError } = useAuth();
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const success = await handlegoogleLoginSuccess(tokenResponse);
      if (success) {
        navigate("/fileupload");
      }
    },
    onError: (error) => {
      handlegoogleLoginError(error);
    },
  });

  const handleClick = () => {
    if (!loading) {
      googleLogin();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-center space-x-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
    >
      <img src={googlelogo} alt="Google" className="w-5 h-5" />
      <span className="text-gray-700 font-medium">
        {isregisterMode ? "Sign up with Google" : "Sign in with Google"}
      </span>
    </button>
  );
};

export default GoogleLoginButton;
