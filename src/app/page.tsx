// src/app/page.tsx

"use client";

import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Feature from "./components/Feature";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Vision from "./components/Vision";
import Contact from "./components/Contact";
import Team from "./components/Team";
import Testimonial from "./components/Testimonial";
import ProjectGallery from "./components/ProjectGallery";
import Map from "./components/Map";

type Project = {
  _id: string;
  image: string;
  title: string;
  description: string;
};

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        const formattedProjects = data.projects.map((proj: any) => ({
          _id: proj._id,
          image: proj.images[0],
          title: proj.title,
          description: proj.category?.name || "No category",
        }));
        setProjects(formattedProjects);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Hero />
      <Feature />
      <Services />
      {loading ? (
        <div className="text-center py-10">Loading projects...</div>
      ) : (
        <ProjectGallery projects={projects} />
      )}
      <Vision />
      <Contact />
      <Team />
      <Testimonial />
      <Map />
    </>
  );
}
