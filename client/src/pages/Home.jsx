import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import CreatePost from "../components/posts/CreatePost";
import PostCard from "../components/posts/PostCard";
import Sidebar from "../components/layout/Sidebar";
import Stories from "../components/layout/Stories";
import axios from "axios";

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("for-you");

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/posts/feed");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Mock data for demonstration
      setPosts([
        {
          _id: "1",
          content:
            "Just launched my new portfolio website! 🚀 Built with React and Node.js. So excited to share my work with the world! #webdev #react #portfolio",
          author: {
            username: "sarah_codes",
            avatar:
              "https://ui-avatars.com/api/?name=Sarah+Developer&background=6366f1&color=fff",
          },
          likes: ["2", "3", "4"],
          comments: [
            {
              user: { username: "dev_guru", avatar: "" },
              text: "Looks amazing! Great work!",
              createdAt: new Date(),
            },
          ],
          images: [],
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        },
        {
          _id: "2",
          content:
            "Beautiful sunset from the office today. Sometimes you need to appreciate the small moments. 🌅 #gratitude #sunset #worklife",
          author: {
            username: "mike_designs",
            avatar:
              "https://ui-avatars.com/api/?name=Mike+Designer&background=ec4899&color=fff",
          },
          likes: ["1", "3"],
          comments: [],
          images: [],
          createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  // Guest view - like LinkedIn/Facebook landing
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl font-bold mb-6 leading-tight">
                  Connect with the world around you
                </h1>
                <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                  Join SocialConnect to share ideas, build your network, and
                  discover opportunities with professionals worldwide.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="bg-white rounded-lg p-1 flex">
                    <input
                      type="email"
                      placeholder="Email address"
                      className="flex-1 px-4 py-3 text-gray-900 rounded-l-lg focus:outline-none"
                    />
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Get Started
                    </button>
                  </div>
                </div>
                <p className="text-sm text-blue-200 mt-4">
                  Already have an account?{" "}
                  <a href="/login" className="font-semibold underline">
                    Sign in
                  </a>
                </p>
              </div>
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                      <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">💼</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Find Opportunities</h3>
                        <p className="text-blue-200 text-sm">
                          Connect with employers and discover career paths
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                      <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">👥</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Build Your Network</h3>
                        <p className="text-blue-200 text-sm">
                          Grow your professional connections worldwide
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                      <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">📚</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Share Knowledge</h3>
                        <p className="text-blue-200 text-sm">
                          Learn from industry experts and thought leaders
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why professionals choose SocialConnect
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join over 50 million professionals who use SocialConnect to
              advance their careers and build meaningful connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-blue-600">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Career Growth</h3>
              <p className="text-gray-600">
                Access job opportunities and career resources to help you grow
                professionally.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-green-600">🌐</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Global Network</h3>
              <p className="text-gray-600">
                Connect with professionals from every industry and corner of the
                world.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-purple-600">💡</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Knowledge Sharing</h3>
              <p className="text-gray-600">
                Learn from industry experts and share your own insights with the
                community.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated user view
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6 space-y-4">
            {/* Stories */}
            <Stories />

            {/* Create Post */}
            <CreatePost onPostCreated={handlePostCreated} />

            {/* Feed Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("for-you")}
                    className={`flex-1 py-4 px-6 text-center font-semibold border-b-2 transition-colors ${
                      activeTab === "for-you"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    For You
                  </button>
                  <button
                    onClick={() => setActiveTab("following")}
                    className={`flex-1 py-4 px-6 text-center font-semibold border-b-2 transition-colors ${
                      activeTab === "following"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Following
                  </button>
                  <button
                    onClick={() => setActiveTab("featured")}
                    className={`flex-1 py-4 px-6 text-center font-semibold border-b-2 transition-colors ${
                      activeTab === "featured"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Featured
                  </button>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-24"></div>
                        <div className="h-3 bg-gray-300 rounded w-32"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-gray-400">📝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No posts yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start by creating your first post or follow some users to see
                  their content here!
                </p>
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                  Find people to follow
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            {/* News & Updates */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-blue-500 mr-2">📰</span>
                Industry News
              </h3>
              <div className="space-y-4">
                <div className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">
                    Tech Industry Growth
                  </h4>
                  <p className="text-xs text-gray-500">
                    2 hours ago • 1.2K reads
                  </p>
                </div>
                <div className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">
                    Remote Work Trends 2024
                  </h4>
                  <p className="text-xs text-gray-500">
                    5 hours ago • 3.4K reads
                  </p>
                </div>
                <div className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">
                    AI in Everyday Business
                  </h4>
                  <p className="text-xs text-gray-500">
                    1 day ago • 5.7K reads
                  </p>
                </div>
              </div>
              <button className="w-full text-blue-500 text-sm font-semibold mt-4 py-2 hover:bg-blue-50 rounded-lg transition-colors">
                See all news
              </button>
            </div>

            {/* Who to Follow */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                People you may know
              </h3>
              <div className="space-y-4">
                {[
                  {
                    name: "Alex Johnson",
                    role: "Software Engineer",
                    mutual: 12,
                  },
                  { name: "Maria Garcia", role: "Product Designer", mutual: 8 },
                  { name: "David Kim", role: "Data Scientist", mutual: 15 },
                ].map((person, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {person.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-gray-900">
                          {person.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {person.role}
                        </div>
                        <div className="text-xs text-gray-400">
                          {person.mutual} mutual connections
                        </div>
                      </div>
                    </div>
                    <button className="text-blue-500 hover:text-blue-600 text-sm font-semibold bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full transition-colors">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
              <button className="w-full text-blue-500 text-sm font-semibold mt-4 py-2 hover:bg-blue-50 rounded-lg transition-colors">
                View all recommendations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
