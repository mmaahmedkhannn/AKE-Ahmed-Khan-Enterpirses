import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { projects } from '../data/projects';
import PageTransition from '../components/PageTransition';

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  // Extract all images from projects
  const baseImages = projects.flatMap((project) =>
    project.images.map((img) => ({
      url: img,
      projectTitle: project.title,
      category: project.category,
    }))
  );
  
  // Duplicate the images to fill a massive 24-card cylindrical ring
  const allImages = [...baseImages, ...baseImages, ...baseImages, ...baseImages, ...baseImages].slice(0, 24);

  const containerRef = useRef<HTMLDivElement>(null);
  
  // Map scroll progress to a full 360 degree rotation. 
  // We use a 500vh container so you have 5 full screens of scrolling to spin the wheel.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const rotation = useTransform(scrollYProgress, [0, 1], [0, -360]);

  // The secret to the Trionn look: A massive radius!
  const radius = 2200; 

  return (
    <PageTransition>
      <main className="bg-[#cfd3d8] min-h-screen"> 
        <div ref={containerRef} className="relative h-[500vh] w-full">
          
          {/* The Sticky 3D Viewport */}
          <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center" style={{ perspective: '1200px' }}>
            
            {/* Massive Background Typography exactly like Trionn */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0">
              <div className="relative w-full max-w-screen-2xl mx-auto px-4 md:px-20 flex flex-col">
                <h1 className="text-[14vw] font-black leading-[0.8] tracking-tighter text-[#4a4c4e] text-right md:pr-32">DESIGN IN</h1>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[#4a4c4e] text-xs md:text-sm tracking-widest font-medium z-10 hidden md:block">
                  EXPLORING IDEAS THROUGH<br/>DAILY STRUCTURAL PRACTICE.
                </div>

                <h1 className="text-[15vw] font-black leading-[0.8] tracking-tighter text-[#4a4c4e] text-left md:pl-20 mt-4 md:mt-12">MOTION</h1>
              </div>
            </div>

            {/* TILTED CAMERA RIG: The secret to the arch shape! 
                rotateX(12deg) looks UP at the ring, turning it into an ARCH (edges curve down).
                rotateZ(8deg) tilts it clockwise so the left side is high and right side sweeps low. */}
            <div 
              className="absolute inset-0 flex items-center justify-center z-10"
              style={{ 
                transform: 'rotateZ(8deg) rotateX(12deg)', 
                transformStyle: 'preserve-3d' 
              }}
            >
              {/* The Rotating Cylinder */}
              <motion.div 
                className="relative flex items-center justify-center"
                style={{ 
                  rotateY: rotation, 
                  // We push the entire cylinder back by the radius, so the front-most card is exactly at Z=0 (the screen)
                  z: -radius, 
                  transformStyle: 'preserve-3d' 
                }}
              >
                {allImages.map((img, i) => {
                  const angle = (360 / 24) * i;
                  
                  return (
                    <motion.div
                      key={i}
                      // Massive cards to fit the huge radius
                      className="absolute w-[300px] md:w-[500px] lg:w-[600px] h-[380px] md:h-[650px] lg:h-[750px] cursor-pointer group"
                      style={{
                        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                        transformStyle: 'preserve-3d'
                      }}
                      onClick={() => setSelectedIndex(i)}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {/* The Physical Card */}
                      <div className="w-full h-full bg-white p-3 md:p-5 flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.15)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.3)] transition-all duration-300">
                        <div className="relative flex-grow overflow-hidden mb-4 bg-gray-100">
                          {/* We map the layoutId specifically to the INDEX so the lightbox flies from the exact card you clicked */}
                          <motion.img 
                            layoutId={`gallery-img-${i}`}
                            src={img.url} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            alt={img.projectTitle} 
                          />
                          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                            <span className="material-symbols-outlined text-white text-5xl drop-shadow-lg">zoom_in</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-end mt-auto pt-2">
                          <div className="flex flex-col">
                            <span className="text-[10px] md:text-sm uppercase font-mono tracking-widest text-gray-400 mb-1">{img.category}</span>
                            <h3 className="font-bold text-gray-900 text-sm md:text-2xl leading-none uppercase tracking-tight">{img.projectTitle}</h3>
                          </div>
                          <span className="material-symbols-outlined text-gray-300">arrow_forward</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>

        {/* The Expanding Lightbox (Click to Enlarge) */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[200] bg-[#cfd3d8]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
              onClick={() => setSelectedIndex(null)}
            >
              <button 
                className="absolute top-8 right-8 text-black font-mono uppercase tracking-widest text-xs flex items-center gap-2 hover:text-[#e9c349] transition-colors z-50"
                onClick={() => setSelectedIndex(null)}
              >
                Close <span className="material-symbols-outlined text-black">close</span>
              </button>

              {/* The image smoothly detaches from the 3D ring and flies here! */}
              <motion.img
                layoutId={`gallery-img-${selectedIndex}`}
                src={allImages[selectedIndex].url}
                className="max-w-full max-h-[85vh] object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()} // Clicking the big image doesn't close it
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </PageTransition>
  );
};

export default Gallery;
