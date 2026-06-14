import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import PageTransition from '../components/PageTransition';
import AnimatedText from '../components/AnimatedText';
import AnimatedCounter from '../components/AnimatedCounter';
import ScrollReveal from '../components/ScrollReveal';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, lineGrow } from '../lib/animations';

const About = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: statsRef,
    offset: ['start end', 'end start'],
  });
  const statsY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <PageTransition>
      <main className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-10 max-w-screen-2xl mx-auto min-h-screen">
        {/* Header Section */}
        <header className="mb-16 border-b border-outline-variant/50 pb-8 relative overflow-hidden">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p variants={fadeUp} className="font-mono-data text-mono-data text-outline mb-2 uppercase">
              CORPORATE OVERVIEW
            </motion.p>
            <AnimatedText
              text="About AKE"
              tag="h1"
              className="font-h1 text-4xl md:text-h1 text-white"
            />
          </motion.div>

          {/* Animated underline */}
          <motion.div
            variants={lineGrow}
            initial="hidden"
            animate="visible"
            className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-secondary to-transparent"
          />
        </header>

        {/* Content Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-12 gap-gutter"
        >
          {/* Main Content */}
          <motion.div variants={fadeLeft} className="col-span-1 md:col-span-8 space-y-8">
            <ScrollReveal direction="up">
              <div className="bg-surface p-8 md:p-12 border border-outline-variant/50 relative overflow-hidden group">
                {/* Animated corner accent */}
                <motion.div
                  className="absolute top-0 left-0 w-16 h-16"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary" />
                  <div className="absolute top-0 left-0 h-full w-[2px] bg-secondary" />
                </motion.div>

                <h2 className="font-h2 text-3xl md:text-h2 text-white mb-6">Owner's Message</h2>
                <div className="space-y-6">
                  <div className="relative border-l-4 border-secondary pl-6 py-2">
                    <p className="font-body-lg text-body-lg text-on-surface-variant italic mb-4">
                      "At Ahmed Khan Enterprises, our legacy is built on a foundation of trust, integrity, and engineering mastery. For over a decade, we have dedicated ourselves to transforming complex blueprints into monumental realities, setting the highest benchmarks in quality and precision for Pakistan's infrastructure. Every project we deliver is a testament to our relentless pursuit of excellence and our commitment to national progress."
                    </p>
                    <cite className="font-mono-data text-mono-data text-white not-italic block font-bold">
                      — Abdul Malik Khan
                      <span className="text-on-surface-variant font-normal block text-xs tracking-wider uppercase mt-1">Owner & Managing Director, Ahmed Khan Enterprises</span>
                    </cite>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Under the visionary leadership of our founder and management, AKE has grown into a premier contracting firm. Our methodology seamlessly blends advanced structural engineering with stringent project management protocols, ensuring that every venture is executed to absolute perfection.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <ScrollReveal direction="up" delay={0.1}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,36,64,0.3)' }}
                  className="bg-primary text-on-primary p-8 border border-primary-container relative overflow-hidden"
                >
                  {/* Animated glow pulse */}
                  <motion.div
                    className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-secondary/10"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.span
                    className="material-symbols-outlined text-4xl text-secondary-container mb-4"
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 6, repeat: Infinity, repeatDelay: 3 }}
                  >
                    visibility
                  </motion.span>
                  <h3 className="font-h3 text-2xl mb-4 relative z-10">Our Vision</h3>
                  <p className="font-body-md text-body-md text-inverse-primary relative z-10">
                    To be the absolute vanguard of global infrastructure, setting the highest benchmarks in engineering innovation,
                    structural integrity, and sustainable development.
                  </p>
                </motion.div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.2}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-surface-container-low p-8 border border-outline-variant/50 relative overflow-hidden"
                >
                  <motion.span
                    className="material-symbols-outlined text-4xl text-white mb-4"
                    animate={{ rotateZ: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
                  >
                    flag
                  </motion.span>
                  <h3 className="font-h3 text-2xl text-white mb-4">Our Mission</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    To transform complex blueprints into monumental realities through uncompromising engineering standards,
                    visionary execution, and a relentless pursuit of excellence.
                  </p>
                </motion.div>
              </ScrollReveal>
            </div>
          </motion.div>

          {/* Sidebar Metrics */}
          <motion.div ref={statsRef} variants={fadeRight} className="col-span-1 md:col-span-4 flex flex-col gap-6">
            <motion.div style={{ y: statsY }}>
              <ScrollReveal direction="right" delay={0.2}>
                <div className="bg-surface border border-outline-variant/50 p-8 flex flex-col">
                  <h3 className="font-label-caps text-label-caps text-outline uppercase mb-6">Core Statistics</h3>

                  {[
                    { label: 'Years of Experience', value: 15, suffix: '+' },
                    { label: 'Projects Delivered', value: 200, suffix: '+' },
                    { label: 'Active Operations', value: 12, suffix: '' },
                  ].map((stat, i) => (
                    <div key={stat.label} className={`flex justify-between items-end ${i < 2 ? 'border-b border-outline-variant/50 pb-4 mb-4' : 'pb-2'}`}>
                      <motion.span
                        className="font-body-md text-body-md text-on-surface-variant"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.15 }}
                      >
                        {stat.label}
                      </motion.span>
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                        className="font-h3 text-3xl text-white"
                        suffixClassName="text-secondary"
                      />
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.4} className="mt-6">
                <div className="bg-surface-container-highest p-8 border border-outline-variant/50">
                  <h3 className="font-label-caps text-label-caps text-white uppercase mb-4">Our Core Focus</h3>
                  <ul className="space-y-3 font-mono-data text-mono-data text-on-surface-variant">
                    {[
                      'Commitment to Quality',
                      'Workplace Safety & Ethics',
                      'Continuous Improvement',
                    ].map((focus, i) => (
                      <motion.li
                        key={focus}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <motion.span
                          className="material-symbols-outlined text-secondary text-sm"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        >
                          check_circle
                        </motion.span>
                        {focus}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>
    </PageTransition>
  );
};

export default About;
