import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Map from '../components/Map';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import { fadeUp, staggerContainer, lineGrow } from '../lib/animations';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Structural Engineering',
    message: ''
  });
  const [csrfToken, setCsrfToken] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/csrf-token')
      .then(res => res.json())
      .then(data => setCsrfToken(data.token))
      .catch(err => console.error('Security token sync failed:', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: result.message });
        setFormData({ name: '', email: '', phone: '', department: 'Structural Engineering', message: '' });
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to submit inquiry' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network transmission error. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-10 max-w-screen-2xl mx-auto w-full flex flex-col md:flex-row gap-gutter min-h-screen">
        {/* Left: Inquiry Form */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="w-full md:w-1/2 bg-surface p-6 md:p-10 border border-outline-variant relative overflow-hidden"
        >
          {/* Animated accent line */}
          <motion.div
            variants={lineGrow}
            className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-secondary to-transparent"
          />

          <motion.div variants={fadeUp}>
            <AnimatedText
              text="Direct Inquiry"
              tag="h1"
              className="font-h2 text-3xl md:text-h2 text-white mb-8"
            />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="font-body-md text-body-md text-on-surface-variant mb-12 max-w-md"
          >
            For specialized engineering consultations and enterprise project
            specifications, please direct your correspondence through our
            technical interface. All transmissions are secure.
          </motion.p>

          {status.message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 mb-8 font-mono-data text-sm border ${
                status.type === 'success' ? 'bg-green-500/10 border-green-500 text-green-700' : 'bg-red-500/10 border-red-500 text-red-700'
              }`}
            >
              {status.message}
            </motion.div>
          )}

          <form className="space-y-8" onSubmit={handleSubmit}>
            {[
              {
                id: 'name',
                label: 'Corporate Entity / Contact Name',
                type: 'text',
                placeholder: 'Enter designated entity',
              },
            ].map((field, i) => (
              <motion.div
                key={field.id}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4 + i * 0.1,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <label
                  htmlFor={field.id}
                  className="block font-label-caps text-label-caps text-white mb-2"
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  value={formData[field.id as keyof typeof formData]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-mono-data text-mono-data text-on-surface placeholder-outline/50 transition-colors"
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-secondary"
                  initial={{ scaleX: 0 }}
                  whileFocus={{ scaleX: 1 }}
                  style={{ originX: 0 }}
                />
              </motion.div>
            ))}

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block font-label-caps text-label-caps text-white mb-2"
                >
                  Official Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contact@domain.com"
                  required
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-mono-data text-mono-data text-on-surface placeholder-outline/50 transition-colors"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="phone"
                  className="block font-label-caps text-label-caps text-white mb-2"
                >
                  Direct Terminal
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+92 300 0000000"
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-mono-data text-mono-data text-on-surface placeholder-outline/50 transition-colors"
                />
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label
                htmlFor="department"
                className="block font-label-caps text-label-caps text-white mb-2"
              >
                Relevant Department
              </label>
              <select
                id="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-mono-data text-mono-data text-on-surface transition-colors"
              >
                <option>Structural Engineering</option>
                <option>Civil Infrastructure</option>
                <option>Sustainability Compliance</option>
                <option>Executive Office</option>
              </select>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label
                htmlFor="message"
                className="block font-label-caps text-label-caps text-white mb-2"
              >
                Project Specifications
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Detail your technical requirements..."
                required
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-mono-data text-mono-data text-on-surface placeholder-outline/50 resize-none transition-colors"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? {
                  scale: 1.03,
                  y: -2,
                  boxShadow: '0 10px 30px rgba(53,56,57,0.3)',
                } : {}}
                whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                className="mt-8 bg-tertiary-container text-on-tertiary px-8 py-4 font-label-caps text-label-caps hover:bg-secondary transition-colors inline-flex items-center gap-2 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">{isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT INQUIRY'}</span>
                <motion.span
                  className="material-symbols-outlined text-sm relative z-10"
                  animate={isSubmitting ? {} : { x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  send
                </motion.span>
              </motion.button>
            </motion.div>
          </form>
        </motion.section>

        {/* Right: Headquarters & Map */}
        <motion.section
          initial={{ opacity: 0, x: 40, filter: 'blur(6px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{
            delay: 0.3,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full md:w-1/2 flex flex-col gap-6"
        >
          {/* Headquarters Details */}
          <motion.div
            whileHover={{
              y: -6,
              boxShadow: '0 20px 40px rgba(0,36,64,0.25)',
            }}
            className="bg-primary text-on-primary p-6 md:p-10 flex flex-col justify-between border border-primary-container min-h-[300px] md:h-1/2 relative overflow-hidden group"
          >
            {/* Animated glow */}
            <motion.div
              className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--color-secondary),_transparent_50%)]"
              animate={{ opacity: [0.05, 0.15, 0.05] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="relative z-10">
              <motion.div
                className="font-mono-data text-mono-data text-secondary-fixed-dim mb-4 flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.span
                  className="material-symbols-outlined text-sm"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  location_on
                </motion.span>
                HQ-01 | GLOBAL COMMAND
              </motion.div>
              <h2 className="font-h3 text-2xl md:text-h3 mb-2">
                AKE Corporate Office
              </h2>
              <p className="font-body-md text-body-md text-on-primary-container max-w-sm">
                123 Enterprise Avenue, Blue Area,
                <br />
                Islamabad, Pakistan
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-primary-container pt-6 relative z-10">
              {[
                { label: 'General Operations', value: '+92 51 1234567' },
                { label: 'Technical Support', value: '+92 300 1234567' },
              ].map((contact, i) => (
                <motion.div
                  key={contact.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.15 }}
                >
                  <div className="font-label-caps text-label-caps text-on-primary-container mb-1">
                    {contact.label}
                  </div>
                  <div className="font-mono-data text-mono-data">
                    {contact.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Map Area */}
          <ScrollReveal direction="up" delay={0.4}>
            <div className="bg-surface border border-outline-variant min-h-[300px] md:h-[calc(50%-12px)] relative overflow-hidden group">
              <div className="absolute inset-0">
                <Map />
              </div>

              <motion.div
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm border border-outline-variant px-3 py-1 font-mono-data text-[10px] text-on-surface flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <motion.span
                  className="material-symbols-outlined text-[14px]"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  my_location
                </motion.span>
                LAT 33.7294 | LNG 73.0931
              </motion.div>
            </div>
          </ScrollReveal>
        </motion.section>
      </main>
    </PageTransition>
  );
};

export default Contact;
