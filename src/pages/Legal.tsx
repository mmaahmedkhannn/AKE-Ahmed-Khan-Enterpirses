import { motion } from 'framer-motion';

const Legal = () => {
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
            Legal Notice
            <div className="h-1 w-24 bg-gradient-to-r from-[#e9c349] to-transparent mt-4 rounded-full" />
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="prose prose-invert prose-lg max-w-none text-white/80 font-body-md"
          >
            <p className="text-[#e9c349] font-mono-data text-sm tracking-widest uppercase mb-12">Corporate Compliance Document</p>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-white">Corporate Identity</h2>
            <p>Ahmed Khan Enterprises is a formally registered engineering, construction, and architectural firm headquartered in Quetta, Balochistan, Pakistan. We operate under all relevant national and provincial construction regulatory frameworks.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Compliance and Standards</h2>
            <p>Our operational procedures strictly adhere to national building codes, environmental regulations, and occupational safety and health administration standards. We maintain active certifications and compliance with the Pakistan Engineering Council and necessary regional authorities.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Regulatory Disclaimers</h2>
            <p>The information, imagery, and statistics presented on this website do not constitute formal engineering advice or binding contracts. For official structural, civil, or architectural consultation, a formal legal engagement process must be initiated directly with our Quetta office.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Legal;
