import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-50px' });
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
  const [isIlluminated, setIsIlluminated] = useState(false);
  const location = useLocation();

  // Dynamic Professional Engineering Quotes based on current page
  const getFooterQuote = () => {
    const path = location.pathname;
    if (path === '/') return <>Ready to engineer<br/>something monumental?</>;
    if (path.includes('/expertise')) return <>Precision execution.<br/>Absolute integrity.</>;
    if (path.includes('/projects')) return <>Building the foundations<br/>of tomorrow.</>;
    if (path.includes('/gallery')) return <>Visualizing scale.<br/>Mastering perspective.</>;
    if (path.includes('/about')) return <>A legacy built on<br/>structural excellence.</>;
    if (path.includes('/contact')) return <>Initiate a<br/>strategic partnership.</>;
    return <>Advancing global<br/>infrastructure.</>;
  };

  // Generate 40 structural horizontal lines for the interactive text
  const lines = Array.from({ length: 40 });

  return (
    <footer ref={footerRef} className="bg-[#050914] text-white w-full pt-32 relative overflow-hidden flex flex-col mt-auto border-t border-outline-variant/10">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 w-full relative z-10 flex-grow">
        
        {/* Top Section: Giant Headline */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <h2 className="font-h1 text-5xl md:text-7xl lg:text-[96px] leading-[0.9] font-black tracking-tighter mb-8">
              {getFooterQuote()}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link to="/contact" className="group flex items-center gap-4 text-xs font-mono-data tracking-[0.3em] text-[#e9c349] uppercase pb-4 border-b border-[#e9c349]/30 hover:border-[#e9c349] transition-colors duration-300">
              Start A Collaboration
              <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
            </Link>
          </motion.div>
        </div>

        {/* Middle Section: Meta & Links */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-16 mb-16 md:mb-24">
          
          {/* Copyright & Interactive Hint */}
          <div className="flex flex-col gap-6 text-[10px] md:text-xs font-mono-data text-white/50 tracking-widest uppercase">
            <p>© AKE {new Date().getFullYear()}</p>

            
            {/* Realistic Master Ignition Switch */}
            <div className="flex items-center gap-4 mt-2">
              <span className="text-[10px] tracking-[0.3em] font-mono-data text-white/40">SYSTEM OVERRIDE</span>
              <button
                onClick={() => setIsIlluminated(!isIlluminated)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 shadow-inner flex items-center px-1 border ${
                  isIlluminated 
                    ? 'bg-[#e9c349]/10 border-[#e9c349]/50 shadow-[inset_0_0_10px_rgba(233,195,73,0.2)]' 
                    : 'bg-[#0a1124] border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]'
                }`}
              >
                {/* Switch thumb */}
                <motion.div
                  className={`w-4 h-4 rounded-full shadow-md ${
                    isIlluminated 
                      ? 'bg-[#e9c349] shadow-[0_0_12px_rgba(233,195,73,0.9)]' 
                      : 'bg-[#8a95a5] shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                  }`}
                  animate={{ x: isIlluminated ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </div>

          {/* Data Columns */}
          <div className="flex flex-wrap lg:flex-nowrap gap-12 lg:gap-24 text-[10px] md:text-xs font-mono-data tracking-widest uppercase">
            
            <div className="flex flex-col gap-4">
              <span className="text-white/30 mb-2">Business Enquiry</span>
              <a href="mailto:hello@ake.com.pk" className="hover:text-[#e9c349] transition-colors">E. hello@ake.com.pk</a>
              <a href="tel:+923000000000" className="hover:text-[#e9c349] transition-colors">P. +92 300 000 0000</a>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-white/30 mb-2">Legal</span>
              <Link to="/privacy" className="hover:text-[#e9c349] transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-[#e9c349] transition-colors">Terms of Service</Link>
              <Link to="/legal" className="hover:text-[#e9c349] transition-colors">Legal Notice</Link>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-white/30 mb-2">Social</span>
              <div className="flex gap-8 md:gap-12">
                <div className="flex flex-col gap-4">
                  <a href="#" className="hover:text-[#e9c349] transition-colors">LinkedIn</a>
                  <a href="#" className="hover:text-[#e9c349] transition-colors">Twitter</a>
                </div>
                <div className="flex flex-col gap-4">
                  <a href="#" className="hover:text-[#e9c349] transition-colors">Facebook</a>
                  <a href="#" className="hover:text-[#e9c349] transition-colors">Instagram</a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Massive Interactive AKE Lines Masked SVG */}
      <div className="w-full relative h-[150px] sm:h-[250px] md:h-[400px] lg:h-[500px]">
        {/* preserveAspectRatio="none" stretches the SVG text to precisely fill the screen width just like Trionn */}
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 1000 400" 
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 touch-none"
          onTouchStart={(e) => {
            const touch = e.touches[0];
            const rect = e.currentTarget.getBoundingClientRect();
            const y = touch.clientY - rect.top;
            const svgY = (y / rect.height) * 400;
            const lineIndex = Math.round((400 - svgY) / 10);
            if (lineIndex >= 0 && lineIndex < lines.length) setHoveredLine(lineIndex);
          }}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            const rect = e.currentTarget.getBoundingClientRect();
            const y = touch.clientY - rect.top;
            const svgY = (y / rect.height) * 400;
            const lineIndex = Math.round((400 - svgY) / 10);
            if (lineIndex >= 0 && lineIndex < lines.length) setHoveredLine(lineIndex);
          }}
          onTouchEnd={() => setHoveredLine(null)}
        >
          <defs>
            <clipPath id="text-mask">
              <text 
                x="50%" 
                y="102%" 
                dominantBaseline="ideographic" 
                textAnchor="middle" 
                fontSize="480" 
                fontWeight="900" 
                fontFamily="'Inter', system-ui, sans-serif"
                letterSpacing="-0.04em"
              >
                AKE
              </text>
            </clipPath>
          </defs>
          
          <g clipPath="url(#text-mask)">
            {lines.map((_, i) => {
              const yPos = 400 - (i * 10); // 10px spacing between structural lines
              const isHovered = hoveredLine === i;
              
              return (
                <g 
                  key={i}
                  onMouseEnter={() => setHoveredLine(i)}
                  onMouseLeave={() => setHoveredLine(null)}
                  className="cursor-crosshair"
                >
                  {/* Invisible Massive Hitbox - 10px thick to catch fast mouse swipes perfectly */}
                  <line 
                    x1="0" 
                    y1={yPos} 
                    x2="1000" 
                    y2={yPos} 
                    stroke="transparent" 
                    strokeWidth="10" 
                  />
                  {/* Visual Buttery Smooth Animated Line */}
                  <motion.line
                    x1="0"
                    y1={yPos}
                    x2="1000"
                    y2={yPos}
                    animate={{
                      stroke: (isHovered || isIlluminated) ? "#e9c349" : "rgba(255,255,255,0.15)",
                      strokeWidth: (isHovered || isIlluminated) ? 4 : 1.5,
                    }}
                    transition={
                      isIlluminated 
                        ? { duration: 0.4, delay: i * 0.015, ease: "easeOut" } // Staggered ignition cascade!
                        : isHovered 
                          ? { duration: 0.01, ease: "linear" } // Instant snap to gold on hover (zero lag)
                          : { type: "spring", stiffness: 300, damping: 30 } // Smooth settle back down
                    }
                    className="pointer-events-none"
                  />
                </g>
              );
            })}
          </g>
        </svg>
      </div>

    </footer>
  );
};

export default Footer;
