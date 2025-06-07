import React, { useState, ChangeEvent, FormEvent } from 'react';

interface ProjectCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectCreationModal: React.FC<ProjectCreationModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState<FileList | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('slug', slug);
    formData.append('category', category);

    if (images) {
      Array.from(images).forEach((img) => {
        formData.append('images', img);
      });
    }

    if (video) {
      formData.append('video', video);
    }

    try {
      const response = await fetch('http://localhost:3500/api/projects', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert(`Error: ${errorData.message}`);
        return;
      }

      const result = await response.json();
      console.log('Project created:', result);
      alert('Project created successfully!');
      onClose(); // close modal
    } catch (error) {
      console.error('Fetch error:', error);
      alert('An error occurred while creating the project.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
            className="w-full"
          />
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="w-full"
          />

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectCreationModal;
