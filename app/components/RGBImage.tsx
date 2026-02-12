"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";

interface RGBImageProps {
    src: string;
    alt: string;
    className?: string;
}

export default function RGBImage({ src, alt, className }: RGBImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse position values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth physics
    const springConfig = { damping: 20, stiffness: 200 };
    const mouseX = useSpring(x, springConfig);
    const mouseY = useSpring(y, springConfig);

    // 3D Tilt Effect
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    // Calculate generic transforms based on mouse position
    // Range is -0.5 to 0.5 (center is 0)

    // RGB Split Transforms (Opposite shift for Red and Blue to create chromatic aberration)
    const redX = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
    const redY = useTransform(mouseY, [-0.5, 0.5], [-15, 15]);

    const blueX = useTransform(mouseX, [-0.5, 0.5], [15, -15]);
    const blueY = useTransform(mouseY, [-0.5, 0.5], [15, -15]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;

        // Normalize to -0.5 to 0.5
        const xPct = (mouseXVal / width) - 0.5;
        const yPct = (mouseYVal / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={containerRef}
            className={`relative overflow-hidden cursor-none perspective-1000 group ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ rotateY: 1080, opacity: 0, scale: 0.5, filter: "blur(10px)" }}
            whileInView={{ rotateY: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
                duration: 2,
                ease: [0.22, 1, 0.36, 1] // Custom easeOutQuint-ish for smooth settle
            }}
            style={{
                perspective: "1000px",
                transformStyle: "preserve-3d"
            }}
        >
            {/* 3D Container - Inner content that tilts */}
            <motion.div
                className="relative w-full h-full transform-style-3d will-change-transform"
                style={{
                    rotateX, // X Rotation (Vertical tilt)
                    rotateY, // Y Rotation (Horizontal tilt)
                }}
            >
                {/* Red Channel - Glitch Layer (Offset slightly) */}
                <motion.div
                    className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%] mix-blend-screen opacity-50 pointer-events-none z-0 filter blur-[1px]"
                    style={{ x: redX, y: redY }}
                >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                </motion.div>

                {/* Blue Channel - Glitch Layer (Offset opposite) */}
                <motion.div
                    className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%] mix-blend-screen opacity-50 pointer-events-none z-0 filter blur-[1px]"
                    style={{ x: blueX, y: blueY }}
                >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                </motion.div>

                {/* Main Image - Sharp */}
                {/* Scaled up slightly to cover edges during tilt */}
                <div className="relative w-[110%] h-[110%] -left-[5%] -top-[5%] z-10">
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                </div>

                {/* Shine/Glare Effect */}
                <div className="absolute inset-0 z-20 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />

            </motion.div>
        </motion.div>
    );
}
