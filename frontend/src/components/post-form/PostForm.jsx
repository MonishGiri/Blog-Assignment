import React, { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import RTE from './RTE';

function PostForm({ post }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submit logic here
    console.log({ title, content });
  };

  return (
    <div className="flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        {/* Left Section - Title and RTE */}
        <div className="w-full md:w-2/3 space-y-4">
          <Input
            label="Title:"
            placeholder="Enter the title"
            className="w-full"
            maxLength="250"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <RTE
            label="Content:"
            value={content}
            onChange={(value) => setContent(value)}
            maxLength={1000}
          />
        </div>

        {/* Right Section - Submit Button */}
        <div className="w-full md:w-1/3 flex flex-col justify-start items-center gap-4">
          <Button
            type="submit"
            bgColor={post ? 'bg-green-500' : undefined}
            className="w-full"
          >
            {post ? 'Update' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
