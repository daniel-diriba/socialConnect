import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const PostCard = ({ post, onUpdatePost }) => {
  const [currentPost, setCurrentPost] = useState(post);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const { user } = useAuth();

  const handleLike = async () => {
    if (isLiking) return;

    setIsLiking(true);

    try {
      console.log("🟡 Liking post:", currentPost._id);

      // Try backend API call
      try {
        const response = await axios.put(
          `http://localhost:5000/api/posts/like/${currentPost._id}`
        );
        console.log("🟢 Like successful:", response.data);
        const updatedPost = response.data;
        setCurrentPost(updatedPost);
        if (onUpdatePost) onUpdatePost(updatedPost);
      } catch (backendError) {
        console.log("🟠 Backend like failed, updating locally");
        // Fallback: Update locally
        const updatedPost = {
          ...currentPost,
          likes: isLiked
            ? currentPost.likes.filter((id) => id !== user?.id)
            : [...currentPost.likes, user?.id],
        };
        setCurrentPost(updatedPost);
        if (onUpdatePost) onUpdatePost(updatedPost);
      }
    } catch (error) {
      console.error("🔴 Error liking post:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      console.log("🟡 Adding comment:", commentText);

      // Try backend API call
      try {
        const response = await axios.post(
          `http://localhost:5000/api/posts/comment/${currentPost._id}`,
          {
            text: commentText,
          }
        );
        console.log("🟢 Comment successful:", response.data);
        const updatedPost = response.data;
        setCurrentPost(updatedPost);
        setCommentText("");
        if (onUpdatePost) onUpdatePost(updatedPost);
      } catch (backendError) {
        console.log("🟠 Backend comment failed, updating locally");
        // Fallback: Update locally
        const newComment = {
          user: {
            username: user?.username,
            avatar: user?.avatar,
          },
          text: commentText,
          createdAt: new Date(),
        };
        const updatedPost = {
          ...currentPost,
          comments: [...currentPost.comments, newComment],
        };
        setCurrentPost(updatedPost);
        setCommentText("");
        if (onUpdatePost) onUpdatePost(updatedPost);
      }
    } catch (error) {
      console.error("🔴 Error adding comment:", error);
    }
  };

  const isLiked = currentPost.likes.includes(user?.id);

  const getTimeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4 hover:shadow-md transition-shadow">
      {/* Post Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={
                currentPost.author?.avatar ||
                `https://ui-avatars.com/api/?name=${
                  currentPost.author?.username || "User"
                }&background=0D8ABC&color=fff`
              }
              alt={currentPost.author?.username || "User"}
              className="w-10 h-10 rounded-full border-2 border-blue-100"
            />
            <div>
              <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                {currentPost.author?.username || "Unknown User"}
              </h3>
              <p className="text-xs text-gray-500">
                {getTimeAgo(currentPost.createdAt)}
              </p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <span className="text-lg">⋯</span>
          </button>
        </div>
      </div>

      {/* Post Content - FIXED DISPLAY */}
      <div className="p-4">
        <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
          {currentPost.content || "No content available"}
        </p>

        {/* Post Images */}
        {currentPost.images && currentPost.images.length > 0 && (
          <div className="mt-4 rounded-lg overflow-hidden">
            <img
              src={currentPost.images[0]}
              alt="Post content"
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>
        )}
      </div>

      {/* Post Stats */}
      <div className="px-4 py-2 border-y border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span className="text-red-500">❤️</span>
              <span>{currentPost.likes?.length || 0} likes</span>
            </span>
            <span
              className="flex items-center space-x-1 cursor-pointer hover:text-blue-600"
              onClick={() => setShowComments(!showComments)}
            >
              <span>💬</span>
              <span>{currentPost.comments?.length || 0} comments</span>
            </span>
          </div>
          <span className="text-xs">📊 0 shares</span>
        </div>
      </div>

      {/* Post Actions */}
      <div className="p-2 grid grid-cols-3 gap-1">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center justify-center space-x-2 py-3 rounded-lg transition-all ${
            isLiked
              ? "text-red-500 bg-red-50 hover:bg-red-100"
              : "text-gray-500 hover:bg-gray-50 hover:text-red-500"
          } ${isLiking ? "opacity-50" : ""}`}
        >
          <span className="text-lg">{isLiked ? "❤️" : "🤍"}</span>
          <span className="font-medium">Like</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center justify-center space-x-2 py-3 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-blue-500 transition-all"
        >
          <span className="text-lg">💬</span>
          <span className="font-medium">Comment</span>
        </button>

        <button className="flex items-center justify-center space-x-2 py-3 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-green-500 transition-all">
          <span className="text-lg">🔄</span>
          <span className="font-medium">Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100 p-4 bg-gray-50">
          {/* Add Comment */}
          <form
            onSubmit={handleComment}
            className="flex items-start space-x-3 mb-4"
          >
            <img
              src={
                user?.avatar ||
                `https://ui-avatars.com/api/?name=${user?.username}&background=0D8ABC&color=fff`
              }
              alt={user?.username}
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
            >
              Post
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {currentPost.comments?.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No comments yet. Be the first to comment!
              </div>
            ) : (
              currentPost.comments?.map((comment, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <img
                    src={
                      comment.user?.avatar ||
                      `https://ui-avatars.com/api/?name=${comment.user?.username}&background=0D8ABC&color=fff`
                    }
                    alt={comment.user?.username}
                    className="w-6 h-6 rounded-full mt-1 flex-shrink-0"
                  />
                  <div className="flex-1 bg-white rounded-2xl p-3 shadow-sm">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-sm text-gray-900">
                        {comment.user?.username || "Unknown User"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {getTimeAgo(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-800 text-sm">{comment.text}</p>
                    <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                      <button className="hover:text-blue-600">Like</button>
                      <button className="hover:text-blue-600">Reply</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
