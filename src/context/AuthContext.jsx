import React, { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const handlegoogleLoginSuccess = async (tokenResponse) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch user info");

      const userInfo = await response.json();

      const googleUser = {
        uid: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        avatar: userInfo.picture,
        emailVerified: userInfo.verified_email,
        accessToken: tokenResponse.access_token,
      };

      setUser(googleUser);
      toast.success("Google login successful ");
      return true;
    } catch (error) {
      setError("Google login failed: " + error.message);
      toast.error("Google login failed ");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login error
  const handlegoogleLoginError = (error) => {
    const errorMsg =
      "Google login failed: " + (error.error_description || "Unknown error");
    setError(errorMsg);
    toast.error("Google login failed");
    setLoading(false);
    return false;
  };

  // Email Registration
  const handleEmailregister = async (email, password, name) => {
    try {
      setError(null);
      setLoading(true);

      if (registeredUsers.find((u) => u.email === email)) {
        throw new Error("User already registered. Please login.");
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser = {
        uid: "email-user-" + Date.now(),
        name,
        email,
        password,
        avatar: `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff`,
        emailVerified: false,
      };

      setRegisteredUsers((prev) => [...prev, mockUser]);
      setUser(null);

      toast.success("Registration successful Please login.");
      return true;
    } catch (error) {
      setError("Registration failed: " + error.message);
      toast.error("Registration failed ");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handlemailLogin = async (email, password) => {
    try {
      setError(null);
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const existingUser = registeredUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!existingUser) {
        throw new Error("Invalid email or password");
      }

      setUser(existingUser);
      toast.success("Login successful");
      return true;
    } catch (error) {
      setError("Login failed: " + error.message);
      toast.error("Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    setUser(null);
    setError(null);

    if (user && user.accessToken) {
      fetch(`https://oauth2.googleapis.com/revoke?token=${user.accessToken}`, {
        method: "POST",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
      });
    }

    toast.info("Logged out successfully");
  };

  const clearError = () => setError(null);

  const value = {
    user,
    loading,
    error,
    handlegoogleLoginSuccess,
    handlegoogleLoginError,
    handleEmailregister,
    handlemailLogin,
    handleLogout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth used with AuthProvider");
  return context;
};
