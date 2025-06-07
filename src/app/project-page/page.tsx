"use client";

import { useEffect, useState } from "react";
import ProjectContent from "../components/ProjectContent";
import ProjectFilter from "../components/ProjectFilter";

type Project = {
  _id: string;
  image: string;
  title: string;
  description: string; // will contain the category name
};

const filterOptions = ["All", "Industry", "Infrastructure", "Building"];

export default function ProjectsPage() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/projects`);
        const data = await res.json();

        // Check if data.projects is an array
        if (!Array.isArray(data.projects)) {
          console.error("Expected data.projects to be an array, got:", data.projects);
          return;
        }

        const formatted: Project[] = data.projects.map((p: any) => ({
          _id: p._id,
          image: p.images?.[0] || "/images/default.jpg",
          title: p.title,
          description: p.category?.name || "General", // Extract name if category is object
        }));

        setAllProjects(formatted);
        console.log("Fetched and formatted projects:", formatted);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    activeFilter === "All"
      ? allProjects
      : allProjects.filter(
          (project) =>
            project.description.toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">All Projects</h1>
      <ProjectFilter
        filters={filterOptions}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <ProjectContent projects={filteredProjects} showAll />
    </div>
  );
}
