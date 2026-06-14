import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, Grid, Float, Sparkles } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

interface SplashScreenProps {
  isVisible: boolean;
}

// Custom 3D Architectural Wireframe Component
const ArchitecturalModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const wing1Ref = useRef<THREE.Mesh>(null);
  const wing2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slow majestic rotation
      groupRef.current.rotation.y += delta * 0.1;
    }
    
    // Animate building growth from 0 to 1 over the first few seconds
    const elapsed = state.clock.elapsedTime;
    
    // Cubic ease out function for smooth growth
    const easeOutCubic = (x: number): number => 1 - Math.pow(1 - x, 3);
    
    const coreProgress = Math.min(elapsed / 2.5, 1);
    const growEased = easeOutCubic(coreProgress);

    if (coreRef.current) {
      coreRef.current.scale.y = Math.max(0.001, growEased);
      coreRef.current.position.y = (3.5 / 2) * growEased - 0.55;
    }
    
    if (wing1Ref.current) {
      const w1Progress = Math.max(0, Math.min((elapsed - 0.5) / 2, 1));
      const w1Eased = easeOutCubic(w1Progress);
      wing1Ref.current.scale.y = Math.max(0.001, w1Eased);
      wing1Ref.current.position.y = (1.8 / 2) * w1Eased - 0.55;
    }
    
    if (wing2Ref.current) {
      const w2Progress = Math.max(0, Math.min((elapsed - 0.8) / 2, 1));
      const w2Eased = easeOutCubic(w2Progress);
      wing2Ref.current.scale.y = Math.max(0.001, w2Eased);
      wing2Ref.current.position.y = (2.5 / 2) * w2Eased - 0.55;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.5}>
      <group ref={groupRef} rotation={[0.1, Math.PI / 4, 0]}>
        
        {/* Magical floating construction dust */}
        <Sparkles count={150} scale={8} size={2} speed={0.4} opacity={0.4} color="#e9c349" />

        {/* Central Highrise Core */}
        <mesh ref={coreRef} position={[0, -0.55, 0]}>
          <boxGeometry args={[1.2, 3.5, 1.2]} />
          <meshBasicMaterial color="#050914" transparent opacity={0.6} depthWrite={false} />
          <Edges scale={1.01} threshold={15} color="#e9c349" />
        </mesh>

        {/* Secondary Structural Block */}
        <mesh ref={wing1Ref} position={[1.2, -0.55, 0]}>
          <boxGeometry args={[0.8, 1.8, 0.8]} />
          <meshBasicMaterial color="#050914" transparent opacity={0.5} depthWrite={false} />
          <Edges scale={1.01} threshold={15} color="#acc9ed" />
        </mesh>
        
        {/* Construction Wing */}
        <mesh ref={wing2Ref} position={[-1.2, -0.55, 0.5]}>
          <boxGeometry args={[1, 2.5, 1]} />
          <meshBasicMaterial color="#050914" transparent opacity={0.5} depthWrite={false} />
          <Edges scale={1.01} threshold={15} color="#acc9ed" />
        </mesh>

        {/* Outer Ring / Plot boundary representing the site */}
        <mesh position={[0, -0.54, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.2, 3.25, 64]} />
          <meshBasicMaterial color="#e9c349" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>

        {/* Base Foundation */}
        <mesh position={[0, -0.6, 0]}>
          <boxGeometry args={[4.5, 0.1, 4.5]} />
          <meshBasicMaterial color="#050914" transparent opacity={0.8} />
          <Edges scale={1.01} threshold={15} color="#e9c349" />
        </mesh>

        {/* Infinite Blueprint Grid */}
        <Grid
          renderOrder={-1}
          position={[0, -0.65, 0]}
          infiniteGrid
          fadeDistance={25}
          fadeStrength={5}
          cellSize={0.5}
          cellThickness={1}
          cellColor="#acc9ed"
          sectionSize={2.5}
          sectionThickness={1.5}
          sectionColor="#e9c349"
        />
      </group>
    </Float>
  );
};

const SplashScreen = ({ isVisible }: SplashScreenProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#002440] overflow-hidden"
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }}
        >
          {/* True 3D WebGL Background */}
          <motion.div
            className="absolute inset-0 z-0 mix-blend-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 2, ease: 'easeOut', delay: 0.2 }}
            exit={{
              scale: 2.5,
              opacity: 0,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            }}
          >
            <Canvas camera={{ position: [5, 4, 5], fov: 40 }}>
              <ambientLight intensity={1} />
              <ArchitecturalModel />
            </Canvas>
            {/* Dark gradient overlay to frame the 3D element and blend with the app */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#002440] via-transparent to-[#002440]/60 pointer-events-none" />
          </motion.div>

          {/* Ambient radial glow */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(115,92,0,0.12) 0%, transparent 70%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1.2], opacity: [0, 0.8, 0.4] }}
            transition={{ duration: 2, ease: 'easeOut' }}
            exit={{
              scale: 3,
              opacity: 0,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            }}
          />

          {/* Main content container */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Horizontal line left */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 right-[calc(100%+24px)] h-[1px] bg-gradient-to-l from-[#e9c349]/60 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              exit={{ opacity: 0, width: 0, transition: { duration: 0.4 } }}
            />

            {/* Horizontal line right */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 left-[calc(100%+24px)] h-[1px] bg-gradient-to-r from-[#e9c349]/60 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              exit={{ opacity: 0, width: 0, transition: { duration: 0.4 } }}
            />

            {/* Pre-label */}
            <motion.span
              className="text-[10px] tracking-[0.4em] uppercase text-[#e9c349]/60 font-mono drop-shadow-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              exit={{ opacity: 0, y: 20, transition: { duration: 0.4 } }}
            >
              Est. Pakistan
            </motion.span>

            {/* AKE Letters wrapper handles the massive zoom exit */}
            <motion.div 
              className="flex items-center gap-1"
              exit={{
                scale: 18,
                opacity: 0,
                filter: 'blur(25px)',
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
              }}
            >
              {['A', 'K', 'E'].map((letter, i) => (
                <motion.span
                  key={letter}
                  className="text-white font-black text-7xl md:text-9xl tracking-tighter leading-none drop-shadow-2xl"
                  style={{ fontFamily: "'Work Sans', sans-serif" }}
                  initial={{ opacity: 0, y: 60, rotateX: -90, filter: 'blur(12px)' }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    filter: 'blur(0px)',
                  }}
                  transition={{
                    delay: 0.15 + i * 0.15,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            {/* Full name reveal */}
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              transition={{ delay: 0.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              exit={{ opacity: 0, y: 20, transition: { duration: 0.4 } }}
            >
              <motion.p
                className="text-[11px] tracking-[0.35em] uppercase text-white/60 font-medium text-center drop-shadow-md"
                style={{ fontFamily: "'Inter', sans-serif" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                Ahmed Khan Enterprises
              </motion.p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              exit={{ opacity: 0, y: 20, transition: { duration: 0.4 } }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #e9c349, #ffffff, #e9c349)',
                }}
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 1,
                  delay: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.span
              className="text-[9px] tracking-[0.3em] uppercase text-white/30 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              exit={{ opacity: 0, y: 20, transition: { duration: 0.4 } }}
            >
              Engineering · Construction · Excellence
            </motion.span>
          </div>

          {/* Corner accents */}
          {/* Top-left */}
          <motion.div
            className="absolute top-8 left-8 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.5 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <div className="w-8 h-[1px] bg-white/40" />
            <div className="w-[1px] h-8 bg-white/40" />
          </motion.div>

          {/* Top-right */}
          <motion.div
            className="absolute top-8 right-8 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.6 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <div className="w-8 h-[1px] bg-white/40 ml-auto" />
            <div className="w-[1px] h-8 bg-white/40 ml-auto" />
          </motion.div>

          {/* Bottom-left */}
          <motion.div
            className="absolute bottom-8 left-8 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.7 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <div className="w-[1px] h-8 bg-white/40" />
            <div className="w-8 h-[1px] bg-white/40" />
          </motion.div>

          {/* Bottom-right */}
          <motion.div
            className="absolute bottom-8 right-8 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.8 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <div className="w-[1px] h-8 bg-white/40 ml-auto" />
            <div className="w-8 h-[1px] bg-white/40 ml-auto" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
