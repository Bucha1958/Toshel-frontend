// // components/LightboxGallery.tsx
// "use client";

// import { useState } from "react";
// import Image from "next/image";

// export default function LightboxGallery({ gallery }: { gallery: string[] }) {
//   const [lightboxMedia, setLightboxMedia] = useState<string | null>(null);

//   return (
//     <>
//       <div className="flex gap-4 overflow-x-auto pb-4">
//         {gallery.map((media, index) => {
//           const isVideo = media.endsWith(".mp4");
//           return (
//             <div
//               key={index}
//               className="relative flex-shrink-0 w-[90vw] sm:w-[300px] md:w-[33.3333%] h-[300px] overflow-hidden cursor-pointer"
//               onClick={() => setLightboxMedia(media)}
//             >
//               {isVideo ? (
//                 <video className="w-full h-full object-cover" muted>
//                   <source src={media} type="video/mp4" />
//                 </video>
//               ) : (
//                 <Image
//                   src={media}
//                   alt={`Media ${index}`}
//                   fill
//                   className="object-cover"
//                 />
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Lightbox */}
//       {lightboxMedia && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
//           onClick={() => setLightboxMedia(null)}
//         >
//           <div
//             className="relative w-[90%] max-w-5xl max-h-[90%] bg-black rounded-lg overflow-hidden"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               className="absolute top-2 right-2 text-white text-3xl z-10"
//               onClick={() => setLightboxMedia(null)}
//             >
//               &times;
//             </button>

//             {lightboxMedia.endsWith(".mp4") ? (
//               <video
//                 src={lightboxMedia}
//                 controls
//                 className="w-full h-full object-contain rounded-lg"
//               />
//             ) : (
//               <div className="relative w-full h-[80vh]">
//                 <Image
//                   src={lightboxMedia}
//                   alt="Expanded media"
//                   fill
//                   className="object-contain rounded-lg"
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


"use client";

import { useState } from "react";
import Image from "next/image";

export default function LightboxGallery({ gallery }: { gallery?: string[] }) {
  const [lightboxMedia, setLightboxMedia] = useState<string | null>(null);

  if (!Array.isArray(gallery) || gallery.length === 0) return null;

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {gallery.map((media, index) => {
          const isVideo = media.endsWith(".mp4");
          return (
            <div
              key={index}
              className="relative flex-shrink-0 w-[90vw] sm:w-[300px] md:w-[33.3333%] h-[300px] overflow-hidden cursor-pointer"
              onClick={() => setLightboxMedia(media)}
            >
              {isVideo ? (
                <video className="w-full h-full object-cover" muted>
                  <source src={media} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={media}
                  alt={`Media ${index}`}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightboxMedia && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setLightboxMedia(null)}
        >
          <div
            className="relative w-[90%] max-w-5xl max-h-[90%] bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white text-3xl z-10"
              onClick={() => setLightboxMedia(null)}
            >
              &times;
            </button>

            {lightboxMedia.endsWith(".mp4") ? (
              <video
                src={lightboxMedia}
                controls
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <div className="relative w-full h-[80vh]">
                <Image
                  src={lightboxMedia}
                  alt="Expanded media"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
