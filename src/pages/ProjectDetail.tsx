import { useParams, Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { projects } from '../data/projects';
import PageTransition from '../components/PageTransition';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import { fadeUp, staggerContainer, lineGrow } from '../lib/animations';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  const progressRef = useRef<HTMLDivElement>(null);
  const progressInView = useInView(progressRef, { once: true, margin: '-50px' });

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-surface-container-lowest pt-24 text-on-surface">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-h2 text-h2 text-white mb-4"
        >
          Project Not Found
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-body-md text-body-md text-on-surface-variant mb-8"
        >
          The specified technical record could not be located.
        </motion.p>
        <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/projects"
            className="bg-primary text-on-primary px-8 py-3 font-label-caps text-label-caps uppercase tracking-widest hover:bg-secondary transition-colors"
          >
            Return to Portfolio
          </Link>
        </motion.div>
      </div>
    );
  }

  const progress =
    project.status === 'Completed'
      ? 100
      : project.status === 'Ongoing'
        ? 68.4
        : 12.5;

  return (
    <PageTransition>
      <main className="flex-grow pt-24 md:pt-28 pb-16 md:pb-20 px-4 md:px-10 max-w-screen-2xl mx-auto w-full flex flex-col gap-8 min-h-screen">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant/50 pb-8 relative overflow-hidden">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p
              variants={fadeUp}
              className="font-mono-data text-mono-data text-outline mb-2 uppercase"
            >
              PRJ-{project.id.substring(0, 8)} // {project.category}
            </motion.p>
            <AnimatedText
              text={project.title}
              tag="h1"
              className="font-h1 text-4xl md:text-h1 text-white"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="flex items-center gap-4 bg-surface px-6 py-4 border border-outline-variant/50 w-full md:w-auto"
          >
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-outline uppercase">
                Overall Progress
              </span>
              <span className="font-h3 text-h3 text-white">{progress}%</span>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-surface-variant flex items-center justify-center relative shrink-0">
              <svg
                className="absolute inset-0 w-full h-full transform -rotate-90"
                viewBox="0 0 36 36"
              >
                <motion.path
                  className="text-secondary-container"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  initial={{ strokeDasharray: '0, 100' }}
                  animate={{ strokeDasharray: `${progress}, 100` }}
                  transition={{ duration: 1.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </svg>
            </div>
          </motion.div>

          {/* Animated underline */}
          <motion.div
            variants={lineGrow}
            initial="hidden"
            animate="visible"
            className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-secondary to-transparent"
          />
        </header>

        {/* Project Description */}
        <ScrollReveal direction="up" delay={0.2}>
          <motion.section className="bg-surface border border-outline-variant/50 p-8 flex flex-col gap-4 relative overflow-hidden">
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-12 h-12">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary" />
              <div className="absolute top-0 left-0 h-full w-[2px] bg-secondary" />
            </div>

            <h2 className="font-h3 text-h3 text-white">Technical Overview</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl">
              {project.fullDescription}
            </p>
          </motion.section>
        </ScrollReveal>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Phase Trajectory (Main) */}
          <ScrollReveal
            direction="left"
            delay={0.3}
            className="lg:col-span-8"
          >
            <motion.section
              ref={progressRef}
              className="bg-surface border border-outline-variant/50 p-6 md:p-8 flex flex-col gap-6 h-full"
            >
              <div className="flex justify-between items-center border-b border-outline-variant/50 pb-4">
                <h2 className="font-h3 text-2xl md:text-h3 text-white">
                  Phase Trajectory
                </h2>
                <motion.button
                  whileHover={{ x: 4 }}
                  className="font-label-caps text-label-caps text-secondary flex items-center gap-2 uppercase"
                >
                  View Detailed Gantt{' '}
                  <motion.span
                    className="material-symbols-outlined text-sm"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    arrow_forward
                  </motion.span>
                </motion.button>
              </div>

              <div className="flex flex-col gap-6">
                {[
                  {
                    name: '01. Foundation & Substructure',
                    pct: Math.min(100, progress * 4),
                    color: 'bg-primary',
                    status:
                      progress >= 25
                        ? '100% Complete'
                        : `${progress * 4}% Active`,
                  },
                  {
                    name: '02. Superstructure Erecting',
                    pct: progress >= 60 ? 100 : progress > 25 ? 85 : 0,
                    color: 'bg-secondary-container',
                    status:
                      progress >= 60
                        ? '100% Complete'
                        : progress > 25
                          ? '85% Active'
                          : '0% Pending',
                  },
                  {
                    name: '03. Envelope & Facade',
                    pct: progress >= 90 ? 100 : progress > 60 ? 40 : 0,
                    color: 'bg-secondary-container',
                    status:
                      progress >= 90
                        ? '100% Complete'
                        : progress > 60
                          ? '40% Active'
                          : '0% Pending',
                  },
                  {
                    name: '04. MEP Rough-in',
                    pct: progress === 100 ? 100 : 0,
                    color: 'bg-surface-tint',
                    status:
                      progress === 100 ? '100% Complete' : '0% Pending',
                  },
                ].map((phase, i) => (
                  <div key={phase.name} className="flex flex-col gap-2">
                    <motion.div
                      className="flex justify-between items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={progressInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.12 }}
                    >
                      <span className="font-mono-data text-mono-data text-white">
                        {phase.name}
                      </span>
                      <span className="font-mono-data text-mono-data text-outline">
                        {phase.status}
                      </span>
                    </motion.div>
                    <div className="w-full bg-surface-variant h-2 relative overflow-hidden rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={
                          progressInView
                            ? { width: `${phase.pct}%` }
                            : { width: 0 }
                        }
                        transition={{
                          duration: 1.2,
                          delay: 0.5 + i * 0.2,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`absolute top-0 left-0 h-full ${phase.color} rounded-full`}
                      />
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={
                          progressInView
                            ? { x: ['-80px', '500px'] }
                            : {}
                        }
                        transition={{
                          duration: 2,
                          delay: 1.5 + i * 0.2,
                          repeat: 1,
                          ease: 'easeInOut',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </ScrollReveal>

          {/* Key Metrics (Sidebar) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Milestone Next */}
            <ScrollReveal direction="right" delay={0.4}>
              <motion.div
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,36,64,0.25)' }}
                className="bg-primary text-on-primary border border-primary p-8 flex flex-col gap-4 relative overflow-hidden"
              >
                {/* Animated pulse glow */}
                <motion.div
                  className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-secondary/10"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <motion.div
                  className="absolute top-0 right-0 p-4 font-mono-data text-mono-data opacity-50"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  T-14 DAYS
                </motion.div>
                <h3 className="font-label-caps text-label-caps text-secondary-container uppercase relative z-10">
                  Next Major Milestone
                </h3>
                <p className="font-h2 text-3xl md:text-h2 leading-tight relative z-10">
                  {progress === 100
                    ? 'Project Handover'
                    : 'Topping Out Ceremony'}
                </p>
                <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-center font-mono-data text-mono-data relative z-10">
                  <span>Target: {project.date || 'Q4 2024'}</span>
                  <motion.span
                    className="material-symbols-outlined"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    event
                  </motion.span>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Weather/Conditions */}
            <ScrollReveal direction="right" delay={0.5}>
              <div className="bg-surface border border-outline-variant/50 p-6 flex flex-col gap-4">
                <h3 className="font-label-caps text-label-caps text-outline uppercase">
                  Site Conditions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.span
                      className="material-symbols-outlined text-outline mb-1"
                      animate={{ rotateZ: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    >
                      thermostat
                    </motion.span>
                    <span className="font-h3 text-2xl md:text-h3 text-white">
                      72°F
                    </span>
                    <span className="font-mono-data text-mono-data text-outline">
                      Clear
                    </span>
                  </motion.div>
                  <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                  >
                    <motion.span
                      className="material-symbols-outlined text-outline mb-1"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      location_on
                    </motion.span>
                    <span className="font-h3 text-xl md:text-2xl text-white mt-1 line-clamp-1">
                      {project.location}
                    </span>
                    <span className="font-mono-data text-mono-data text-outline mt-1">
                      Location
                    </span>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Site Logs & Media */}
        <ScrollReveal direction="up" delay={0.2} className="mt-8">
          <div className="flex justify-between items-center border-b border-outline-variant/50 pb-4 mb-6">
            <AnimatedText
              text="Site Visuals"
              tag="h2"
              className="font-h3 text-2xl md:text-h3 text-white"
            />
            <motion.div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 border border-outline-variant/50 bg-surface"
              >
                <span className="material-symbols-outlined text-white">
                  grid_view
                </span>
              </motion.button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.images.map((img, idx) => (
              <motion.div
                key={idx}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.1 * idx,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -8 }}
              >
                <div className="relative h-64 overflow-hidden border border-outline-variant/50 mb-4 bg-surface-container">
                  <motion.img
                    src={img}
                    alt={`${project.title} - view ${idx + 1}`}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.div
                    className="absolute top-2 right-2 bg-black/70 text-white font-mono-data text-mono-data px-2 py-1 text-xs"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                  >
                    LOG_84{idx}
                  </motion.div>

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-primary/50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span
                      className="material-symbols-outlined text-white text-3xl"
                      initial={{ scale: 0.5 }}
                      whileHover={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      zoom_in
                    </motion.span>
                  </motion.div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono-data text-mono-data text-outline">
                    Visual Record {idx + 1}
                  </span>
                  <h4 className="font-body-lg text-body-lg text-white font-semibold">
                    Architectural Capture
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                    Visual documentation of {project.title} infrastructure and
                    design elements.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </main>
    </PageTransition>
  );
};

export default ProjectDetail;
