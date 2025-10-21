import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import CreatePost from "../components/posts/CreatePost";
import PostCard from "../components/posts/PostCard";
import UserCard from "../components/users/UserCard";
import Sidebar from "../components/layout/Sidebar";

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("for-you");

  useEffect(() => {
    if (user) {
      loadInitialData();
    }
  }, [user]);

  const loadInitialData = () => {
    // Demo posts
    const demoPosts = [
      {
        _id: "1",
        content:
          "Just launched an amazing new feature in our React app! The performance improvements are incredible. 🚀\n\n#React #JavaScript #WebDev",
        author: {
          username: "sarah_developer",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        },
        likes: ["1", "2", "3", "4"],
        comments: [
          {
            user: {
              username: "mike_coder",
              avatar:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            },
            text: "This looks amazing! Great work Sarah! 👏",
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          },
        ],
        images: [],
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      },
      {
        _id: "2",
        content:
          "Beautiful sunset from the office today. Sometimes you need to pause and appreciate the small moments in life. 🌅\n\nGrateful for my team and the work we do!",
        author: {
          username: "mike_coder",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        },
        likes: ["1", "3"],
        comments: [],
        images: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
        ],
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      },
    ];

    // Demo suggested users
    const demoUsers = [
      {
        id: "2",
        username: "sarah_developer",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        bio: "Senior Frontend Developer | React Specialist | Tech Speaker",
        followers: ["1", "3", "4", "5"],
        following: ["1", "3"],
      },
      {
        id: "3",
        username: "mike_coder",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        bio: "Full Stack Developer | Open Source Contributor",
        followers: ["1", "2"],
        following: ["1", "2"],
      },
      {
        id: "4",
        username: "emma_fitness",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        bio: "Fitness Coach | Healthy Lifestyle Advocate",
        followers: ["1", "3"],
        following: ["1"],
      },
    ];

    setPosts(demoPosts);
    setSuggestedUsers(demoUsers);
  };

  // Handle new post creation
  // Handle new post creation - FIXED VERSION
  const handlePostCreated = (newPost) => {
    console.log("🟢 HOME: Received new post:", newPost);

    // Check if the post came from backend or is local
    let postToAdd;

    if (newPost._id && newPost.author) {
      // Post from backend - use as is
      postToAdd = newPost;
    } else if (newPost.content) {
      // Local post - create proper structure
      postToAdd = {
        _id: Date.now().toString(),
        content: newPost.content,
        author: {
          username: user.username,
          avatar: user.avatar,
        },
        likes: [],
        comments: [],
        images: newPost.images || [],
        createdAt: new Date(),
      };
    } else {
      console.error("🔴 Invalid post structure:", newPost);
      return;
    }

    console.log("🟢 Adding post to feed:", postToAdd);
    setPosts([postToAdd, ...posts]);
  };

  // Handle post updates (likes, comments)
  const handlePostUpdate = (updatedPost) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  // Handle follow/unfollow
  const handleFollowUpdate = (userId, isFollowing) => {
    setSuggestedUsers((currentUsers) =>
      currentUsers.map((u) =>
        u.id === userId
          ? {
              ...u,
              followers: isFollowing
                ? [...u.followers, user.id]
                : u.followers.filter((id) => id !== user.id),
            }
          : u
      )
    );
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
            {posts.length === 0 ? (
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
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    onUpdatePost={handlePostUpdate}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            {/* Who to Follow */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                People you may know
              </h3>
              <div className="space-y-4">
                {suggestedUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onFollowUpdate={handleFollowUpdate}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
