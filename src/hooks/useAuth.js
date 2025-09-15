import { useState, useEffect, useCallback } from "react";
import { localstoragekey } from "../utils/constants";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(localstoragekey.USER);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Error loading user from storage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save user to localstorage when user changes
  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem(localstoragekey.USER, JSON.stringify(user));
      } catch (error) {
        console.error("Error saving user to storage:", error);
      }
    } else {
      localStorage.removeItem(localstoragekey.USER);
    }
  }, [user]);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const userData = {
        id: Date.now(),
        name: credentials.name || "User",
        email: credentials.email,
        avatar:
          credentials.avatar ||
          `https://ui-avatars.com/api/?name=${credentials.name}&background=0D8ABC&color=fff`,
        loginTime: new Date().toISOString(),
      };

      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    localStorage.removeItem(localstoragekey.USER);
    localStorage.removeItem(localstoragekey.DATA);
  }, []);

  const updateUser = useCallback((updates) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updates,
    }));
  }, []);

  const isAuthenticated = Boolean(user);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    updateUser,
    setError,
  };
};
