import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard/BlogCard';


const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/blogs/')
    .then((res) => res.json())
    .then((res) => setBlogs(res.data))
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">All Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
