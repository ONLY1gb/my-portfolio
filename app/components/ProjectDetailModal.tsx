"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, X, Play, Plus, ThumbsUp, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ActionModal from "./ActionModal";

interface ProjectDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        title: string;
        description: string;
        category: string;
        src: string;
        gallery?: string[];
        link: string;
        color: string;
    };
}

export default function ProjectDetailModal({ isOpen, onClose, project }: ProjectDetailModalProps) {
    const [mounted, setMounted] = useState(false);
    const [actionModal, setActionModal] = useState<{ isOpen: boolean; mode: "demo" | "source" }>({ isOpen: false, mode: "demo" });

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.paddingRight = "0px";
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.paddingRight = "0px";
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    if (!mounted) return null;

    // Mock data for the "Episodes" / Gallery strip
    const galleryItems = [1, 2, 3, 4, 5];

    return createPortal(
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9990] cursor-pointer"
                        />

                        {/* Modal Container */}
                        <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none p-0 md:p-4">
                            <motion.div
                                layoutId={`card-${project.title}`}
                                className="w-full max-w-6xl h-full md:h-[95vh] bg-[#141414] rounded-none md:rounded-xl overflow-hidden shadow-2xl relative pointer-events-auto flex flex-col border border-white/10"
                                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 100, scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors backdrop-blur-sm border border-white/10"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                {/* Hero / Cinematic Section */}
                                <div className="relative w-full h-[65%] flex-shrink-0">
                                    {/* Background Image/Gradient */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={`/${project.src}`}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className={`absolute inset-0 ${project.color} mix-blend-multiply opacity-50`} />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/80 via-[#141414]/30 to-transparent" />

                                    {/* Content Overlay */}
                                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10 flex flex-col justify-end h-full">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="max-w-3xl"
                                        >
                                            {/* Tags / Metadata */}
                                            <div className="flex items-center gap-3 mb-4 text-sm font-medium">
                                                <span className="text-green-400 font-bold">98% Match</span>
                                                <span className="text-gray-300">2024</span>
                                                <span className="px-1.5 py-0.5 border border-gray-500 rounded text-[10px] text-gray-300">HD</span>
                                                <span className="text-gray-300">{project.category}</span>
                                            </div>

                                            {/* Title */}
                                            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-none">
                                                {project.title}
                                            </h2>

                                            {/* Description */}
                                            <p className="text-lg text-gray-200 leading-relaxed mb-8 max-w-xl drop-shadow-lg">
                                                {project.description}
                                            </p>

                                            {/* Action Buttons */}
                                            <div className="flex flex-wrap gap-4">
                                                <button
                                                    onClick={() => setActionModal({ isOpen: true, mode: "demo" })}
                                                    className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded hover:bg-white/90 transition-colors"
                                                >
                                                    <Play className="w-5 h-5 fill-current" /> Request Demo
                                                </button>
                                                <button
                                                    onClick={() => setActionModal({ isOpen: true, mode: "source" })}
                                                    className="flex items-center gap-2 px-8 py-3 bg-gray-500/30 text-white font-bold rounded hover:bg-gray-500/40 transition-colors backdrop-blur-sm"
                                                >
                                                    <CreditCard className="w-5 h-5" /> Buy Source Code
                                                </button>
                                                <button className="p-3 bg-transparent border border-gray-500 rounded-full hover:border-white transition-colors">
                                                    <Plus className="w-5 h-5" />
                                                </button>
                                                <button className="p-3 bg-transparent border border-gray-500 rounded-full hover:border-white transition-colors">
                                                    <ThumbsUp className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Bottom Section: "Episodes" / Gallery */}
                                <div className="flex-1 bg-[#141414] p-8 md:p-12 overflow-y-auto">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold text-white">Project Highlights</h3>
                                        <span className="text-sm text-gray-400">Gallery</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {project.gallery && project.gallery.length > 0 ? project.gallery.map((image, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 + (index * 0.1) }}
                                                className="group cursor-pointer"
                                            >
                                                {/* Image Container */}
                                                <div className="relative aspect-video rounded-md overflow-hidden bg-zinc-800 mb-3 border border-white/10 group-hover:border-white/50 transition-colors">
                                                    <img
                                                        src={`/${image}`}
                                                        alt={`Highlight ${index + 1}`}
                                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                                </div>

                                                {/* Meta */}
                                                <div className="flex justify-between items-start">
                                                    <h4 className="text-white font-medium group-hover:text-gray-300 transition-colors">
                                                        {index === 0 ? "Product Listing" : index === 1 ? "Cart & Checkout" : "User Profile"}
                                                    </h4>
                                                </div>
                                            </motion.div>
                                        )) : (
                                            <p className="text-gray-500">No gallery images available.</p>
                                        )}
                                    </div>
                                </div>

                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            <ActionModal
                isOpen={actionModal.isOpen}
                onClose={() => setActionModal({ ...actionModal, isOpen: false })}
                mode={actionModal.mode}
                projectTitle={project.title}
            />
        </>,
        document.body
    );
}
