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
            className="bg-[#050914] relative border-r border-[#e9c349]/10"
            style={{ width: `${100 / COLUMNS}%`, willChange: 'height, transform' }}
          />
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
            className="bg-[#050914] relative border-r border-[#e9c349]/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            style={{ width: `${100 / COLUMNS}%`, willChange: 'height, transform' }}
          />
        ))}
      </div>
    </>
  );
};

export default PageTransition;
