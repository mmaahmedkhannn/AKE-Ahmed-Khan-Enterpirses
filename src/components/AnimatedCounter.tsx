import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  className?: string;
  suffixClassName?: string;
}

const Digit = ({ value, delay }: { value: string; delay: number }) => {
  const targetNum = Number(value);
  const sequence = [];
  
  // Create a long strip of numbers to force it to spin multiple times like a slot machine
  const spinCount = 3;
  for (let i = 0; i < spinCount; i++) {
    for (let j = 0; j < 10; j++) {
      sequence.push(j);
    }
  }
  // Add the final numbers leading up to the target
  for (let j = 0; j <= targetNum; j++) {
    sequence.push(j);
  }

  const totalItems = sequence.length;
  // Calculate exact percentage shift to land on the last item
  const yShift = -((totalItems - 1) / totalItems) * 100;

  return (
    <span 
      className="relative inline-flex overflow-hidden tabular-nums font-bold" 
      style={{ height: '1em', lineHeight: '1em' }}
    >
      <motion.div
        initial={{ y: '0%', filter: 'blur(3px)' }}
        animate={{ y: `${yShift}%`, filter: 'blur(0px)' }}
        transition={{ 
          y: { duration: 2.8, delay, ease: [0.16, 1, 0.3, 1] },
          filter: { duration: 2.2, delay: delay + 0.6, ease: 'easeOut' }
        }}
        className="flex flex-col"
      >
        {sequence.map((num, idx) => (
          <span key={idx} className="block" style={{ height: '1em' }}>
            {num}
          </span>
        ))}
      </motion.div>
    </span>
  );
};

const AnimatedCounter = ({
  target,
  suffix = '',
  className = '',
  suffixClassName = '',
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const targetStr = target.toString();

  return (
    <span ref={ref} className={`inline-flex items-end ${className}`}>
      {isInView && targetStr.split('').map((char, i) => {
        if (isNaN(Number(char))) {
          return <span key={i} className="inline-block" style={{ height: '1em', lineHeight: '1em' }}>{char}</span>;
        }
        // Stagger the roll of each digit from left to right
        return <Digit key={i} value={char} delay={i * 0.15} />;
      })}
      
      {suffix && (
        <motion.span 
          initial={{ opacity: 0, scale: 0.5, filter: 'blur(5px)' }} 
          animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}} 
          transition={{ 
            delay: (targetStr.length * 0.15) + 1.2, 
            type: 'spring', 
            stiffness: 200, 
            damping: 15 
          }}
          className={`ml-1 ${suffixClassName}`}
        >
          {suffix}
        </motion.span>
      )}
    </span>
  );
};

export default AnimatedCounter;
