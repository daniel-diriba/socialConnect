import React from "react";
import { useAuth } from "../../context/AuthContext";
const Sidebar = () => {
  const { user } = useAuth();

  const stories = [
    { id: 1, username: "john_doe", avatar: "👨", hasNew: true },
    { id: 2, username: "sarah_m", avatar: "👩", hasNew: false },
    { id: 3, username: "mike_t", avatar: "🧔", hasNew: true },
    { id: 4, username: "emma_w", avatar: "👧", hasNew: false },
  ];

  const trends = [
    { tag: "#Programming", posts: "45.2K" },
    { tag: "#WebDevelopment", posts: "32.1K" },
    { tag: "#ReactJS", posts: "28.7K" },
    { tag: "#MongoDB", posts: "15.3K" },
  ];

  return (
    <div className="space-y-6">
      {/* User Profile Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <img
            src={
              user?.avatar ||
              `https://ui-avatars.com/api/?name=${user?.username}&background=0D8ABC&color=fff&size=128`
            }
            alt={user?.username}
            className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-white shadow-lg"
          />
          <h3 className="font-bold text-lg text-gray-900">{user?.username}</h3>
          <p className="text-gray-600 text-sm mb-4">
            {user?.bio || "Welcome to SocialConnect!"}
          </p>

          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <div className="text-center">
              <div className="font-bold text-gray-900">
                {user?.postsCount || 0}
              </div>
              <div>Posts</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900">
                {user?.followers?.length || 0}
              </div>
              <div>Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900">
                {user?.following?.length || 0}
              </div>
              <div>Following</div>
            </div>
          </div>

          <button className="w-full bg-blue-50 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-100 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stories */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          <span className="text-purple-500 mr-2">📱</span>
          Stories
        </h3>
        <div className="space-y-3">
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div
                className={`relative ${
                  story.hasNew
                    ? "ring-2 ring-purple-500"
                    : "ring-2 ring-gray-300"
                } rounded-full p-0.5`}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-lg">
                  {story.avatar}
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {story.username}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          <span className="text-orange-500 mr-2">🔥</span>
          Trending Worldwide
        </h3>
        <div className="space-y-3">
          {trends.map((trend, index) => (
            <div
              key={index}
              className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="font-semibold text-gray-900">{trend.tag}</div>
              <div className="text-xs text-gray-500">{trend.posts} posts</div>
            </div>
          ))}
        </div>
        <button className="w-full text-blue-500 text-sm font-semibold mt-3 py-2 hover:bg-blue-50 rounded-lg transition-colors">
          Show more
        </button>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Quick Access</h3>
        <div className="space-y-2">
          <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 text-gray-700 flex items-center space-x-3 transition-colors">
            <span className="text-green-500">👥</span>
            <span>Find Friends</span>
          </button>
          <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 text-gray-700 flex items-center space-x-3 transition-colors">
            <span className="text-yellow-500">⭐</span>
            <span>Favorites</span>
          </button>
          <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 text-gray-700 flex items-center space-x-3 transition-colors">
            <span className="text-red-500">📸</span>
            <span>Memories</span>
          </button>
          <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 text-gray-700 flex items-center space-x-3 transition-colors">
            <span className="text-purple-500">⚙️</span>
            <span>Settings & Privacy</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
