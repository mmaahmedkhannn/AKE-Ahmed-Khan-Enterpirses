import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SandTextRotatorProps {
  words: string[];
  interval?: number;
  className?: string;
  delay?: number;
}

const characterVariants = {
  initial: {
    y: -30,
    opacity: 0,
    rotate: -15,
    scale: 0.7,
  },
  animate: ({ index, delay }: { index: number; delay: number }) => ({
    y: 0,
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 140,
      damping: 14,
      delay: delay + index * 0.045,
    },
  }),
  exit: ({ index }: { index: number }) => {
    const randomAngle = ((index * 7) % 50) - 25; // between -25 and 25 deg
    const randomDrift = ((index * 13) % 40) - 20; // between -20 and 20px
    return {
      y: 50,
      opacity: 0,
      rotate: randomAngle,
      x: randomDrift,
      scale: 0.6,
      transition: {
        duration: 0.5,
        ease: [0.36, 0, 0.66, -0.56] as [number, number, number, number], // Snappy falling acceleration
        delay: index * 0.02,
      },
    };
  },
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
          className={`inline-flex ${className}`}
          style={{ display: 'inline-flex' }}
        >
          {characters.map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              custom={{ index: i, delay: currentDelay }}
              variants={characterVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="inline-block origin-center"
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default SandTextRotator;
