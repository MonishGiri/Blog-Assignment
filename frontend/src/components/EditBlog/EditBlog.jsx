import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RTE from '../post-form/RTE';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    fetch(`http://localhost:8000/api/blogs/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setBlog({
          title: res.data.title,
          content: res.data.content,
        });
      });
  }, [id]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleRTEChange = (value) => {
    setBlog({ ...blog, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(blog),
      });

      if (res.ok) {
        navigate(`/blogs/${id}`);
      } else {
        console.error('Failed to update blog');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl flex flex-col gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-2 text-center dark:text-white">Edit Blog</h2>

        {/* Title Input */}
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          placeholder="Enter the title"
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          required
        />

        {/* RTE for Content */}
        <RTE
          label="Content:"
          value={blog.content}
          onChange={handleRTEChange}
          maxLength={1000}
        />

        {/* Submit Button */}
        <button
  type="submit"
  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full md:w-1/3 self-center"
>
  Update Blog
</button>
      </form>
    </div>
  );
};

export default EditBlog;
