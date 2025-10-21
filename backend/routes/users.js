import express from "express";
import User from "../models/User.js";
import Post from "../models/Post.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get user profile
router.get("/profile/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select("-password")
      .populate("followers", "username avatar")
      .populate("following", "username avatar");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get user's posts
    const posts = await Post.find({ author: req.params.userId })
      .populate("author", "username avatar")
      .populate("comments.user", "username avatar")
      .sort({ createdAt: -1 });

    res.json({
      user,
      posts,
      postsCount: posts.length,
      followersCount: user.followers.length,
      followingCount: user.following.length,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    res.status(500).json({ message: "Server error while fetching profile" });
  }
});

// Follow user
router.post("/follow/:userId", auth, async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.userId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const userToFollow = await User.findById(req.params.userId);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already following
    if (currentUser.following.includes(userToFollow._id)) {
      return res.status(400).json({ message: "Already following this user" });
    }

    // Add to following and followers
    currentUser.following.push(userToFollow._id);
    userToFollow.followers.push(currentUser._id);

    await currentUser.save();
    await userToFollow.save();

    res.json({
      message: "User followed successfully",
      following: true,
    });
  } catch (error) {
    console.error("Follow error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    res.status(500).json({ message: "Server error while following user" });
  }
});

// Unfollow user
router.post("/unfollow/:userId", auth, async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.userId);
    const currentUser = await User.findById(req.user._id);

    if (!userToUnfollow) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if actually following
    if (!currentUser.following.includes(userToUnfollow._id)) {
      return res.status(400).json({ message: "Not following this user" });
    }

    // Remove from following and followers
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== userToUnfollow._id.toString()
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== currentUser._id.toString()
    );

    await currentUser.save();
    await userToUnfollow.save();

    res.json({
      message: "User unfollowed successfully",
      following: false,
    });
  } catch (error) {
    console.error("Unfollow error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    res.status(500).json({ message: "Server error while unfollowing user" });
  }
});

export default router;
