import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios"; // Or from axiosConfig.js

const UserCard = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { user: currentUser } = useAuth();

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await axios.post(`/api/users/unfollow/${user._id}`);
      } else {
        await axios.post(`/api/users/follow/${user._id}`);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  // Rest unchanged...
};

export default UserCard;
