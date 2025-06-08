// "use client";


// import Image from "next/image";
// import { useState, useEffect } from "react";

// const images = [
//   { src: "/site-one.png", alt: "Site One" },
//   { src: "/site-two.jpg", alt: "Site Two" },
// ];

// export default function Hero() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative flex items-center justify-center min-h-screen px-6 text-white overflow-hidden">
//       {/* Background Images using next/image */}
//       {images.map((img, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-1000 ${
//             currentIndex === index ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <Image
//             src={img.src}
//             alt={img.alt}
//             fill
//             className="object-cover"
//             priority={index === 0}
//             sizes="100vw"
//           />
//         </div>
//       ))}

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/50 z-0" />

//       {/* Content */}
//       <div className="w-full max-w-6xl py-16 text-center relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-lg">
//         <h1 className="text-4xl md:text-6xl font-bold leading-tight">
//           Building Your Dreams, <br className="hidden md:block" />
//           One Project at a Time
//         </h1>
//         <p className="mt-4 text-lg md:text-xl">
//           Quality construction services for residential, commercial, Roads and industrial projects.
//         </p>
//         <a href="#contact" className="cursor-pointer">
//           <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
//             Get a Free Quote
//           </button>
//         </a>
//       </div>

//       {/* Image Indicators */}
//       <div className="absolute bottom-10 flex space-x-2 z-10">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             className={`w-4 h-4 rounded-full transition-all duration-300 ${
//               currentIndex === index ? "bg-white" : "bg-gray-400"
//             }`}
//             onClick={() => setCurrentIndex(index)}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }


"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const images = [
  { src: "/site-one.png", alt: "Site One" },
  { src: "/site-two.jpg", alt: "Site Two" },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<number[]>([]); // Track loaded indices
  const [fullyLoaded, setFullyLoaded] = useState(false);

  // Preload all images before showing transitions
  useEffect(() => {
    let loadedCount = 0;
    images.forEach((img, idx) => {
      const image = new window.Image();
      image.src = img.src;
      image.onload = () => {
        loadedCount++;
        setLoadedImages((prev) => [...prev, idx]);
        if (loadedCount === images.length) {
          setFullyLoaded(true);
        }
      };
    });
  }, []);

  useEffect(() => {
    if (!fullyLoaded) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [fullyLoaded]);

  if (!fullyLoaded) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="relative flex items-center justify-center min-h-screen px-6 text-white overflow-hidden">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentIndex === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="w-full max-w-6xl py-16 text-center relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-lg">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Building Your Dreams, <br className="hidden md:block" />
          One Project at a Time
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Quality construction services for residential, commercial, Roads and industrial projects.
        </p>
        <a href="#contact" className="cursor-pointer">
          <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
            Get a Free Quote
          </button>
        </a>
      </div>

      <div className="absolute bottom-10 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
