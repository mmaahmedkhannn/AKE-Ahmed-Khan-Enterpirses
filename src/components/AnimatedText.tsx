import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  splitBy?: 'word' | 'char';
}

const AnimatedText = ({
  text,
  className = '',
  tag = 'h1',
  delay = 0,
  splitBy = 'word',
}: AnimatedTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const MotionTag = motion[tag] as typeof motion.h1;
  const items = splitBy === 'word' ? text.split(' ') : text.split('');

  return (
    <MotionTag ref={ref} className={className} aria-label={text}>
      {items.map((item, i) => (
        <motion.span
          key={`${item}-${i}`}
          className="inline-block overflow-hidden"
          style={{ marginRight: splitBy === 'word' ? '0.25em' : '0' }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0, rotateX: -80 }}
            animate={
              isInView
                ? { y: '0%', opacity: 1, rotateX: 0 }
                : { y: '110%', opacity: 0, rotateX: -80 }
            }
            transition={{
              duration: 0.6,
              delay: delay + i * (splitBy === 'word' ? 0.08 : 0.025),
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {item}
          </motion.span>
        </motion.span>
      ))}
    </MotionTag>
  );
};

export default AnimatedText;
