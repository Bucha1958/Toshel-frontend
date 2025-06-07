"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

const projects = [
  {
    title: "Lekki-Epe Expressway Expansion",
    image: "/images/project1.jpg",
    detailsUrl: "/projects/lekki-epe",
    referencesUrl: "/references/lekki-epe",
  },
  {
    title: "Abuja Mega Mall",
    image: "/images/project2.jpg",
    detailsUrl: "/projects/abuja-mall",
    referencesUrl: "/references/abuja-mall",
  },
  // Add more projects as needed
];

export default function ProjectCarousel() {
  return (
    <div className="relative w-full h-[800px] overflow-hidden">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        loop={true}
        className="rounded-2xl overflow-hidden shadow-lg pb-[100px]"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[400px]">
              <Image
                src={project.image}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                className="brightness-75"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-black/50 text-white">
                <h2 className="text-2xl font-bold">{project.title}</h2>
                <div className="mt-3 flex gap-4">
                  <a
                    href={project.detailsUrl}
                    className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Details
                  </a>
                  <a
                    href={project.referencesUrl}
                    className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
                  >
                    References
                  </a>
                </div>
              </div>
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
