import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import { fadeUp, staggerContainer } from '../lib/animations';

const Services = () => {
  return (
    <PageTransition>
      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section className="max-w-screen-2xl mx-auto px-4 md:px-10 pt-24 pb-16 md:py-32 structural-border border-t-0 border-b relative overflow-hidden bg-surface-lowest">
        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, var(--color-primary) 0, var(--color-primary) 1px, transparent 0, transparent 50%)',
            backgroundSize: '40px 40px',
          }}
          animate={{ x: [0, 40] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-12 gap-gutter relative z-10"
        >
          <div className="col-span-12 md:col-span-8">
            <AnimatedText
              text="Engineering Mastery."
              tag="h1"
              className="font-h1 text-4xl md:text-h1 text-white mb-6"
            />
            <motion.p
              variants={fadeUp}
              className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl"
            >
              Uncompromising precision across all types of infrastructure. From
              massive bridges and specialized schools to high-rise buildings, we
              construct the foundations of tomorrow with structural integrity and
              innovative methodologies.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════ SERVICES BENTO GRID ═══════════════════ */}
      <section className="max-w-screen-2xl mx-auto px-4 md:px-10 py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-12 gap-gutter"
        >
          {/* Infrastructure Card */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="col-span-12 structural-border overflow-hidden grid grid-cols-1 md:grid-cols-2 group"
          >
            {/* Left Side: Dark Architectural Gray */}
            <div className="bg-[#0a1124] p-8 md:p-12 lg:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-outline-variant">
              <motion.span
                className="material-symbols-outlined text-4xl text-white mb-6"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                architecture
              </motion.span>
              <h3 className="font-h3 text-2xl md:text-h3 text-white mb-4">
                Infrastructure Development
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">
                Large-scale civil engineering projects demanding rigorous planning
                and execution. Bridges, highways, and transit systems designed for
                centuries of service.
              </p>
            </div>

            {/* Right Side: Golden Frame */}
            <div className="bg-primary p-6 md:p-10 lg:p-12 relative flex items-center justify-center">
              <div className="w-full h-64 md:h-80 lg:h-96 structural-border border-outline-variant/30 overflow-hidden relative shadow-2xl">
                <div className="absolute inset-0 bg-primary/20 z-10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
                <motion.img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIfQ37zmOEwlep7KX6fVHyi57NDIS3RlydTP8GPEdgkvdDb5XKpi-tWJJlHlwFsN6wEXRCL67yXOuOygyxz7ejNpqpTRfGnMMTrQ-fRoZtFZQnQasVuoXicZz3ormSqFY_JUxIrQ3SxeWmbrYIeEoe_G333BH6n-v9HSVGLIRIIxXbIAS4LSL-VeNwXcqt5_FYNe-Pkv8PiHQZ4c6g_IRKFzcEODn6t_Fa5__xPTyU4c88t1bBvapHqYRV2NCfrGMeh78D6Je5pglV"
                  alt="Infrastructure Project"
                  className="w-full h-full object-cover grayscale"
                  whileHover={{ scale: 1.05, filter: 'grayscale(0)' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </motion.div>

          {/* Commercial Card */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="col-span-12 structural-border mt-gutter overflow-hidden grid grid-cols-1 md:grid-cols-2 group"
          >
            {/* Left Side: Dark Architectural Gray */}
            <div className="bg-[#0a1124] p-8 md:p-12 lg:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-outline-variant">
              <motion.span
                className="material-symbols-outlined text-4xl text-white mb-6"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                domain
              </motion.span>
              <h3 className="font-h3 text-2xl md:text-h3 text-white mb-4">
                Commercial Structures
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">
                High-rise towers and expansive corporate campuses.
                Precision-engineered for optimal spatial efficiency,
                sustainability, and architectural prominence.
              </p>
            </div>

            {/* Right Side: Golden Background with Checkmarks */}
            <div className="bg-primary p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <ul className="space-y-6 font-body-md text-body-md text-[#050914]">
                {[
                  'Structural Steel Frameworks',
                  'High-Density Foundations',
                  'Seismic Reinforcement',
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-4 text-xl font-bold"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.span
                      className="material-symbols-outlined text-white text-3xl drop-shadow-md"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.12, type: 'spring', stiffness: 400 }}
                    >
                      check_circle
                    </motion.span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Industrial Card */}
          <motion.div
            variants={fadeUp}
            className="col-span-12 structural-border mt-gutter overflow-hidden grid grid-cols-1 md:grid-cols-2"
          >
            {/* Left Side: Dark Architectural Gray */}
            <div className="bg-[#0a1124] text-white p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
              {/* Animated scan line just for the dark side */}
              <motion.div
                className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/40 to-transparent pointer-events-none"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
              
              <motion.span
                className="material-symbols-outlined text-4xl text-secondary mb-6"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                factory
              </motion.span>
              <h3 className="font-h3 text-2xl md:text-h3 mb-4 text-white">
                Industrial Facilities
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">
                Specialized construction for manufacturing, energy, and
                logistics sectors. Heavy-duty specifications meeting the most
                stringent operational tolerances and safety protocols.
              </p>
            </div>

            {/* Right Side: Golden Frame */}
            <div className="bg-primary p-6 md:p-10 lg:p-12 relative flex items-center justify-center">
              <div className="w-full h-64 md:h-80 lg:h-96 structural-border border-outline-variant/30 overflow-hidden relative group shadow-2xl">
                <div className="absolute inset-0 bg-primary/20 z-10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
                <motion.img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvM4b2-JLrN1BHm3wQuYQzrB-XfbB1Iwr70jKZ_EDVpKjHGH_3qArzsxJtFvbTnE-8pM3qGZykoYeqpcP54aFsau_qbR79iNmJmUhPUt_3MCV_VMxwE-WzwjpNRTugKYNg6nL4gbokTebFz9L5En04ij-Yp-zZVrleDvlT6Ih9mbuhXGMWFj0WNfguh1poSURPPPj7hKf7IKksOJiCWO42ug9b3JkHx_BZTiNZDxq-uVRaOJ6Rj885grfwRH0yUPiOdMvVLhLnZ-UC"
                  alt="Industrial Facility"
                  className="w-full h-full object-cover grayscale"
                  whileHover={{ scale: 1.05, filter: 'grayscale(0)' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════ TECHNICAL METHODOLOGIES ═══════════════════ */}
      <section className="border-t border-outline-variant bg-surface-lowest">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-10 py-16 md:py-24">
          <ScrollReveal direction="up">
            <AnimatedText
              text="Technical Methodologies"
              tag="h2"
              className="font-h2 text-3xl md:text-h2 text-white mb-16 text-center"
            />
          </ScrollReveal>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-0 structural-border border-b-0 border-r-0 md:border-b-0"
          >
            {[
              {
                icon: 'precision_manufacturing',
                title: 'Advanced BIM Modeling',
                desc: 'Clash detection and 4D scheduling ensuring zero-tolerance alignment before breaking ground.',
              },
              {
                icon: 'layers',
                title: 'Material Science',
                desc: 'Utilization of ultra-high-performance concrete and advanced composites for extended structural lifespan.',
              },
              {
                icon: 'query_stats',
                title: 'Structural Analysis',
                desc: 'Rigorous computational testing for wind load, seismic activity, and progressive collapse prevention.',
              },
            ].map((method, i) => (
              <motion.div
                key={method.title}
                variants={fadeUp}
                whileHover={{
                  backgroundColor: 'var(--color-surface-container-low)',
                  y: -4,
                }}
                className="p-8 structural-border border-t-0 border-l-0 bg-surface transition-colors relative group"
              >
                {/* Animated top line on hover */}
                <motion.div
                  className="absolute top-0 left-0 h-[3px] bg-secondary"
                  initial={{ width: '0%' }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.4 }}
                />

                <motion.span
                  className="material-symbols-outlined text-3xl text-secondary mb-4"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.3 + i * 0.15,
                    type: 'spring',
                    stiffness: 300,
                  }}
                >
                  {method.icon}
                </motion.span>
                <h4 className="font-label-caps text-label-caps text-white mb-2 uppercase">
                  {method.title}
                </h4>
                <p className="font-mono-data text-mono-data text-on-surface-variant">
                  {method.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Services;
