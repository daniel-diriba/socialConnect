import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const UserCard = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { user: currentUser } = useAuth();

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await axios.post(`/users/unfollow/${user._id}`);
      } else {
        await axios.post(`/users/follow/${user._id}`);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const isOwnProfile = currentUser?.id === user._id;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center space-x-4">
        <img
          src={
            user.avatar ||
            `https://ui-avatars.com/api/?name=${user.username}&background=random`
          }
          alt={user.username}
          className="w-16 h-16 rounded-full"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">
            {user.username}
          </h3>
          <p className="text-gray-600 text-sm">{user.bio || "No bio yet"}</p>
          <div className="flex space-x-4 mt-2 text-sm text-gray-500">
            <span>{user.followers?.length || 0} followers</span>
            <span>{user.following?.length || 0} following</span>
          </div>
        </div>
        {!isOwnProfile && (
          <button
            onClick={handleFollow}
            className={`px-4 py-2 rounded-lg font-semibold ${
              isFollowing
                ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
