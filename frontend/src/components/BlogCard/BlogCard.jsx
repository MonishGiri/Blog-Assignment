import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blogs/${blog._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform"
    >
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{blog.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-3"  dangerouslySetInnerHTML={{ __html: blog.content }}></p>
      </div>
    </div>
  );
};

export default BlogCard;
