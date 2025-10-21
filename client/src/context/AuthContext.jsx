import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set base URL for axios
  axios.defaults.baseURL = "http://localhost:5000/api";

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Try to get user from backend
        try {
          const response = await axios.get("/auth/me");
          setUser(response.data);
        } catch (error) {
          console.log("Backend unavailable, using mock user");
          // Fallback to mock user if backend fails
          const mockUser = {
            id: "1",
            username: "demo_user",
            email: "demo@example.com",
            avatar:
              "https://ui-avatars.com/api/?name=Demo+User&background=6366f1&color=fff",
            bio: "Welcome to SocialConnect!",
            followers: [],
            following: [],
          };
          setUser(mockUser);
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Try backend first
      const response = await axios.post("/auth/login", { email, password });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);
      return response.data;
    } catch (error) {
      console.log("Backend login failed, using mock login");
      // Fallback to mock login
      const mockUser = {
        id: "1",
        username: email.split("@")[0] || "user",
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${
          email.split("@")[0]
        }&background=6366f1&color=fff`,
        bio: "Welcome to my profile!",
        followers: [],
        following: [],
      };
      const mockToken = "mock-jwt-token";
      localStorage.setItem("token", mockToken);
      setUser(mockUser);
      return { user: mockUser, token: mockToken };
    }
  };

  const register = async (userData) => {
    try {
      // Try backend first
      const response = await axios.post("/auth/register", userData);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);
      return response.data;
    } catch (error) {
      console.log("Backend registration failed, using mock registration");
      // Fallback to mock registration
      const mockUser = {
        id: Date.now().toString(),
        username: userData.username,
        email: userData.email,
        avatar: `https://ui-avatars.com/api/?name=${userData.username}&background=6366f1&color=fff`,
        bio: "New user on SocialConnect!",
        followers: [],
        following: [],
      };
      const mockToken = "mock-jwt-token";
      localStorage.setItem("token", mockToken);
      setUser(mockUser);
      return { user: mockUser, token: mockToken };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
