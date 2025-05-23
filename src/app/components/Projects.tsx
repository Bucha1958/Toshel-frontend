"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProjectDetailPage() {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/projects`);
        const data = await res.json();
        setProject(data.projects);
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  if (!project?.length)
    return <div className="p-6 text-center text-red-500">Project not found.</div>;

  return (
  <section className="relative py-24 px-6 lg:px-20 overflow-hidden bg-white dark:bg-[#0c0c0c]">
    <video
      autoPlay
      muted
      loop
      className="absolute top-0 left-0 w-full h-full object-cover z-[-1] opacity-10"
    >
      <source src="/video-bg.mp4" type="video/mp4" />
    </video>

    <div className="max-w-6xl mx-auto relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {project.map((item: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-white/80 dark:bg-white/10 backdrop-blur-lg shadow-xl overflow-hidden"
          >
            <div className="relative w-full h-64 sm:h-80">
              <Image
                src={item.images}
                alt={item.slug}
                fill
                className="object-cover rounded-t-3xl"
              />
            </div>
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {item.slug}
              </h1>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
}
