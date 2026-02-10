
"use client";

import { motion } from "framer-motion";
import { Bot, Code, LayoutDashboard, Terminal } from "lucide-react";

const services = [
    {
        title: "AI Applications",
        icon: <Bot className="w-8 h-8" />,
        desc: "Integrating LLMs and custom models to build intelligent, conversational interfaces.",
    },
    {
        title: "Frontend Engineering",
        icon: <Code className="w-8 h-8" />,
        desc: "Building scalable, performant, and accessible web applications with modern frameworks.",
    },
    {
        title: "System Design",
        icon: <LayoutDashboard className="w-8 h-8" />,
        desc: "Architecting robust backend systems and databases for high-availability apps.",
    },
    {
        title: "Automation",
        icon: <Terminal className="w-8 h-8" />,
        desc: "Scripting and workflow automation to save time and reduce manual errors.",
    },
];

export default function Services() {
    return (
        <section id="services" className="py-24 bg-black text-white px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-sm font-mono text-gray-400 mb-2 tracking-widest uppercase">05. What I Do</h2>
                <h3 className="text-4xl md:text-5xl font-bold mb-16">Solving problems with code.</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -10 }}
                            className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300 group"
                        >
                            <div className="mb-6 p-4 rounded-full bg-zinc-800 w-fit text-gray-400 group-hover:text-cyan-400 group-hover:bg-cyan-950/30 transition-colors">
                                {service.icon}
                            </div>
                            <h4 className="text-xl font-bold mb-4">{service.title}</h4>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
