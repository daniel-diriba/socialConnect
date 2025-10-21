import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/posts/PostCard";
import axios from "axios"; // Or from axiosConfig.js

const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added

  const userIdToFetch = userId || currentUser?._id; // Use _id

  useEffect(() => {
    if (userIdToFetch) {
      fetchProfile();
    }
  }, [userIdToFetch]);

  const fetchProfile = async () => {
    try {
      setError(null);
      const response = await axios.get(`/api/users/profile/${userIdToFetch}`);
      setProfileUser(response.data.user);
      setPosts(response.data.posts || []);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  if (error || !profileUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        {error || "User not found"}
      </div>
    );
  }

  // Rest unchanged...
};

export default Profile;
