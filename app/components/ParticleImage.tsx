"use client";

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    color: string;
    originalR: number;
    originalG: number;
    originalB: number;
    size: number;
    vx: number;
    vy: number;
    ease: number;
}

interface ParticleImageProps {
    src: string;
    alt: string;
    className?: string;
}

export default function ParticleImage({ src, alt, className }: ParticleImageProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouse = { x: 0, y: 0, radius: 80 };

        let imageWidth = 0;
        let imageHeight = 0;

        const image = new Image();
        image.src = src;
        image.crossOrigin = "Anonymous";

        image.onload = () => {
            setIsLoading(false);
            init();
            animate();
        };

        const init = () => {
            // Check container dimensions
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;

            imageWidth = rect.width;
            imageHeight = rect.height;

            // Draw image to canvas to read pixel data
            // Maintain aspect ratio
            const imgAspect = image.width / image.height;
            const canvasAspect = canvas.width / canvas.height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (imgAspect > canvasAspect) {
                // Image is wider, fit height
                drawHeight = canvas.height;
                drawWidth = drawHeight * imgAspect;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            } else {
                // Image is taller, fit width
                drawWidth = canvas.width;
                drawHeight = drawWidth / imgAspect;
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            }

            // Using 'cover' like object-cover:
            // Actually, we usually want to fill the rect. Let's simulate object-cover.
            const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
            const x = (canvas.width / 2) - (image.width / 2) * scale;
            const y = (canvas.height / 2) - (image.height / 2) * scale;

            ctx.drawImage(image, x, y, image.width * scale, image.height * scale);

            const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles = [];
            const density = 6; // Skip pixels for performance (higher = fewer particles)

            for (let y = 0; y < canvas.height; y += density) {
                for (let x = 0; x < canvas.width; x += density) {
                    const index = (y * canvas.width + x) * 4;
                    const r = pixels.data[index];
                    const g = pixels.data[index + 1];
                    const b = pixels.data[index + 2];
                    const a = pixels.data[index + 3];

                    if (a > 128) {
                        particles.push({
                            x: Math.random() * canvas.width, // Start random for "assembly" effect
                            y: Math.random() * canvas.height,
                            originX: x,
                            originY: y,
                            color: `rgb(${r},${g},${b})`,
                            originalR: r,
                            originalG: g,
                            originalB: b,
                            size: 1.5, // Smaller, finer particles
                            vx: 0,
                            vy: 0,
                            ease: 0.15 // Snappier return
                        });
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                // Physics
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;

                // Interaction Radius
                const maxDistance = mouse.radius;
                const force = (maxDistance - distance) / maxDistance;

                // Repulsion logic
                if (distance < mouse.radius) {
                    const repulsionStrength = 30; // Stronger push
                    p.vx -= forceDirectionX * force * repulsionStrength;
                    p.vy -= forceDirectionY * force * repulsionStrength;

                    // Highlight effect: Particles near cursor turn white/cyan
                    // We don't change p.color string permanently, we render differently
                } else {
                    // Return to origin
                    if (p.x !== p.originX) {
                        const dx = p.x - p.originX;
                        p.vx -= dx * p.ease * 0.5; // Damped return
                    }
                    if (p.y !== p.originY) {
                        const dy = p.y - p.originY;
                        p.vy -= dy * p.ease * 0.5;
                    }
                }

                // Friction
                p.vx *= 0.85;
                p.vy *= 0.85;

                p.x += p.vx;
                p.y += p.vy;

                // Color Calculation
                // Calculate velocity magnitude to determine energy
                const velocity = Math.sqrt(p.vx * p.vx + p.vy * p.vy);

                // Draw
                // If moving fast or near mouse, brighten up
                if (velocity > 0.5) {
                    // High energy color (Cyan/White mix)
                    // The faster it moves, the more 'electric' it looks
                    ctx.fillStyle = `rgba(${Math.min(255, p.originalR + 100)}, ${Math.min(255, p.originalG + 200)}, 255, 1)`;
                } else {
                    ctx.fillStyle = p.color;
                }

                ctx.fillRect(p.x, p.y, p.size, p.size);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -9999;
            mouse.y = -9999;
        }

        // Window resize handling
        window.addEventListener('resize', init);
        // Canvas interaction
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('resize', init);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [src]);

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
            <canvas
                ref={canvasRef}
                className="w-full h-full block"
            />
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 animate-pulse">
                    <span className="text-gray-500 text-xs">Loading particles...</span>
                </div>
            )}
        </div>
    );
}
