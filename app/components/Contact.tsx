
"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import ContactModal from "./ContactModal";
import { PopupModal } from "react-calendly";

export default function Contact() {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section id="contact" className="py-32 bg-zinc-950 text-white px-6 md:px-12 flex flex-col items-center text-center relative">
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
                    <button
                        onClick={() => setIsContactOpen(true)}
                        className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Say Hello <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    </button>

                    <button
                        onClick={() => setIsCalendlyOpen(true)}
                        className="px-8 py-4 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-full transition-all hover:bg-zinc-800 hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                        Schedule a Call <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex gap-8 justify-center pt-16 opacity-50">
                    <SocialIcon href="https://github.com/" icon={<Github />} />
                    <SocialIcon href="https://www.linkedin.com/in/gautam-bhawsar-82267625b/" icon={<Linkedin />} />
                    <SocialIcon href="https://www.instagram.com/er.gautam_bhawsar?igsh=MTJocGt2dDBsMGZiaA==" icon={<Instagram />} />
                </div>
            </motion.div>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

            {/* Calendly Modal */}
            {mounted && (
                <PopupModal
                    url={process.env.NEXT_PUBLIC_CALENDLY_URL || ""}
                    onModalClose={() => setIsCalendlyOpen(false)}
                    open={isCalendlyOpen}
                    rootElement={document.body}
                />
            )}
        </section>
    );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white hover:scale-110 transition-all duration-300"
        >
            {icon}
        </a>
    )
}
