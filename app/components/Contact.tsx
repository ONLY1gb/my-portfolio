
"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, ArrowRight } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-32 bg-zinc-950 text-white px-6 md:px-12 flex flex-col items-center text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl space-y-8"
            >
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
                    Let's build something <span className="text-cyan-500">extraordinary</span>.
                </h2>
                <p className="text-xl text-gray-400 max-w-xl mx-auto">
                    Whether you have a project in mind or just want to say hi, I'm always open to new ideas and collaborations.
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center pt-8">
                    <a
                        href="mailto:contact@gautambhawsar.dev"
                        className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Say Hello <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    </a>

                    <a
                        href="#"
                        className="px-8 py-4 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-full transition-all hover:bg-zinc-800 hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                        Schedule a Call <ArrowRight className="w-5 h-5" />
                    </a>
                </div>

                <div className="flex gap-8 justify-center pt-16 opacity-50">
                    <SocialIcon href="#" icon={<Github />} />
                    <SocialIcon href="#" icon={<Linkedin />} />
                    <SocialIcon href="#" icon={<Twitter />} />
                </div>
            </motion.div>
        </section>
    );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a href={href} className="hover:text-white hover:scale-110 transition-all duration-300">
            {icon}
        </a>
    )
}
