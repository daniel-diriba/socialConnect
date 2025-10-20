import React from "react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Welcome {user?.username || "to SocialSphere"}
        </h1>

        {user ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Your Feed</h2>
            <p className="text-gray-600">
              Posts from people you follow will appear here.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">
              Join SocialSphere Today
            </h2>
            <p className="text-gray-600 mb-4">
              Connect with friends and share your moments.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
