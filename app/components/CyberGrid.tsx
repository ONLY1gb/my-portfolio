"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface CyberGridProps {
    src: string;
    alt: string;
    className?: string;
}

const ROWS = 10;
const COLS = 8; // Adjust based on aspect ratio 4:5 (8x10 or 12x15)

export default function CyberGrid({ src, alt, className }: CyberGridProps) {
    // Generate grid cells
    const cells = useMemo(() => {
        return Array.from({ length: ROWS * COLS }, (_, i) => ({
            id: i,
            row: Math.floor(i / COLS),
            col: i % COLS
        }));
    }, []);

    return (
        <div
            className={`relative overflow-hidden cursor-crosshair group ${className}`}
        >
            {/* Chaotic Underlayer */}
            <div className="absolute inset-0 bg-neutral-900 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />

                {/* Glowing Core */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-600 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-cyan-500 rounded-full blur-[60px]" />
            </div>

            {/* Grid Container */}
            <div
                className="relative z-10 w-full h-full grid gap-[1px]" // Using gap to show grid lines initially? No, gap 0 for image
                style={{
                    gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                    gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                }}
            >
                {cells.map((cell) => (
                    <GridCell
                        key={cell.id}
                        row={cell.row}
                        col={cell.col}
                        src={src}
                        totalRows={ROWS}
                        totalCols={COLS}
                    />
                ))}
            </div>

            {/* Frame/Border Overlay */}
            <div className="absolute inset-0 border border-white/5 pointer-events-none rounded-2xl" />
        </div>
    );
}

function GridCell({ row, col, src, totalRows, totalCols }: {
    row: number;
    col: number;
    src: string;
    totalRows: number;
    totalCols: number;
}) {
    // Background Position Calculation
    // Percentage needs to be precise. 
    // If 10 rows, bgY should be 0%, ~11%, ~22%... 100%.
    // Formula: (index / (total - 1)) * 100
    const xPct = (col / (totalCols - 1)) * 100;
    const yPct = (row / (totalRows - 1)) * 100;

    return (
        <motion.div
            className="w-full h-full relative overflow-hidden"
            initial={{
                scale: 0.8,
                opacity: 0,
                filter: "grayscale(100%)",
                rotate: Math.random() * 90 - 45
            }}
            whileInView={{
                scale: 1.01, // Slight overlap
                opacity: 1,
                filter: "grayscale(0%)",
                rotate: 0
            }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
                duration: 1.2,
                // Random Stagger or orderly? Let's do random but grouped by distance from center?
                // Simple random is "chaotic construction"
                delay: Math.random() * 0.5,
                type: "spring",
                bounce: 0.4
            }}
            whileHover={{
                scale: 0.85,
                rotate: Math.random() * 10 - 5,
                borderRadius: "20%",
                filter: "brightness(1.5) hue-rotate(90deg)", // Glitch color
                transition: { duration: 0.2 }
            }}
        >
            {/* The Image Fragment */}
            <div
                className="absolute inset-0 w-full h-full bg-no-repeat bg-cover"
                style={{
                    backgroundImage: `url('${src}')`,
                    // Background size must effectively cover the whole container relative to this cell.
                    // If grid is 8x10, then bg-size is 800% 1000%
                    backgroundSize: `${totalCols * 100}% ${totalRows * 100}%`,
                    backgroundPosition: `${xPct}% ${yPct}%`
                }}
            />
        </motion.div>
    );
}
