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
    if (!content.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post("/posts/create", {
        content: content.trim(),
      });
      setContent("");
      if (onPostCreated) {
        onPostCreated(response.data);
      }
    } catch (error) {
      console.error("Error creating post:", error);
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
            `https://ui-avatars.com/api/?name=${user?.username}&background=random`
          }
          alt={user?.username}
          className="w-12 h-12 rounded-full"
        />
        <form onSubmit={handleSubmit} className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full border border-gray-300 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
          />
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-2">
              <button
                type="button"
                className="text-gray-500 hover:text-blue-500"
              >
                📷
              </button>
              <button
                type="button"
                className="text-gray-500 hover:text-green-500"
              >
                🎥
              </button>
              <button
                type="button"
                className="text-gray-500 hover:text-yellow-500"
              >
                😊
              </button>
            </div>
            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
