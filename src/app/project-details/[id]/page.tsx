
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LightboxGallery from "@/app/components/LightboxGallery";

type Project = {
  _id: string;
  mainImage: string;
  title: string;
  description: string;
  images: string[];
  category?: { name: string };
  gallery: string[];
};

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data.project);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch project details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-10">Loading project...</div>;
  if (!project) return <div className="p-10">Project not found.</div>;

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto space-y-8">
      {/* Main Image */}
      {project.mainImage && (
        <img
          src={project.mainImage}
          alt={project.title}
          className="w-full h-96 object-cover rounded-lg shadow-md"
        />
      )}

      {/* Project Title & Metadata */}
      <div>
        <h1 className="text-4xl font-bold text-blue-900 mb-2">{project.title}</h1>
        {project.category?.name && (
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-4">
            {project.category.name}
          </p>
        )}
        <p className="text-gray-700 leading-relaxed">{project.description}</p>
      </div>

      {/* Lightbox Gallery */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
        <LightboxGallery gallery={project.images} />
      </div>
    </div>
  );
}


