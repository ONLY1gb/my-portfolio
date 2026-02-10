
"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { useRef, useState } from "react";
import ProjectDetailModal from "./ProjectDetailModal";

const projects = [
    {
        title: "AI Pocket Manager",
        category: "AI & Productivity",
        description: "A smart assistant that helps you organize tasks and ideas with GPT-4 turbo. Features real-time collaboration and intuitive voice commands.",
        src: "ai_manager.png",
        link: "#",
        color: "#3b82f6"
    },
    {
        title: "EcoTrack Dashboard",
        category: "Data Visualization",
        description: "Real-time environmental monitoring dashboard with interactive charts. Tracks carbon footprint and suggests eco-friendly alternatives.",
        src: "ecotrack.png",
        link: "#",
        color: "#10b981"
    },
    {
        title: "Neon Ecommerce",
        category: "Web Application",
        description: "A futuristic shopping experience with 3D product previews. Implements advanced cart functionality and seamless checkout flows.",
        src: "neon_shop.png",
        link: "#",
        color: "#ec4899"
    },
    {
        title: "Synthwave Portfolio",
        category: "Creative Development",
        description: "An immersive 3D portfolio website featuring retro-futuristic aesthetics, audio-reactive visuals, and WebGL experiments.",
        src: "portfolio.png",
        link: "#",
        color: "#06b6d4"
    }
];

export default function FeaturedProjects() {
    const container = useRef(null);
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    return (
        <section ref={container} id="projects" className="bg-black text-white relative py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto mb-24">
                <h2 className="text-sm font-mono text-gray-400 mb-2 tracking-widest uppercase">03. Selected Work</h2>
                <h3 className="text-4xl md:text-5xl font-bold">Featured Projects</h3>
            </div>

            <div className="mt-[10vh] mb-[10vh] max-w-5xl mx-auto">
                {
                    projects.map((project, i) => {
                        const targetScale = 1 - ((projects.length - i) * 0.05);
                        return <Card key={i} i={i} {...project} progress={scrollYProgress} range={[i * .25, 1]} targetScale={targetScale} onClick={() => setSelectedProject(project)} />
                    })
                }
            </div>

            {/* Detail Modal */}
            <ProjectDetailModal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                project={selectedProject || projects[0]}
            />
        </section>
    )
}

interface CardProps {
    i: number;
    title: string;
    description: string;
    src: string;
    link: string;
    color: string;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
    onClick: () => void;
}

const Card = ({ i, title, description, src, link, color, progress, range, targetScale, onClick }: CardProps) => {

    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    })

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-[80vh] flex items-center justify-center sticky top-0 perspective-1000">
            <motion.div
                layoutId={`card-${title}`}
                onClick={onClick}
                style={{ scale, backgroundColor: color, top: `calc(-5vh + ${i * 25}px)` }}
                className="flex flex-col relative -top-[25%] h-[400px] md:h-[500px] w-full origin-top rounded-3xl p-10 gap-10 border border-white/10 shadow-2xl overflow-hidden cursor-pointer hover:shadow-cyan-500/20 transition-shadow"
            >
                <div className="flex h-full gap-10 flex-col md:flex-row pointer-events-none">
                    {/* Text Content */}
                    <div className="w-full md:w-[40%] relative top-[10%] space-y-4">
                        <h2 className="text-3xl font-bold text-white">{title}</h2>
                        <p className="text-base text-white/80 leading-relaxed font-light">
                            {description}
                        </p>
                        <div className="pt-4 flex items-center gap-4">
                            <span className="flex items-center gap-2 text-sm font-medium cursor-pointer hover:underline">
                                See more <ArrowUpRight className="w-4 h-4" />
                            </span>
                            <span className="flex items-center gap-2 text-sm font-medium cursor-pointer hover:underline">
                                <Github className="w-4 h-4" /> Source
                            </span>
                        </div>
                    </div>

                    {/* Image Container */}
                    <div className="relative w-full md:w-[60%] h-full rounded-2xl overflow-hidden border border-white/20">
                        <motion.div
                            className="w-full h-full bg-black/20 backdrop-blur-sm"
                            style={{ scale: imageScale }}
                        >
                            <div className="w-full h-full flex items-center justify-center text-white/30 font-mono">
                                {src}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
