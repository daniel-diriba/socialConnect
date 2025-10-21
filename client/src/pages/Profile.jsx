import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/posts/PostCard";
import axios from "axios";

const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const userIdToFetch = userId || currentUser?.id;

  useEffect(() => {
    if (userIdToFetch) {
      fetchProfile();
    }
  }, [userIdToFetch]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`/users/profile/${userIdToFetch}`);
      setProfileUser(response.data.user);
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading profile...</div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">User not found</div>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === profileUser._id;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center space-x-8">
            <img
              src={
                profileUser.avatar ||
                `https://ui-avatars.com/api/?name=${profileUser.username}&background=random`
              }
              alt={profileUser.username}
              className="w-24 h-24 rounded-full border-4 border-white shadow"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {profileUser.username}
                </h1>
                {!isOwnProfile && (
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Follow
                  </button>
                )}
              </div>
              <div className="flex space-x-6 text-sm">
                <div className="text-center">
                  <div className="font-semibold">{posts.length}</div>
                  <div className="text-gray-600">Posts</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">
                    {profileUser.followers?.length || 0}
                  </div>
                  <div className="text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">
                    {profileUser.following?.length || 0}
                  </div>
                  <div className="text-gray-600">Following</div>
                </div>
              </div>
              {profileUser.bio && (
                <p className="mt-4 text-gray-700">{profileUser.bio}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
            <p className="text-gray-600">
              {isOwnProfile
                ? "Share your first post!"
                : "This user hasn't posted anything yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
