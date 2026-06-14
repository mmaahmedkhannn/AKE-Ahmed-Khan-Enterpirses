import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import PageTransition from '../components/PageTransition';
import AnimatedText from '../components/AnimatedText';
import AnimatedCounter from '../components/AnimatedCounter';
import ScrollReveal from '../components/ScrollReveal';
import TextRevealOnScroll from '../components/TextRevealOnScroll';
import SandTextRotator from '../components/SandTextRotator';
import {
  fadeLeft,
  fadeRight,
  staggerContainer,
} from '../lib/animations';

const Home = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <PageTransition>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen lg:min-h-[921px] flex flex-col justify-end px-4 md:px-10 pb-20 max-w-screen-2xl mx-auto border-x border-b border-outline-variant bg-surface-container-lowest overflow-hidden"
      >
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 z-0 p-gutter"
          style={{ y: heroImageY, opacity: heroOpacity }}
        >
          <div className="w-full h-full relative border border-outline-variant overflow-hidden bg-[#0d1b2a]">
            <motion.img
              style={{ scale: heroScale }}
              src="/hero-blueprint.png"
              alt="Architectural blueprint wireframe"
              className="w-full h-full object-cover object-center opacity-90"
            />
          </div>
        </motion.div>

        {/* Floating grid dots decoration (hidden on mobile to reduce clutter) */}
        <motion.div
          className="hidden md:block absolute top-10 right-10 w-32 h-32 opacity-20 z-[1]"
          animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-secondary"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', x: -40, opacity: 0 }}
          animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative z-10 max-w-4xl bg-surface-container-lowest/95 backdrop-blur-md p-8 md:p-12 border border-outline-variant border-l-4 border-l-primary shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
        >
          {/* Animated accent line at top */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
            className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-secondary to-transparent"
          />

          <div className="flex flex-wrap gap-x-3 gap-y-1 mb-8 items-center">
            {["Engineered", "for", "Absolute"].map((word, i) => (
              <div key={i} className="overflow-hidden inline-block pt-2 pb-1">
                <motion.span
                  initial={{ y: "110%", rotate: 8, opacity: 0 }}
                  animate={{ y: 0, rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.6 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block font-h1 text-4xl md:text-6xl lg:text-[76px] leading-[1.05] text-white font-black tracking-tight"
                >
                  {word}
                </motion.span>
              </div>
            ))}
            <div className="inline-block pt-2 pb-1">
              <SandTextRotator
                words={["Precision.", "Excellence.", "Innovation.", "Integrity."]}
                interval={3500}
                delay={0.96}
                className="font-h1 text-4xl md:text-6xl lg:text-[76px] leading-[1.05] text-secondary font-black tracking-tight"
              />
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-body-lg text-xl text-on-surface-variant mb-12 max-w-2xl leading-relaxed"
          >
            Ahmed Khan Enterprises defines the vanguard of global
            infrastructure. We transform complex blueprints into monumental
            realities through uncompromising engineering standards and visionary
            execution.
          </motion.p>

          <div className="flex flex-wrap gap-4 md:gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.04, y: -2 }} 
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/contact"
                className="font-label-caps text-label-caps bg-primary text-on-primary px-8 py-5 uppercase tracking-widest hover:bg-secondary hover:text-on-secondary transition-all w-full md:w-auto text-center inline-block relative overflow-hidden group shadow-lg"
              >
                <span className="relative z-10 font-bold">Initiate Partnership</span>
                <motion.div
                  className="absolute inset-0 bg-secondary"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.04, y: -2 }} 
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/projects"
                className="font-label-caps text-label-caps bg-transparent border-2 border-primary text-white px-8 py-5 uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-3 w-full md:w-auto text-center group font-bold shadow-sm"
              >
                View Technical Portfolio
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform duration-300">
                  arrow_forward
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="font-mono-data text-[10px] text-outline-variant uppercase tracking-widest">
            Scroll to explore
          </span>
          <motion.div
            className="w-5 h-8 border-2 border-outline-variant/50 rounded-full flex justify-center pt-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 bg-secondary rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════ MASSIVE TYPOGRAPHY SCROLL REVEAL ═══════════════════ */}
      <section className="min-h-screen flex items-center justify-center bg-[#050914] px-6 md:px-12 lg:px-24 py-32 relative overflow-hidden">
        <TextRevealOnScroll 
          text="Ahmed Khan Enterprises is an independent engineering firm crafting monumental infrastructure through advanced strategy, precision design, and cutting-edge structural technology."
          className="font-h1 text-4xl md:text-6xl lg:text-[72px] leading-[1.05] max-w-7xl mx-auto font-black tracking-tight"
        />
      </section>

      {/* ═══════════════════ EXPERTISE BENTO GRID ═══════════════════ */}
      <section className="max-w-screen-2xl mx-auto px-4 md:px-10 py-margin">
        <ScrollReveal direction="up" className="flex items-end justify-between mb-12 border-b border-outline-variant pb-6">
          <div>
            <motion.span
              className="font-mono-data text-mono-data text-secondary mb-2 block"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              STRUCTURAL CAPABILITIES
            </motion.span>
            <AnimatedText
              text="Mastery in Execution"
              tag="h2"
              className="font-h2 text-h2 text-white"
            />
          </div>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-12 gap-gutter"
        >
          {/* Large Feature Card */}
          <motion.div
            variants={fadeLeft}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="col-span-1 md:col-span-8 structural-border relative group overflow-hidden h-auto md:h-[600px] flex flex-col md:flex-row"
          >
            {/* Left Side: Dark Architectural Gray */}
            <div className="w-full md:w-1/2 h-full bg-[#0a1124] flex flex-col justify-center p-6 md:p-12 border-b md:border-b-0 md:border-r border-outline-variant">
              <motion.span
                className="font-label-caps text-label-caps text-secondary mb-4 block"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                CORE COMPETENCY 01
              </motion.span>
              <h3 className="font-h3 text-h3 text-white mb-4">
                Commercial Infrastructure
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                Developing hyperscale commercial environments utilizing advanced
                modular frameworks and high-tensile materials for unprecedented
                longevity.
              </p>
            </div>

            {/* Right Side: Golden Frame */}
            <div className="w-full md:w-1/2 h-[400px] md:h-full bg-primary p-6 md:p-10 relative flex items-center justify-center">
              <div className="w-full h-full structural-border border-outline-variant/30 overflow-hidden relative shadow-2xl">
                <div className="absolute inset-0 bg-primary/20 z-10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
                <motion.img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbQrFXPhOJcPqGwKNN22nzYNg37s16-TaWf0Wup-E3CKGeDMgtzeZXFanw53CKdpjXt4quGBZPDFB-uOCBeKEMl3SqKRiBwiGCGLZXhxyC5FcD7GmrfsgJ3oqAz5KbmbtCh1Rs_fYH4AMVraEHGiPq6CteDhrKxpxmdFocshCFJKOk4vI-NxTCjtZmI0Amp0gqrnBSUogKwdaGkc4UEzHBgIO7iMbtkZLwj1IvEzVPK27JVZOlLjH7unVMR9SkT_Y0Kdsql2GteLOf"
                  alt="Construction site"
                  className="w-full h-full object-cover grayscale"
                  whileHover={{ scale: 1.05, filter: 'grayscale(0)' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </motion.div>

          {/* Stats/Data Card */}
          <motion.div
            variants={fadeRight}
            className="col-span-1 md:col-span-4 flex flex-col gap-gutter"
          >
            <motion.div
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,36,64,0.2)' }}
              className="flex-1 bg-[#0a1124] text-white p-6 md:p-10 border border-outline flex flex-col justify-between relative overflow-hidden"
            >
              {/* Animated radial glow */}
              <motion.div
                className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-secondary/10"
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <div className="flex justify-between items-start relative z-10">
                <motion.span
                  className="material-symbols-outlined text-4xl text-secondary-fixed"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
                >
                  domain
                </motion.span>
              </div>
              <div className="relative z-10">
                <div className="font-h1 text-6xl md:text-h1 text-white mb-2">
                  <AnimatedCounter
                    target={150}
                    suffix="+"
                    className="font-h1 text-6xl md:text-h1 text-white"
                    suffixClassName="text-secondary-fixed"
                  />
                </div>
                <div className="font-label-caps text-label-caps text-inverse-primary tracking-widest">
                  Global Mega-Projects
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -6 }}
              className="flex-1 bg-surface-container-low p-8 border border-outline-variant flex flex-col justify-between"
            >
              <h4 className="font-h3 text-2xl md:text-h3 text-white mb-4">
                Precision Engineering
              </h4>
              <ul className="space-y-4 flex-1 font-mono-data text-mono-data text-on-surface-variant">
                {[
                  { label: 'Tolerance Margin', value: '≤ 0.01mm' },
                  { label: 'Safety Standard', value: 'ISO 45001' },
                  { label: 'Material Grade', value: 'Tier 1 Spec' },
                ].map((item, i) => (
                  <ScrollReveal
                    key={item.label}
                    direction="left"
                    delay={0.1 * i}
                    distance={20}
                  >
                    <li className="flex justify-between border-b border-outline-variant/50 pb-2">
                      <span>{item.label}</span>
                      <span className="text-white font-bold">{item.value}</span>
                    </li>
                  </ScrollReveal>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </PageTransition>
  );
};

export default Home;
