import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function RTE({ label, value, onChange, maxLength = 500 }) {
  const [contentLength, setContentLength] = useState(value?.length || 0);

  const handleEditorChange = (content, editor) => {
    const currentLength = editor.getContent({ format: 'text' }).length;

    if (currentLength <= maxLength) {
      setContentLength(currentLength);
      onChange(content);
    }
  };

  useEffect(() => {
    setContentLength(value?.length || 0);
  }, [value]);

  return (
    <div className='w-full text-white'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

      <Editor
        value={value}
        apiKey='wzj6z73cbhxq3tb41t2sascigq87ux2v01xrqn6gw65o2iw3'
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "image", "advlist", "autolink", "lists", "link", "charmap", "preview", "anchor",
            "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media",
            "table", "code", "help", "wordcount"
          ],
          toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }",
          setup: (editor) => {
            editor.on('keydown', (e) => {
              const len = editor.getContent({ format: 'text' }).length;
              if (len >= maxLength && e.key !== 'Backspace' && e.key !== 'Delete') {
                e.preventDefault();
              }
            });
          }
        }}
        onEditorChange={(content, editor) => handleEditorChange(content, editor)}
      />

      <p className='text-sm text-gray-400 mt-2'>
        {contentLength}/{maxLength} characters
      </p>
    </div>
  );
}
