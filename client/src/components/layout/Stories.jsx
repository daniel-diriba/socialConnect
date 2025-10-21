import React from "react";
import { useAuth } from "../../context/AuthContext";

const Stories = () => {
  const { user } = useAuth();

  const stories = [
    {
      id: 1,
      username: "Your Story",
      avatar: user?.avatar,
      isUser: true,
      hasNew: false,
    },
    { id: 2, username: "tech_talks", avatar: "💻", hasNew: true },
    { id: 3, username: "design_daily", avatar: "🎨", hasNew: true },
    { id: 4, username: "code_master", avatar: "⚡", hasNew: false },
    { id: 5, username: "startup_life", avatar: "🚀", hasNew: true },
    { id: 6, username: "remote_work", avatar: "🏠", hasNew: false },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center space-y-2 flex-shrink-0"
          >
            <div
              className={`relative ${
                story.hasNew
                  ? "bg-gradient-to-r from-purple-400 to-pink-500"
                  : "bg-gray-300"
              } rounded-full p-0.5`}
            >
              <div className="bg-white p-0.5 rounded-full">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl ${
                    story.isUser
                      ? "bg-gradient-to-r from-blue-500 to-purple-600"
                      : "bg-gray-400"
                  }`}
                >
                  {story.isUser ? (
                    <img
                      src={
                        story.avatar ||
                        `https://ui-avatars.com/api/?name=${user?.username}&background=0D8ABC&color=fff`
                      }
                      alt={story.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    story.avatar
                  )}
                </div>
              </div>
              {story.isUser && (
                <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-2 border-white">
                  <span className="text-white text-xs">+</span>
                </div>
              )}
            </div>
            <span className="text-xs text-gray-600 font-medium max-w-16 truncate">
              {story.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
