
"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

const experience = [
    {
        year: "Dec 2024 - Present",
        title: "Full Stack Web Developer",
        company: "GenaiProtos",
        desc: "Developing scalable full-stack web applications and AI-driven solutions. Leveraging Generative AI to drive product innovation and collaborating with cross-functional teams to deliver high-quality software.",
    },
];

export default function Experience() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    return (
        <section ref={ref} id="experience" className="py-24 bg-zinc-950 text-white px-6 md:px-12 relative overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-sm font-mono text-gray-400 mb-12 tracking-widest uppercase">04. Timeline</h2>

                <div className="relative border-l border-zinc-800 ml-3 md:ml-6 space-y-16">
                    {/* Progress Line */}
                    <motion.div
                        style={{ scaleY: scrollYProgress }}
                        className="absolute top-0 left-[-1px] w-[2px] h-full bg-cyan-500 origin-top"
                    />

                    {experience.map((item, index) => (
                        <div key={index} className="relative pl-8 md:pl-12 group">
                            {/* Timeline Dot */}
                            <span className="absolute left-[-5px] top-2 w-3 h-3 rounded-full bg-zinc-800 border border-zinc-600 group-hover:bg-cyan-500 group-hover:border-cyan-400 transition-colors duration-300" />

                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-2">
                                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                    {item.title}
                                </h3>
                                <span className="text-sm font-mono text-gray-500">{item.company}</span>
                            </div>

                            <span className="inline-block px-2 py-1 mb-4 text-xs font-semibold bg-zinc-900 text-zinc-400 rounded border border-zinc-800">
                                {item.year}
                            </span>

                            <p className="text-gray-400 max-w-lg leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
