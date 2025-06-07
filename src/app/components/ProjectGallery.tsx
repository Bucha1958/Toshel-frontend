"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from 'react';
import LoadMoreButton from './Button';


type Project = {
  _id: string;
  image: string;
  title: string;
  description: string;
  
};

type ProjectGalleryProps = {
  projects: Project[];
  showAll?: boolean;
};


// export default function ProjectGallery({ projects, showAll = false }: ProjectGalleryProps) {
//   const [isActive, setIsActive] = useState(false);

//   const handleClick = () => {
//     setIsActive(!isActive);
//   };

//   const visibleProjects = showAll ? projects : projects.slice(0, 3); // show all or just first 3

//   return (
//     <>

//        {/* Mobile layout */}
//           <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {visibleProjects.map((project, idx) => (
//               <HoverProjectCard key={idx} project={project} height="h-[300px]" />
//             ))}
//           </div>

//           {/* Desktop layout */}
//           <div className="hidden md:grid md:grid-cols-3 gap-4">
//             {visibleProjects.map((project, idx) => (
//               <HoverProjectCard key={idx} project={project} height="h-[220px]" />
//             ))}
//           </div>
//           {!showAll && <LoadMoreButton href="/project-page" isActive={false} />}
//     </>
//   );
// }
// export default function ProjectGallery({ projects, showAll = false }: ProjectGalleryProps) {
//   const visibleProjects = showAll ? projects : projects.slice(0, 3);

//   if (visibleProjects.length === 0) {
//     return (
//       <div className="text-center py-10 text-gray-500 text-lg">
//         Upload your project
//       </div>
//     );
//   }

//   if (visibleProjects.length === 1) {
//     return (
//       <div className="flex justify-center">
//         <HoverProjectCard project={visibleProjects[0]} height="h-[300px]" />
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Mobile layout */}
//       <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {visibleProjects.map((project, idx) => (
//           <HoverProjectCard key={idx} project={project} height="h-[300px]" />
//         ))}
//       </div>

//       {/* Desktop layout */}
//       <div className="hidden md:grid md:grid-cols-3 gap-4">
//         {visibleProjects.map((project, idx) => (
//           <HoverProjectCard key={idx} project={project} height="h-[220px]" />
//         ))}
//       </div>
//       {!showAll && <LoadMoreButton href="/project-page" isActive={false} />}

//     </>
//   );
// }

export default function ProjectGallery({ projects, showAll = false }: ProjectGalleryProps) {
  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  if (visibleProjects.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        Upload your project
      </div>
    );
  }

  if (visibleProjects.length === 1) {
    return (
      <div className="flex justify-center">
        <HoverProjectCard project={visibleProjects[0]} height="h-[300px]" />
      </div>
    );
  }

  return (
    <>
      {visibleProjects.length >= 3 ? (
        <div className="grid md:grid-cols-3 gap-4">
          {/* Large project spans 2 columns */}
          <div className="md:col-span-2">
            <HoverProjectCard project={visibleProjects[0]} height="h-[450px]" />
          </div>

          {/* Two small stacked projects */}
          <div className="flex flex-col gap-4">
            <HoverProjectCard project={visibleProjects[1]} height="h-[220px]" />
            <HoverProjectCard project={visibleProjects[2]} height="h-[220px]" />
          </div>
        </div>
      ) : (
        // If less than 3, just show simple grid
        <div className="grid md:grid-cols-2 gap-4">
          {visibleProjects.map((project, idx) => (
            <HoverProjectCard key={idx} project={project} height="h-[400px]" />
          ))}
        </div>
      )}

      {!showAll && (
        <div className="mt-8 flex justify-center">
          <LoadMoreButton href="/project-page" isActive={false} />
        </div>
      )}
    </>
  );
}


type HoverCardProps = {
  project: Project;
  height: string;
  className?: string;
};

function HoverProjectCard({ project, height, className = "" }: HoverCardProps) {
  return (
    <div className={`relative group overflow-hidden w-full ${height} ${className}`}>
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-300"
      />

      {/* Overlay */}
      <div
        className={`
            absolute bottom-0 left-0 w-full px-4 py-3 text-white
            bg-[#007cbf]/60 transition-transform duration-300
            hover-overlay
        `}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">{project.title}</h3>
            <p className="text-sm">{project.description}</p>
          </div>

         

          <Link href={`/project-details/${project._id}`}>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 transition-colors">
              <ArrowRight size={20} />
            </div>
          </Link>
         


        </div>
      </div>
    </div>
  );
}
