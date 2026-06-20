import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const COLUMNS = 5;

// The pillars that slam down from the top to COVER the screen on exit
const exitVariants = {
  initial: { top: 0, height: "0%" },
  animate: { top: 0, height: "0%", transition: { duration: 0 } },
  exit: (i: number) => ({
    height: "100%",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: i * 0.05, // Stagger from left to right
    }
  })
};

// The pillars that retract to the bottom to REVEAL the screen on enter
const enterVariants = {
  initial: { bottom: 0, height: "100%" },
  animate: (i: number) => ({
    height: "0%",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: i * 0.05, // Stagger from left to right
    }
  }),
  exit: { bottom: 0, height: "0%", transition: { duration: 0 } }
};

const letterExitVariants = {
  initial: { 
    opacity: 0, 
    y: 100, 
    rotateX: -80, 
    scale: 0.5,
    filter: 'blur(20px)'
  },
  animate: { opacity: 0, transition: { duration: 0 } },
  exit: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 120,
      delay: i * 0.08 + 0.15,
    }
  })
};

const letterEnterVariants = {
  initial: { opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' },
  animate: (i: number) => ({
    opacity: 0,
    y: -100,
    rotateX: 80,
    scale: 1.5,
    filter: 'blur(20px)',
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 120,
      delay: i * 0.05,
    }
  }),
  exit: { opacity: 1, transition: { duration: 0 } }
};

const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* Page Content Animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>

      {/* The Column Cover Wipe (Activates on EXIT, sweeping DOWN from Top) */}
      <div className="fixed inset-0 w-full h-full z-[100] pointer-events-none flex">
        {[...Array(COLUMNS)].map((_, i) => (
          <motion.div
            key={`exit-${i}`}
            custom={i}
            variants={exitVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-[#050914] relative border-r border-[#e9c349]/10 overflow-hidden"
            style={{ width: `${100 / COLUMNS}%`, willChange: 'height, transform' }}
          >
            {/* Display A K E in the middle 3 pillars */}
            {i >= 1 && i <= 3 && (
              <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center" style={{ perspective: '1200px' }}>
                <motion.span 
                  variants={letterExitVariants}
                  className="text-[#e9c349] font-black text-8xl md:text-[160px] tracking-tighter uppercase drop-shadow-[0_0_40px_rgba(233,195,73,0.5)]" 
                  style={{ fontFamily: "'Inter', sans-serif", willChange: 'transform, opacity, filter', transformStyle: 'preserve-3d' }}
                >
                  {['A', 'K', 'E'][i - 1]}
                </motion.span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* The Column Reveal Wipe (Activates on ENTER, retracting DOWN to Bottom) */}
      <div className="fixed inset-0 w-full h-full z-[100] pointer-events-none flex">
        {[...Array(COLUMNS)].map((_, i) => (
          <motion.div
            key={`enter-${i}`}
            custom={i}
            variants={enterVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-[#050914] relative border-r border-[#e9c349]/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
            style={{ width: `${100 / COLUMNS}%`, willChange: 'height, transform' }}
          >
            {/* Display A K E in the middle 3 pillars */}
            {i >= 1 && i <= 3 && (
              <div className="absolute bottom-0 left-0 w-full h-screen flex items-center justify-center" style={{ perspective: '1200px' }}>
                <motion.span 
                  variants={letterEnterVariants}
                  className="text-[#e9c349] font-black text-8xl md:text-[160px] tracking-tighter uppercase drop-shadow-[0_0_40px_rgba(233,195,73,0.5)]" 
                  style={{ fontFamily: "'Inter', sans-serif", willChange: 'transform, opacity, filter', transformStyle: 'preserve-3d' }}
                >
                  {['A', 'K', 'E'][i - 1]}
                </motion.span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default PageTransition;
