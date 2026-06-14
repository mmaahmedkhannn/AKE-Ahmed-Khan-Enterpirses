import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Expertise', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed top-0 w-full z-50 flex justify-center transition-all duration-500 ${
        scrolled
          ? 'bg-[#050914]/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-[#e9c349]/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="w-full flex justify-between items-center px-6 md:px-10 h-24 max-w-screen-2xl">
        {/* Premium Logo */}
        <Link
          to="/"
          className="font-h3 font-black tracking-tighter text-3xl text-white flex items-center group cursor-pointer drop-shadow-md"
        >
          <motion.span whileHover={{ scale: 1.1, color: '#e9c349' }} className="transition-colors">A</motion.span>
          <span className="max-w-0 overflow-hidden md:group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap opacity-0 md:group-hover:opacity-100 text-[#e9c349] font-medium tracking-widest text-sm uppercase ml-1 mr-2 mt-1">
            HMED
          </span>
          <motion.span whileHover={{ scale: 1.1, color: '#e9c349' }} className="transition-colors">K</motion.span>
          <span className="max-w-0 overflow-hidden md:group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap opacity-0 md:group-hover:opacity-100 text-[#e9c349] font-medium tracking-widest text-sm uppercase ml-1 mr-2 mt-1">
            HAN
          </span>
          <motion.span whileHover={{ scale: 1.1, color: '#e9c349' }} className="transition-colors">E</motion.span>
          <span className="max-w-0 overflow-hidden md:group-hover:max-w-[200px] transition-all duration-500 ease-in-out whitespace-nowrap opacity-0 md:group-hover:opacity-100 text-[#e9c349] font-medium tracking-widest text-sm uppercase ml-1 mt-1">
            NTERPRISES
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10 items-center">
          {links.map((link, i) => {
            const active = isActive(link.path);
            return (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                <Link
                  to={link.path}
                  className={`group font-label-caps text-label-caps uppercase tracking-[0.2em] transition-all duration-300 relative px-4 py-3 flex items-center justify-center ${
                    active
                      ? 'text-[#e9c349]'
                      : 'text-white/60 hover:text-[#e9c349]'
                  }`}
                >
                  {/* Blueprint Dimension Lines (Hover State) */}
                  <div className="absolute top-1 left-0 w-full h-[1px] bg-transparent group-hover:bg-[#e9c349]/40 transition-colors duration-300">
                    <div className="absolute left-0 -top-1 w-[1px] h-3 bg-transparent group-hover:bg-[#e9c349] transition-colors duration-300" />
                    <div className="absolute right-0 -top-1 w-[1px] h-3 bg-transparent group-hover:bg-[#e9c349] transition-colors duration-300" />
                  </div>
                  
                  {/* Tiny Technical Code */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono-data tracking-widest text-[#e9c349] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1 pointer-events-none">
                    SEC-0{i + 1}
                  </div>

                  <div className="absolute bottom-1 left-0 w-full h-[1px] bg-transparent group-hover:bg-[#e9c349]/40 transition-colors duration-300">
                    <div className="absolute left-0 -top-1 w-[1px] h-3 bg-transparent group-hover:bg-[#e9c349] transition-colors duration-300" />
                    <div className="absolute right-0 -top-1 w-[1px] h-3 bg-transparent group-hover:bg-[#e9c349] transition-colors duration-300" />
                  </div>

                  <span className="relative z-10 inline-block transition-transform duration-300">
                    {link.name}
                  </span>

                  {/* Active Indicator: Structural Block */}
                  {active && (
                    <motion.div
                      layoutId="navActiveMarker"
                      className="absolute inset-0 bg-gradient-to-b from-[#e9c349]/5 to-[#e9c349]/15 border-x border-[#e9c349]/40 backdrop-blur-sm pointer-events-none"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/contact"
              className="bg-gradient-to-r from-[#e9c349] to-[#fed65b] text-[#050914] font-label-caps text-label-caps font-bold tracking-widest px-8 py-3.5 rounded hover:shadow-[0_0_20px_rgba(233,195,73,0.4)] transition-all duration-300 inline-block relative overflow-hidden group uppercase"
            >
              <span className="relative z-10 flex items-center gap-2">
                Inquiry
                <span className="material-symbols-outlined text-sm font-bold group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-50 text-white hover:text-[#e9c349] transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center rounded-md"
          aria-label="Toggle Menu"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="material-symbols-outlined text-3xl"
              >
                close
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
                className="material-symbols-outlined text-3xl"
              >
                menu
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#050914]/90 backdrop-blur-2xl z-40 flex flex-col justify-center px-6 md:px-10 pointer-events-auto border-b border-[#e9c349]/20"
          >
            {/* Background decoration */}
            <motion.div
              className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#e9c349]/5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />

            <div className="space-y-8 relative z-10">
              {links.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    filter: 'blur(0px)',
                  }}
                  transition={{
                    delay: 0.1 + idx * 0.08,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    to={link.path}
                    className={`block font-h3 text-4xl font-black tracking-tighter uppercase ${
                      isActive(link.path)
                        ? 'text-[#e9c349]'
                        : 'text-white hover:text-[#e9c349]'
                    }`}
                  >
                    <motion.span
                      whileHover={{ x: 15 }}
                      className="inline-block transition-transform duration-300"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-10"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/contact"
                    className="bg-[#e9c349] text-[#050914] font-label-caps text-label-caps font-bold px-8 py-5 rounded shadow-[0_0_30px_rgba(233,195,73,0.2)] hover:shadow-[0_0_40px_rgba(233,195,73,0.4)] transition-all duration-300 inline-block text-center w-full uppercase tracking-widest"
                  >
                    Start an Inquiry
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
