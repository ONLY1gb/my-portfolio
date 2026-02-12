"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CyberGrid from "./CyberGrid";

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeInOut" as const },
        },
    };

    return (
        <section id="about" className="py-24 bg-black text-white px-6 md:px-12 relative overflow-hidden">
            {/* Subtle background gradient */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl -z-10" />

            <div className="max-w-6xl mx-auto" ref={ref}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="space-y-12"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <motion.div variants={itemVariants} className="border-l-2 border-white/20 pl-6">
                                <h2 className="text-sm font-mono text-gray-400 mb-4 tracking-widest uppercase">01. Philosophy</h2>
                                <h3 className="text-3xl md:text-5xl font-bold leading-tight">
                                    I don't just write code.<br />
                                    <span className="text-gray-500">I engineer chaos into clarity.</span>
                                </h3>
                            </motion.div>

                            <motion.div variants={itemVariants} className="text-lg text-gray-400 leading-relaxed space-y-6">
                                <p>
                                    Programming started as a curiosity - a way to cheat in video games. It quickly evolved into an obsession with creating things that feel
                                    <span className="text-white font-semibold"> alive</span>.
                                </p>
                                <p>
                                    My approach is simple: <span className="text-white">Form follows function, but feeling follows motion.</span> I believe the best digital experiences are the ones that respect the user's time while delighting their senses.
                                </p>
                                <p>
                                    I love solving the "impossible" layout problems and optimizing animations until they run at a locked 60fps on a toaster. Whether it's a complex dashboard or a whimsical portfolio, I treat every pixel as a promise of quality.
                                </p>
                            </motion.div>
                        </div>

                        <motion.div
                            variants={itemVariants}
                            className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900/50"
                        >
                            <CyberGrid
                                src="/assets/Gautam.jpeg"
                                alt="Gautam Bhawsar"
                                className="w-full h-full"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
