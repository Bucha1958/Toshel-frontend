"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function VisionSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 md:right-10 z-50 mt-2">
      {/* Floating Button */}
      <motion.button
        className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        Our Vision
      </motion.button>

      {/* Expanded Sidebar */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed bottom-6 right-4 md:right-10 bg-white w-[90vw] max-w-xl p-6 md:p-8 rounded-xl shadow-2xl border border-gray-300 relative overflow-hidden"


        >
        <div className="absolute inset-0 bg-black/40"></div> 
<div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat"></div>

          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-10"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>
          <h2 className="text-3xl font-bold text-blue-600 mb-4 relative z-10">
            Building a Sustainable Future
          </h2>
          <p className="text-white text-base md:text-lg leading-relaxed relative z-10">

            Our vision is to revolutionize the construction industry by embracing
            innovative, sustainable, and customer-centric building practices.
            We aim to create spaces that are aesthetically pleasing, environmentally
            responsible, and built to last.
          </p>
        </motion.div>
      )}
    </div>
  );
}
