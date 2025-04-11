import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
          Welcome to <span className="text-blue-500">BlogVerse</span>
        </h1>
        <p className="text-gray-300 text-lg sm:text-xl mb-8">
          Share your stories, learn from others, and be a part of a vibrant blogging community.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="bg-green-600 hover:bg-green-700 transition py-3 px-6 rounded text-white font-semibold"
          >
            Get Started
          </Link>
          <Link
            to="/allBlogs"
            className="bg-blue-600 hover:bg-blue-700 transition py-3 px-6 rounded text-white font-semibold"
          >
            View Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
