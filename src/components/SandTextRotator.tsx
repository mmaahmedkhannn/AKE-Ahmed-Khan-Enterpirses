import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SandTextRotatorProps {
  words: string[];
  interval?: number;
  className?: string;
  delay?: number;
}

const colors = ['#FFD700', '#DAA520', '#F8E87B', '#B8860B', '#E6C200'];

const ThanosParticles = ({ charIndex }: { charIndex: number }) => {
  // Generate random particles for this character
  const particles = useMemo(() => {
    // Reduced from 45 to 12 to ensure buttery smooth 60fps animation
    // 45 particles * 11 characters = 495 DOM nodes simultaneously animating, which caused severe stuttering.
    return Array.from({ length: 12 }).map(() => {
      // Dust dropping downwards (like falling sand)
      const angle = (Math.random() * 120 + 30) * (Math.PI / 180); // 30 to 150 degrees (downwards)
      const distance = Math.random() * 60 + 20; // Fall distance
      const x = Math.cos(angle) * distance * 1.5; // Wider horizontal spread to compensate for fewer particles
      const y = Math.sin(angle) * distance; // Positive Y is downwards
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      return { 
        x, 
        y, 
        color,
        duration: 0.4 + Math.random() * 0.4, 
        delay: Math.random() * 0.15 + (charIndex * 0.015) 
      };
    });
  }, [charIndex]);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] rounded-full"
          style={{ backgroundColor: p.color, willChange: 'transform, opacity' }}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          exit={{ 
            opacity: [0, 1, 0],
            scale: [0, Math.random() * 1.5 + 0.5, 0],
            x: p.x, 
            y: p.y, 
            transition: {
              duration: p.duration,
              ease: "easeIn",
              delay: p.delay
            }
          }}
        />
      ))}
    </div>
  );
};

const characterVariants: any = {
  initial: {
    opacity: 0,
    y: -10,
  },
  animate: ({ index, delay }: { index: number; delay: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: delay + index * 0.03,
    },
  }),
  exit: ({ index }: { index: number }) => ({
    y: 15,
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeIn",
      delay: index * 0.02,
    },
  }),
};

const SandTextRotator = ({
  words,
  interval = 3500,
  className = '',
  delay = 0.96, // Matches the staggered delay of the 4th word
}: SandTextRotatorProps) => {
  const [index, setIndex] = useState(0);
  const [startRotating, setStartRotating] = useState(false);
  const [currentDelay, setCurrentDelay] = useState(delay);

  useEffect(() => {
    // Start rotation and reset delay after the initial animation completes
    const startTimer = setTimeout(() => {
      setStartRotating(true);
      setCurrentDelay(0); // Subsequent words transition immediately
    }, delay * 1000);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!startRotating) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [startRotating, words, interval]);

  const currentWord = words[index];
  const characters = currentWord.split('');

  return (
    <span className="inline-flex relative" style={{ verticalAlign: 'middle' }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          className={`inline-flex relative ${className}`}
          style={{ display: 'inline-flex' }}
        >
          {characters.map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              className="inline-block relative origin-center"
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              <motion.span
                custom={{ index: i, delay: currentDelay }}
                variants={characterVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ display: 'inline-block', whiteSpace: 'pre' }}
              >
                {char}
              </motion.span>
              {/* Thanos Particles rendered for each character */}
              <ThanosParticles charIndex={i} />
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default SandTextRotator;
