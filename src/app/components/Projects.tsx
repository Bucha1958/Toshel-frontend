"use client";


// pages/projects.tsx or a section
import ProjectCard from "./projectCard";

const projects = [
  {
    title: "Lekki-Epe Expressway Expansion",
    image: "/images/project1.jpg",
    detailsUrl: "/projects/lekki-epe",
    referencesUrl: "/references/lekki-epe",
  },
  // {
  //   title: "Abuja Mega Mall",
  //   image: "/images/project2.jpg",
  //   detailsUrl: "/projects/abuja-mall",
  //   referencesUrl: "/references/abuja-mall",
  // },
  // {
  //   title: "Abuja Mega Mall",
  //   image: "/images/project2.jpg",
  //   detailsUrl: "/projects/abuja-mall",
  //   referencesUrl: "/references/abuja-mall",
  // },
  // {
  //   title: "Abuja Mega Mall",
  //   image: "/images/project2.jpg",
  //   detailsUrl: "/projects/abuja-mall",
  //   referencesUrl: "/references/abuja-mall",
  // },
  // {
  //   title: "Abuja Mega Mall",
  //   image: "/images/project2.jpg",
  //   detailsUrl: "/projects/abuja-mall",
  //   referencesUrl: "/references/abuja-mall",
  // },
  
];

export default function Projects() {
  return (
    <section className="py-16 px-2">
      {/* <h1 className="text-3xl font-bold mb-8 text-center">Our Projects</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-6xl mx-auto z-10">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
}
