
// app/components/ProjectDetailModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import { useEffect } from "react";

interface ProjectDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        title: string;
        description: string;
        category: string;
        src: string;
        link: string;
        color: string;
    };
}

export default function ProjectDetailModal({ isOpen, onClose, project }: ProjectDetailModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 cursor-pointer"
                    />

                    {/* Modal Container to center content */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4 md:p-8">
                        <motion.div
                            layoutId={`card-${project.title}`}
                            className="w-full max-w-5xl h-[85vh] md:h-[90vh] bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl relative pointer-events-auto flex flex-col"
                            initial={{ opacity: 0, scale: 0.8, y: 100 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 100 }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 z-20 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Header Image Section */}
                            <div className={`relative h-[40%] md:h-[50%] w-full flex-shrink-0 ${project.color} flex items-center justify-center overflow-hidden`}>
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900/90" />
                                <motion.div
                                    initial={{ scale: 1.2, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-white/50 font-mono text-2xl"
                                >
                                    {project.src}
                                </motion.div>
                            </div>

                            {/* Content Section */}
                            <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                                <div className="max-w-3xl mx-auto space-y-8">
                                    <div>
                                        <span className="text-sm font-medium tracking-wide text-gray-400 uppercase">{project.category}</span>
                                        <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">{project.title}</h2>
                                        <p className="text-lg text-gray-300 leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                                        <div>
                                            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Tech Stack</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion"].map((tech) => (
                                                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Role</h3>
                                            <p className="text-gray-400">Design & Development</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-8">
                                        <a href="#" className="flex-1 py-4 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                                            View Live <ArrowUpRight className="w-5 h-5" />
                                        </a>
                                        <a href="#" className="flex-1 py-4 bg-zinc-800 border border-zinc-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-700 transition-colors">
                                            Source Code <Github className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
