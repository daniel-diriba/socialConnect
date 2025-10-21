import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="bg-white shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">SC</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              SocialConnect
            </span>
          </Link>

          {/* Search Bar */}
          {user && (
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search people, posts, and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-100 border-0 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  🔍
                </button>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          {user ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center">
                  <span className="text-xl">🏠</span>
                  <span className="text-xs mt-1">Home</span>
                </div>
              </Link>

              <Link
                to="/explore"
                className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center">
                  <span className="text-xl">🔍</span>
                  <span className="text-xs mt-1">Explore</span>
                </div>
              </Link>

              <button className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <div className="flex flex-col items-center">
                  <span className="text-xl">🔔</span>
                  <span className="text-xs mt-1">Alerts</span>
                </div>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>

              <Link
                to="/messages"
                className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center">
                  <span className="text-xl">💬</span>
                  <span className="text-xs mt-1">Messages</span>
                </div>
              </Link>

              {/* User Menu */}
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <img
                    src={
                      user.avatar ||
                      `https://ui-avatars.com/api/?name=${user.username}&background=0D8ABC&color=fff`
                    }
                    alt={user.username}
                    className="w-8 h-8 rounded-full border-2 border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700 hidden md:block">
                    {user.username}
                  </span>
                  <span className="text-gray-500">▼</span>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b"
                  >
                    👤 My Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b"
                  >
                    ⚙️ Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-50"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
