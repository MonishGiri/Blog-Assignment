import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition"
      onClick={() => navigate(`/blogs/${blog.id}`)}
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{blog.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{blog.content}</p>
    </div>
  );
};

export default BlogCard;
