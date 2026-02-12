"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';

interface SlicedImageProps {
    src: string;
    alt: string;
    className?: string;
}

const SLICE_COUNT = 6;

export default function SlicedImage({ src, alt, className }: SlicedImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    // Using motion values for high-performance updates
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const slices = Array.from({ length: SLICE_COUNT });

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden cursor-crosshair group ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ isolation: 'isolate' }}
        >
            {/* Cyberpunk Glitch Background - Visible through cracks */}
            <div className="absolute inset-0 bg-neutral-900 pointer-events-none -z-10">
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 via-violet-900 to-fuchsia-900 opacity-40 animate-pulse" />
            </div>

            <div className="flex w-full h-full relative z-10">
                {slices.map((_, i) => (
                    <Slice
                        key={i}
                        index={i}
                        total={SLICE_COUNT}
                        src={src}
                        alt={alt}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        containerWidth={containerSize.width}
                    />
                ))}
            </div>

            {/* Flash Overlay */}
            <div className="absolute inset-0 bg-white pointer-events-none z-50 mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </div>
    );
}

function Slice({ index, total, src, alt, mouseX, mouseY, containerWidth }: {
    index: number;
    total: number;
    src: string;
    alt: string;
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
    containerWidth: number;
}) {
    // Determine entrance animation direction (Alternating Top/Bottom)
    const initialY = index % 2 === 0 ? "-100%" : "100%";

    // Smooth mouse position for fluid animations
    const xSmooth = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const ySmooth = useSpring(mouseY, { stiffness: 150, damping: 20 });

    // Calculate Hover Effect
    // Vertical Shift based on horizontal proximity (Wave)
    const yTransform = useTransform(xSmooth, (x: number) => {
        if (x === 0 || containerWidth === 0) return 0;

        // Center of this slice (approx)
        const sliceWidth = containerWidth / total;
        const sliceCenter = (index * sliceWidth) + (sliceWidth / 2);

        // Distance from mouse X to slice center
        const dist = Math.abs(x - sliceCenter);
        const maxDist = containerWidth / 2; // Influence radius

        // Normalized influence (1 at center, 0 far away)
        const influence = Math.max(0, 1 - (dist / maxDist));

        // Wave pattern: Slices move up/down based on index parity + proximity
        // Parity creates staggering. Proximity creates local interaction.
        const direction = index % 2 === 0 ? 1 : -1;

        return influence * direction * 40; // 40px shift
    });

    // Scale Effect
    // Slices near the mouse scale up slightly
    /*
    const scaleTransform = useTransform(xSmooth, (x: number) => {
        if (x === 0 || containerWidth === 0) return 1;
        const sliceWidth = containerWidth / total;
        const sliceCenter = (index * sliceWidth) + (sliceWidth / 2);
        const dist = Math.abs(x - sliceCenter);
        const influence = Math.max(0, 1 - (dist / (containerWidth / 2)));
        return 1 + (influence * 0.1); 
    });
    */

    return (
        <motion.div
            className="relative h-full overflow-hidden flex-shrink-0"
            style={{
                width: `${100 / total}%`, // 16.666%
                y: yTransform,
                // scale: scaleTransform
            }}
            initial={{ y: initialY, filter: "blur(10px)", opacity: 0 }}
            whileInView={{ y: "0%", filter: "blur(0px)", opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
                // Entrance Transition
                y: {
                    type: "spring",
                    stiffness: 70,
                    damping: 20,
                    delay: index * 0.1 // Stagger entrance
                },
                opacity: { duration: 0.8, delay: index * 0.1 },
                filter: { duration: 0.8, delay: index * 0.1 }
            }}
        >
            {/* Image Container for this slice */}
            {/* The inner div must be width: 100% * Total. 
                And transform-translate-x: -100% * index
             */}
            <div
                className="absolute inset-y-0 h-full max-w-none"
                style={{
                    left: `-${index * 100}%`,
                    width: `${total * 100}%`
                }}
            >
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover select-none grayscale group-hover:grayscale-0 transition-all duration-700 pointer-events-none"
                />
            </div>

            {/* Vertical Glass Borders */}
            <div className="absolute inset-y-0 left-0 w-[1px] bg-white/10" />
            <div className="absolute inset-y-0 right-0 w-[1px] bg-black/50" />

            {/* Localized Shine on Hover */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"
                style={{ opacity: useTransform(xSmooth, (x: number) => x > 0 ? 0.5 : 0) }}
            />

        </motion.div>
    );
}
