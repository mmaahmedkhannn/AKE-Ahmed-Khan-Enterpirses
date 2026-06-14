import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
}

const TextRevealOnScroll = ({ text, className = "" }: TextRevealProps) => {
  const container = useRef<HTMLDivElement>(null);
  
  // Triggers when the top of the element hits 85% of the viewport, 
  // and finishes when the bottom of the element hits 40%
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 85%', 'end 40%']
  });

  const words = text.split(" ");

  return (
    <p ref={container} className={`flex flex-wrap leading-tight ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

const Word = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: number[] }) => {
  // Maps the scroll progress to opacity. 
  // When progress hits the start range, opacity is 0.1. At end range, opacity is 1.
  const opacity = useTransform(progress, range, [0.1, 1]);
  
  // Optional: We also transform color slightly so it literally "glows" into place
  const color = useTransform(progress, range, ['rgba(255,255,255,0)', 'rgba(255,255,255,1)']); 
  
  return (
    <span className="relative mr-[0.25em] mt-[0.1em]">
      {/* The glowing foreground word */}
      <motion.span style={{ opacity, color }} className="relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
        {children}
      </motion.span>
      
      {/* The dark/unlit background word */}
      <span className="absolute left-0 top-0 text-white/10 -z-10">{children}</span>
    </span>
  );
};

export default TextRevealOnScroll;
