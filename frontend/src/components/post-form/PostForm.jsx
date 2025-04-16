import React, { useState } from 'react';
import Input from '../Input';
import RTE from './RTE';
import { useNavigate } from 'react-router-dom';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ title, content }),
      });


      const data = await res.json();
      console.log('data is: ',data)

      if (res.ok) {
        alert('Blog posted successfully!');
        setTitle('');
        setContent('');
        navigate(`/blogs/${data.data._id}`)
      } else {
        alert(data.message || 'Failed to post blog');
      }
    } catch (err) {
      console.error('Error posting blog:', err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl flex flex-col gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        {/* Title Input */}
        <Input
          label="Title:"
          placeholder="Enter the title"
          className="w-full"
          maxLength="250"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required='required'
        />

        {/* RTE Editor */}
        <RTE
          label="Content:"
          value={content}
          onChange={(value) => setContent(value)}
          maxLength={10000}
          required='required'
        />

        {/* Submit Button below RTE */}
        <button
  type="submit"
  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full md:w-1/3 self-center cursor-pointer"
>
  Post
</button>
      </form>
    </div>
  );
}

export default PostForm;
