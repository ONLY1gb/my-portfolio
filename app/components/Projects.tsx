"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";
import ProjectDetailModal from "./ProjectDetailModal";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
    {
        title: "React Social Media App",
        category: "Social Media Platform",
        description: "A comprehensive social networking application building with React. Features real-time posts, user authentication, and interactive media galleries.",
        src: "assets/React Social Media App/Image1.png",
        gallery: [
            "assets/React Social Media App/Image2.png",
            "assets/React Social Media App/Image3.png",
            "assets/React Social Media App/Image4.png"
        ],
        link: "#",
        color: "#3b82f6"
    },
    {
        title: "React Admin Dashboard",
        category: "Data Visualization",
        description: "Real-time environmental monitoring dashboard with interactive charts. Tracks carbon footprint and suggests eco-friendly alternatives.",
        src: "assets/React Admin Dashboard/Image1.png",
        gallery: [
            "assets/React Admin Dashboard/Image2.png",
            "assets/React Admin Dashboard/Image3.png",
            "assets/React Admin Dashboard/Image4.png"
        ],
        link: "#",
        color: "#10b981"
    },
    {
        title: "React E-Commerce Web App",
        category: "Web Application",
        description: "A futuristic shopping experience with 3D product previews. Implements advanced cart functionality and seamless checkout flows.",
        src: "assets/React E-Commerce Web App/image1.png",
        gallery: [
            "assets/React E-Commerce Web App/image2.png",
            "assets/React E-Commerce Web App/image3.png",
            "assets/React E-Commerce Web App/image4.png"
        ],
        link: "#",
        color: "#ec4899"
    },
    {
        title: "Food Recipe App",
        category: "Culinary & Lifestyle",
        description: "Discover and share delicious recipes with step-by-step guides, nutritional info, and meal planning.",
        src: "assets/Food-Recipe/Image1.png",
        gallery: [
            "assets/Food-Recipe/Image2.png",
            "assets/Food-Recipe/Image3.png"
        ],
        link: "#",
        color: "#f97316"
    },
    {
        title: "Crypto Nexus",
        category: "Fintech",
        description: "A comprehensive cryptocurrency dashboard with real-time trading data, portfolio tracking, and market sentiment analysis.",
        src: "assets/CryptoPlace/Image1.png",
        gallery: [
            "assets/CryptoPlace/Image2.png",
            "assets/CryptoPlace/Image3.png",
            "assets/CryptoPlace/Image4.png"
        ],
        link: "#",
        color: "#8b5cf6"
    }
];

export default function FeaturedProjects() {
    const [activeIndex, setActiveIndex] = useState(2); // Start in middle
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    const containerRef = useRef(null);
    const inView = useInView(containerRef, { once: true, margin: "-100px" });

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % projects.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    return (
        <section ref={containerRef} id="projects" className="bg-black text-white relative py-20 px-4 min-h-screen flex flex-col justify-center overflow-hidden">

            <div className="max-w-7xl mx-auto mb-16 text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-sm font-mono text-gray-400 mb-2 tracking-widest uppercase"
                >
                    03. Selected Work
                </motion.h2>
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="text-4xl md:text-5xl font-bold"
                >
                    Featured Projects
                </motion.h3>
            </div>

            {/* Card Fan Container */}
            <div className="relative h-[450px] w-full flex items-center justify-center">
                {projects.map((project, index) => {
                    // Circular Difference Logic for Infinite Loop Feel
                    // This ensures there are always cards on both sides if possible
                    let offset = (index - activeIndex + projects.length) % projects.length;

                    // Adjustment for negative wrap-around (e.g. if length is 5, offset 4 should be -1)
                    if (offset > projects.length / 2) {
                        offset -= projects.length;
                    }

                    const isActive = offset === 0;

                    return (
                        <FanCard
                            key={project.title}
                            project={project}
                            offset={offset}
                            isActive={isActive}
                            inView={inView}
                            onClick={() => {
                                if (isActive) {
                                    setSelectedProject(project);
                                } else {
                                    setActiveIndex(index);
                                }
                            }}
                        />
                    );
                })}
            </div>

            {/* Navigation Dots */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex justify-center gap-3 mt-12 z-20"
            >
                {projects.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? "w-8 bg-white" : "bg-white/20 hover:bg-white/40"}`}
                    />
                ))}
            </motion.div>

            {/* Detail Modal */}
            <ProjectDetailModal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                project={selectedProject || projects[0]}
            />
        </section>
    )
}

function FanCard({ project, offset, isActive, inView, onClick }: { project: typeof projects[0], offset: number, isActive: boolean, inView: boolean, onClick: () => void }) {

    // Fan configuration
    const CARD_WIDTH = 300;
    const SPACING = 180; // Adjusted for better overlap
    const ROTATION_FACTOR = 8; // Degree rotation per offset
    const TRANSLATE_Y_FACTOR = 30; // Amount to drop side cards

    // Only render if close enough to be visible
    // We show 2 neighbors on each side
    if (Math.abs(offset) > 2) return null;

    return (
        <motion.div
            layoutId={`card-${project.title}`}
            onClick={onClick}
            className="absolute rounded-2xl overflow-hidden cursor-pointer origin-bottom"
            initial={false}
            animate={inView ? {
                // Fanned State
                x: offset * SPACING,
                y: Math.abs(offset) * TRANSLATE_Y_FACTOR + (isActive ? 0 : 20),
                rotateZ: offset * ROTATION_FACTOR,
                scale: isActive ? 1.1 : 0.9 - Math.abs(offset) * 0.1,
                zIndex: 100 - Math.abs(offset),
                opacity: 1 - Math.abs(offset) * 0.1, // Fade out far items
                filter: isActive ? "blur(0px) brightness(1.1)" : "blur(1px) brightness(0.7)"
            } : {
                // Hidden Behind Center State
                x: 0, // All stacked in center
                y: 20, // Slightly down
                rotateZ: 0, // No rotation
                scale: 0.9, // Slightly smaller
                zIndex: 0, // Behind
                opacity: 0, // Hidden
                filter: "blur(0px)"
            }}
            whileHover={{
                y: isActive ? -20 : undefined, // Lift up on hover if active
                transition: { duration: 0.2 }
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                // Sequenced delay: Center card triggers first (or last?), actually user wants "from behind middle".
                // So delay increases as offset increases.
                delay: inView ? Math.abs(offset) * 0.2 : 0
            }}
            style={{
                width: CARD_WIDTH,
                height: CARD_WIDTH * 1.5,
                left: "50%",
                // Important: center the element itself on its anchor point so 'x: 0' means 'centered'
                marginLeft: -CARD_WIDTH / 2,
                backgroundColor: project.color,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
        >
            {/* Background Image */}
            <img
                src={`/${project.src}`}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 text-white text-center">
                <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                <p className="text-xs text-white/60 uppercase tracking-wider">{project.category}</p>
            </div>

            {/* Shine Effect */}
            {isActive && (
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none" />
            )}
        </motion.div>
    );
}
