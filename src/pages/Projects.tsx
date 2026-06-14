import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import PageTransition from '../components/PageTransition';
import AnimatedText from '../components/AnimatedText';


const Projects = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['ALL PROJECTS', 'COMMERCIAL', 'GOVERNMENT', 'INDUSTRIAL'];

  const filteredProjects = projects.filter((project) => {
    if (filter === 'ALL PROJECTS' || filter === 'All') return true;
    return (
      project.category.toUpperCase().includes(filter) ||
      filter.includes(project.category.toUpperCase())
    );
  });

  return (
    <PageTransition>
      <main className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-10 max-w-screen-2xl mx-auto min-h-screen">
        {/* Header Section */}
        <header className="mb-16">
          <AnimatedText
            text="Selected Works"
            tag="h1"
            className="font-h1 text-4xl md:text-h1 text-on-surface mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl"
          >
            A curated portfolio of engineering mastery. Highlighting our
            structural achievements across commercial, government, and
            industrial sectors.
          </motion.p>
        </header>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-4 mb-12 border-b border-outline-variant/20 pb-4"
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`font-label-caps text-label-caps px-4 py-2 border transition-all duration-300 ${
                filter === cat || (filter === 'All' && cat === 'ALL PROJECTS')
                  ? 'border-secondary bg-surface-container-lowest text-secondary shadow-[0_4px_12px_rgba(115,92,0,0.15)]'
                  : 'border-outline-variant/50 text-outline hover:border-outline hover:text-on-surface'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isLarge = idx % 5 === 0;
              const spanClass = isLarge ? 'md:col-span-8' : 'md:col-span-4';
              const heightClass = isLarge
                ? 'h-[250px] md:h-[400px]'
                : 'h-[200px] md:h-[250px]';

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.9, y: -20, filter: 'blur(4px)' }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                    layout: { duration: 0.4 },
                  }}
                  whileHover={{ y: -8 }}
                  className={`${spanClass} group border border-outline-variant/20 bg-surface-container-lowest flex flex-col relative overflow-hidden`}
                >
                  {/* Animated border on hover */}
                  <motion.div
                    className="absolute inset-0 border-2 border-secondary/0 pointer-events-none z-30"
                    whileHover={{ borderColor: 'var(--color-secondary)' }}
                    transition={{ duration: 0.3 }}
                  />

                  <Link
                    to={`/projects/${project.id}`}
                    className="block h-full flex flex-col"
                  >
                    <div
                      className={`${heightClass} w-full overflow-hidden bg-surface-container relative`}
                    >
                      <motion.img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      />

                      {/* Hover overlay with icon */}
                      <motion.div
                        className="absolute inset-0 bg-primary/60 backdrop-blur-[2px] flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.span
                          className="material-symbols-outlined text-white text-4xl"
                          initial={{ scale: 0.5, rotate: -45 }}
                          whileHover={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          arrow_outward
                        </motion.span>
                      </motion.div>
                    </div>

                    <div className="p-6 md:p-8 flex-grow flex flex-col justify-between border-t border-outline-variant/20">
                      <div>
                        <div className="flex items-center gap-4 mb-3 md:mb-4">
                          <span className="font-label-caps text-label-caps text-secondary uppercase">
                            {project.category}
                          </span>
                          <span className="w-1 h-1 bg-outline-variant rounded-full" />
                          <span className="font-mono-data text-mono-data text-on-surface-variant uppercase">
                            {project.status}
                          </span>
                        </div>
                        <h3
                          className={`text-on-surface mb-2 ${
                            isLarge
                              ? 'font-h2 text-3xl md:text-h2'
                              : 'font-h3 text-2xl md:text-h3'
                          }`}
                        >
                          {project.title}
                        </h3>
                        {isLarge && (
                          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                            {project.shortDescription}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 md:mt-6 flex items-center gap-2 text-outline-variant group-hover:text-secondary transition-colors">
                        <span className="font-label-caps text-label-caps">
                          VIEW SPECS
                        </span>
                        <motion.span
                          className="material-symbols-outlined text-sm"
                          animate={{ x: [0, 4, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          arrow_forward
                        </motion.span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </main>
    </PageTransition>
  );
};

export default Projects;
