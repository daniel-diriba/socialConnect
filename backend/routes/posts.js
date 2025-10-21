import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create a post
router.post("/create", auth, async (req, res) => {
  try {
    const { content, images } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: "Post content is required" });
    }

    const post = new Post({
      content: content.trim(),
      images: images || [],
      author: req.user._id,
    });

    await post.save();

    const populatedPost = await Post.findById(post._id)
      .populate("author", "username avatar")
      .populate("comments.user", "username avatar");

    res.status(201).json(populatedPost);
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ message: "Server error while creating post" });
  }
});

// Get feed posts
router.get("/feed", auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const followingIds = [...currentUser.following, req.user._id];

    const posts = await Post.find({
      author: { $in: followingIds },
    })
      .populate("author", "username avatar")
      .populate("comments.user", "username avatar")
      .populate("likes", "username avatar")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error("Get feed error:", error);
    res.status(500).json({ message: "Server error while fetching feed" });
  }
});

// Like/unlike a post
router.put("/like/:postId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const hasLiked = post.likes.includes(req.user._id);

    if (hasLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate("author", "username avatar")
      .populate("likes", "username avatar")
      .populate("comments.user", "username avatar");

    res.json(updatedPost);
  } catch (error) {
    console.error("Like error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    res.status(500).json({ message: "Server error while liking post" });
  }
});

// Add comment to post
router.post("/comment/:postId", auth, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      user: req.user._id,
      text: text.trim(),
    });

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate("author", "username avatar")
      .populate("comments.user", "username avatar")
      .populate("likes", "username avatar");

    res.json(updatedPost);
  } catch (error) {
    console.error("Comment error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    res.status(500).json({ message: "Server error while adding comment" });
  }
});

export default router;
