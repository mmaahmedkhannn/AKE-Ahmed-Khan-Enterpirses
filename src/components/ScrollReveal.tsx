import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  blur?: boolean;
}

const ScrollReveal = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance = 50,
  once = true,
  blur = true,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-60px' });

  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { y: 0, x: distance },
    right: { y: 0, x: -distance },
    none: { y: 0, x: 0 },
  };

  const { x, y } = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        x,
        y,
        filter: blur ? 'blur(6px)' : 'blur(0px)',
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, x, y, filter: blur ? 'blur(6px)' : 'blur(0px)' }
      }
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
