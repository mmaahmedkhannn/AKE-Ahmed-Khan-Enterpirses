import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
      <motion.div 
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-container/30 rounded-full blur-[100px] pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Content */}
      <div className="relative z-10 pt-40 pb-24 px-4 md:px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#050914] border border-[#e9c349]/30 rounded-3xl p-6 md:p-12 shadow-[0_20px_50px_rgba(5,9,20,0.4)]"
        >
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-h1 font-black mb-8 text-white tracking-tight"
          >
            Terms of Service
            <div className="h-1 w-24 bg-gradient-to-r from-[#e9c349] to-transparent mt-4 rounded-full" />
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="prose prose-invert prose-lg max-w-none text-white/80 font-body-md"
          >
            <p className="text-[#e9c349] font-mono-data text-sm tracking-widest uppercase mb-12">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl font-bold mt-12 mb-4 text-white">1. Agreement to Terms</h2>
            <p>By accessing the Ahmed Khan Enterprises website, you agree to be fully bound by these Terms of Service. Our digital and physical operations are governed by the laws of Pakistan, with our primary jurisdiction located in Quetta, Balochistan.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">2. Services and Operations</h2>
            <p>Ahmed Khan Enterprises provides premium engineering, construction, and architectural services. All project proposals, timelines, financial estimates, and technical specifications provided through this platform are subject to formal, signed contractual agreements.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">3. Intellectual Property</h2>
            <p>All website content, architectural designs, structural blueprints, logos, and digital assets found on this website are the exclusive property of Ahmed Khan Enterprises. They are protected by applicable national and international copyright laws.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">4. Limitation of Liability</h2>
            <p>While we strive for absolute precision in our digital content, the website materials are provided strictly on an "as is" basis. Ahmed Khan Enterprises shall not be held liable for any direct or indirect damages arising from the use of this informational website.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
