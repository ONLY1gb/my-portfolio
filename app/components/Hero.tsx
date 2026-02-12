
// app/components/Hero.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Instagram } from "lucide-react";
import { SplineScene } from "@/components/ui/spline";
import { Spotlight } from "@/components/ui/spotlight";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white px-4 sm:px-6 lg:px-8"
    >
      {/* Background Particles / Stars */}
      <BackgroundParticles />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-sm md:text-base font-medium tracking-wider text-gray-400 uppercase mb-2">
              Welcome to my universe
            </h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
              Gautam Bhawsar
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-2 text-gray-300">
              Creative Developer
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed"
          >
            Crafting digital experiences that defy gravity. I build immersive web applications with a focus on motion, design, and performance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <a href="#projects" className="group relative px-6 py-3 bg-white text-black font-semibold rounded-full overflow-hidden transition-transform transform hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                View Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gray-200 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </a>
            <a href="#contact" className="px-6 py-3 border border-white/20 hover:bg-white/10 text-white font-semibold rounded-full transition-all hover:scale-105 active:scale-95 backdrop-blur-sm">
              Contact Me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex gap-6 justify-center lg:justify-start pt-4 text-gray-400"
          >
            <SocialLink href="https://github.com/" icon={<Github className="w-6 h-6" />} label="Github" />
            <SocialLink href="https://www.linkedin.com/in/gautam-bhawsar-82267625b/" icon={<Linkedin className="w-6 h-6" />} label="LinkedIn" />
            <SocialLink href="https://www.instagram.com/er.gautam_bhawsar?igsh=MTJocGt2dDBsMGZiaA==" icon={<Instagram className="w-6 h-6" />} label="Instagram" />
            <SocialLink href="mailto:contact@gautambhawsar.dev" icon={<Mail className="w-6 h-6" />} label="Email" />
          </motion.div>
        </motion.div>

        {/* Right Content - Spline Scene */}
        <div className="relative h-[400px] md:h-[600px] w-full flex-1 perspective-1000">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-1 h-12 rounded-full bg-gradient-to-b from-gray-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="transform transition-transform hover:scale-110 hover:text-white"
    >
      {icon}
    </a>
  );
}

function BackgroundParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full opacity-10"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0.1, 0.5, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
        />
      ))}
    </div>
  )
}
