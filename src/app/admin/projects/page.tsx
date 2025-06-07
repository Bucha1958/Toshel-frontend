


"use client";
import { useState, useEffect, useRef } from "react";
import { toast, Toaster } from "sonner";

export default function CreateProject() {
  

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
   //const [categories, setCategories] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [category, setCategory] = useState<string>("");

  const ref = useRef(null);

  type categoryType = {
    _id: string;
    description: string;
    name: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    status: string;
    __v: number;
    category: string;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URI}/api/categories`
        );
        const data = await response.json();
        setCategories(data?.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleProjectCreation = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData();
  formData.append("title", title); // <-- MUST include this, as your backend expects it
  formData.append("description", description);
  formData.append("category", category);

  // Append multiple images
  images.forEach((image) => {
    formData.append("images", image);
  });

  // Append optional video
  if (video) {
    formData.append("video", video);
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URI}/api/projects`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      toast.success("Project created successfully!");
      // Reset form state
      setTitle("");
      setDescription("");
      setImages([]);
      setVideo(null);
      setCategory("");
      setSuccess("Project created successfully");
    } else {
      toast.error(data.message || "Failed to create project");
      setError(data.message || "An error occurred");
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-white p-4">
      <Toaster richColors />
      <div className="md:w-1/2 mx-auto w-full">
        <h1 className="text-2xl font-bold mb-4 text-[#131313]">Create New Project</h1>
        <form
          className="flex flex-col gap-4"
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleProjectCreation}
        >
          {/* <input
            type="text"
            placeholder="Project Name"
            className="border border-gray-300 text-[#888] p-2 rounded placeholder:text-[#888]"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          /> */}

          <input
             type="text"
             placeholder="Project Title"
             className="border border-gray-300 text-[#888] p-2 rounded placeholder:text-[#888]"
             value={title}
             onChange={(e) => setTitle(e.target.value)}
             required
           />

          <input
            type="text"
            placeholder="Project Description"
            className="border border-gray-300 text-[#888] p-2 rounded placeholder:text-[#888]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            multiple
            className="border border-gray-300 text-[#888] p-2 rounded file:text-[#888]"
            onChange={(e) => {
              if (e.target.files) {
                const selectedFiles = Array.from(e.target.files);
                setImages((prevImages) => [...prevImages, ...selectedFiles]);
              }
            }}
          />

          {/* Image Previews */}
          <div className="flex flex-wrap gap-2">
            {images.map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="h-24 w-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() =>
                    setImages(images.filter((_, i) => i !== idx))
                  }
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <input
            type="file"
            accept="video/*"
            className="border border-gray-300 text-[#888] p-2 rounded file:text-[#888]"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setVideo(e.target.files[0]);
              }
            }}
          />

          {/* Video Preview */}
          {video && (
            <div className="relative mt-2">
              <video
                controls
                src={URL.createObjectURL(video)}
                className="w-full max-w-xs rounded"
              />
              <button
                type="button"
                onClick={() => setVideo(null)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          )}

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((cat: categoryType) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 ease-in-out"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Project"}
          </button>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </form>
      </div>
    </div>
  );
}


// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import { toast, Toaster } from 'sonner';

// export default function CreateProject() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [images, setImages] = useState<File[]>([]);
//   const [video, setVideo] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [categories, setCategories] = useState<categoryType[]>([]);
//   const [category, setCategory] = useState<string>('');

//   const ref = useRef(null);

//   type categoryType = {
//     _id: string;
//     description: string;
//     name: string;
//     image: string;
//     createdAt: string;
//     updatedAt: string;
//     status: string;
//     __v: number;
//     category: string;
//   };

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_BASE_URI}/api/categories`
//         );
//         const data = await response.json();
//         setCategories(data?.categories || []);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleProjectCreation = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('category', category);

//     images.forEach((image) => {
//       formData.append('images[]', image);
//     });

//     if (video) {
//       formData.append('video', video);
//     }

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URI}/api/projects`,
//         {
//           method: 'POST',
//           body: formData,
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('Project created successfully!');
//         setTitle('');
//         setDescription('');
//         setImages([]);
//         setVideo(null);
//         setCategory('');
//         setSuccess('Project created successfully');
//       } else {
//         toast.error(data.message || 'Failed to create project');
//         setError(data.message || 'An error occurred');
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error('Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-4">
//       <Toaster richColors />
//       <div className="md:w-1/2 mx-auto w-full">
//         <h1 className="text-2xl font-bold mb-4 text-[#131313]">Create New Project</h1>
//         <form
//           className="flex flex-col gap-4"
//           method="POST"
//           encType="multipart/form-data"
//           onSubmit={handleProjectCreation}
//         >
//           <input
//             type="text"
//             placeholder="Project Title"
//             className="border border-gray-300 text-[#888] p-2 rounded placeholder:text-[#888]"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />

//           <input
//             type="text"
//             placeholder="Project Description"
//             className="border border-gray-300 text-[#888] p-2 rounded placeholder:text-[#888]"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />

//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             className="border border-gray-300 text-[#888] p-2 rounded file:text-[#888]"
//             onChange={(e) => {
//               console.log("File input changed");
//               if (e.target.files) {
//                 const selectedFiles = Array.from(e.target.files);
//                 console.log("Selected files:", selectedFiles);
//                 setImages(selectedFiles);
//               }
//             }}
//             required
//           />

//           <div className="flex flex-wrap gap-2">
//             {images.map((img, idx) => (
//               <div key={idx} className="relative">
//                 <img
//                   src={URL.createObjectURL(img)}
//                   alt="preview"
//                   className="h-24 w-24 object-cover rounded"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setImages(images.filter((_, i) => i !== idx))}
//                   className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//           </div>

//           <input
//             type="file"
//             accept="video/*"
//             className="border border-gray-300 text-[#888] p-2 rounded file:text-[#888]"
//             onChange={(e) => {
//               if (e.target.files && e.target.files[0]) {
//                 setVideo(e.target.files[0]);
//               }
//             }}
//           />

//           {video && (
//             <div className="relative mt-2">
//               <video
//                 controls
//                 src={URL.createObjectURL(video)}
//                 className="w-full max-w-xs rounded"
//               />
//               <button
//                 type="button"
//                 onClick={() => setVideo(null)}
//                 className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
//               >
//                 ×
//               </button>
//             </div>
//           )}

//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//             className="border border-gray-300 text-[#888] p-2 rounded"
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat._id} value={cat._id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 ease-in-out"
//             disabled={loading}
//           >
//             {loading ? 'Creating...' : 'Create Project'}
//           </button>

//           {error && <p className="text-red-500">{error}</p>}
//           {success && <p className="text-green-500">{success}</p>}
//         </form>
//       </div>
//     </div>
//   );
// }
