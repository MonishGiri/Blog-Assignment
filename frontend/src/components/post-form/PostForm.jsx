import React, { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import RTE from './RTE';

function PostForm({ post }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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

      if (res.ok) {
        alert('Blog posted successfully!');
        setTitle('');
        setContent('');
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
        />

        {/* RTE Editor */}
        <RTE
          label="Content:"
          value={content}
          onChange={(value) => setContent(value)}
          maxLength={1000}
        />

        {/* Submit Button below RTE */}
        <Button
          type="submit"
          bgColor={post ? 'bg-green-500' : undefined}
          className="w-full md:w-1/3"
        >
          {post ? 'Update' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}

export default PostForm;
