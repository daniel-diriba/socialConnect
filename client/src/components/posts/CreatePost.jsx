import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔴 SUBMIT CLICKED - Content:", content); // Debug log

    if (!content.trim()) {
      alert("Please enter some content!");
      return;
    }

    setLoading(true);

    try {
      console.log("🟡 Attempting to create post...");

      // Try backend first
      try {
        const response = await axios.post(
          "http://localhost:5000/api/posts/create",
          {
            content: content.trim(),
          }
        );
        console.log("🟢 Backend response:", response.data);

        if (onPostCreated) {
          onPostCreated(response.data);
        }
      } catch (backendError) {
        console.log("🟠 Backend failed, using local creation");
        // Fallback: Create post locally
        const localPost = {
          _id: Date.now().toString(),
          content: content.trim(),
          author: {
            username: user.username,
            avatar: user.avatar,
          },
          likes: [],
          comments: [],
          images: [],
          createdAt: new Date(),
        };
        console.log("🟢 Local post created:", localPost);

        if (onPostCreated) {
          onPostCreated(localPost);
        }
      }

      // Clear the input
      setContent("");
    } catch (error) {
      console.error("🔴 Error creating post:", error);
      alert("Failed to create post. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-start space-x-4">
        <img
          src={
            user?.avatar ||
            `https://ui-avatars.com/api/?name=${user?.username}&background=0D8ABC&color=fff`
          }
          alt={user?.username}
          className="w-12 h-12 rounded-full border-2 border-blue-100"
        />
        <form onSubmit={handleSubmit} className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full border border-gray-300 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            rows="3"
          />
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-2">
              <button
                type="button"
                className="text-gray-500 hover:text-blue-500 p-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                📷
              </button>
              <button
                type="button"
                className="text-gray-500 hover:text-green-500 p-2 rounded-lg hover:bg-green-50 transition-colors"
              >
                🎥
              </button>
              <button
                type="button"
                className="text-gray-500 hover:text-yellow-500 p-2 rounded-lg hover:bg-yellow-50 transition-colors"
              >
                😊
              </button>
            </div>
            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
