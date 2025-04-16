import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function RTE({ label, value, onChange, maxLength = 500 }) {
  const [contentLength, setContentLength] = useState(0);
  const editorRef = useRef(null);

  const handleEditorChange = (content, editor) => {
    const plainText = editor.getContent({ format: 'text' });
    if (plainText.length <= maxLength) {
      setContentLength(plainText.length);
      onChange(content);
    }
  };

  const handleImageUpload = async (blobInfo, success, failure) => {
    const formData = new FormData();
    formData.append('file', blobInfo.blob());

    try {
      const res = await fetch('http://localhost:8000/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        success(data.url);
      } else {
        failure('Image upload failed');
      }
    } catch (error) {
      failure('Error uploading image');
    }
  };

  useEffect(() => {
    const plainText = value ? value.replace(/<[^>]+>/g, '') : '';
    setContentLength(plainText.length);
  }, [value]);

  return (
    <div className="w-full text-white">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        apiKey="wzj6z73cbhxq3tb41t2sascigq87ux2v01xrqn6gw65o2iw3"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'image', 'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview', 'anchor',
            'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media',
            'table', 'code', 'help', 'wordcount'
          ],
          toolbar:
            'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }',
          images_upload_handler: handleImageUpload,
          setup: (editor) => {
            editor.on('keydown', (e) => {
              const len = editor.getContent({ format: 'text' }).length;
              if (len >= maxLength && e.key !== 'Backspace' && e.key !== 'Delete') {
                e.preventDefault();
              }
            });
          },
        }}
        onEditorChange={handleEditorChange}
      />

      <p className="text-sm text-gray-400 mt-2">
        {contentLength}/{maxLength} characters
      </p>
    </div>
  );
}
