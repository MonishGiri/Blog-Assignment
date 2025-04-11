import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(`http://localhost:8000/api/blogs/${id}`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      setBlog(data?.data);
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;

    const res = await fetch(`http://localhost:8000/api/blogs/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (res.ok) {
      alert("Blog deleted successfully");
      navigate('/allBlogs');
    }
  };

  const handleEdit = () => {
    navigate(`/blogs/edit/${id}`);
  };

  if (!blog) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  const isAuthor = user && blog.author._id === user._id;

  return (
    <div className="flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
        <h2 className="text-3xl font-bold text-center dark:text-white">{blog.title}</h2>

        <div
          className="text-gray-700 dark:text-gray-200 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-right">
          Author: {blog.author.fullName || blog.author.username}
        </p>

        {isAuthor && (
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-28"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-28"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
