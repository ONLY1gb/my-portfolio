
"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { Code2, Cpu, Database, Globe, Layers, Layout, Server, Smartphone, Zap } from "lucide-react";

const skills = [
    { name: "React", img: "/assets/logos/react.svg" },
    { name: "Next.js", img: "/assets/logos/nextjs (1).svg" },
    { name: "TypeScript", img: "/assets/logos/typescript (1).svg" },
    { name: "Node.js", img: "/assets/logos/nodejs-icon-alt.svg" },
    { name: "Tailwind", img: "/assets/logos/tailwindcss.svg" },
    { name: "Framer Motion", img: "/assets/logos/framermotion.svg" },
    { name: "PostgreSQL", img: "/assets/logos/postgresql.png" },
    { name: "UI/UX Design", img: "/assets/logos/design-ideas-16.svg" },
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 bg-zinc-950 text-white overflow-hidden relative">
            <div className="px-6 md:px-12 mb-16 max-w-7xl mx-auto">
                <h2 className="text-sm font-mono text-gray-400 mb-8 tracking-widest uppercase">02. Arsenal</h2>
                <h3 className="text-4xl md:text-5xl font-bold mb-6">The tools I use to build the future.</h3>
            </div>

            {/* Marquee Container */}
            <div className="relative flex overflow-x-hidden group">
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

                <MarqueeContent direction="left" />
                <MarqueeContent direction="left" aria-hidden="true" />
            </div>
        </section>
    );
}

function MarqueeContent({ direction, ...props }: { direction: "left" | "right" } & HTMLMotionProps<"div">) {
    return (
        <motion.div
            {...props}
            className="flex gap-16 py-8 px-8 items-center flex-shrink-0"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 30
            }}
        >
            {skills.map((skill, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center gap-4 group cursor-default"
                >
                    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 transition-all duration-300 group-hover:scale-110 group-hover:border-white/30 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        <div className="w-12 h-12 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                            {/* @ts-ignore */}
                            {skill.img ? (
                                <img
                                    // @ts-ignore
                                    src={skill.img}
                                    alt={skill.name}
                                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 invert-[0.8] group-hover:invert-0"
                                />
                            ) : (
                                // @ts-ignore
                                skill.icon
                            )}
                        </div>
                    </div>
                    <span className="text-sm font-medium text-gray-500 group-hover:text-white transition-colors">
                        {skill.name}
                    </span>
                </div>
            ))}
        </motion.div>
    );
}
