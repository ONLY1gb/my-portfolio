"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CreditCard, Loader2, CheckCircle2, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import emailjs from '@emailjs/browser';

interface ActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "demo" | "source";
    projectTitle: string;
}

export default function ActionModal({ isOpen, onClose, mode, projectTitle }: ActionModalProps) {
    const [mounted, setMounted] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", reason: "" });
    const [paymentStep, setPaymentStep] = useState<"details" | "card">("details");

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // If Buying Source Code, simulate payment process step 1
        if (mode === "source" && paymentStep === "details") {
            setPaymentStep("card");
            return;
        }

        setStatus("loading");

        // EmailJS Configuration
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

        const actionText = mode === "demo" ? "REQUEST: Live Demo Access" : "PURCHASE: Source Code Inquiry";

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            message: `
                [${actionText} for Project: ${projectTitle}]
                Phone: ${formData.phone}
                Reason/Note: ${formData.reason}
                
                (This is an automated request from the portfolio site.)
            `,
            to_name: "Gautam Bhawsar",
        };

        try {
            // In a real app, integrate Stripe/Razorpay here for "source" mode
            await emailjs.send(serviceId, templateId, templateParams, publicKey);
            setStatus("success");
            setTimeout(() => {
                onClose();
                setStatus("idle");
                setFormData({ name: "", email: "", phone: "", reason: "" });
                setPaymentStep("details");
            }, 3000);
        } catch (error) {
            console.error("EmailJS Error:", error);
            setStatus("error");
        }
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9998] cursor-pointer"
                    />
                    <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-8 pointer-events-auto relative shadow-2xl"
                        >
                            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>

                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {mode === "demo" ? "Request Live Demo" : "Get Source Code"}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    {mode === "demo"
                                        ? "This project is currently in private access. Request a demo link below."
                                        : "Get full access to the source code including documentation and assets."}
                                </p>
                            </div>

                            {status === "success" ? (
                                <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-white">Request Sent!</h4>
                                    <p className="text-gray-400">
                                        {mode === "demo"
                                            ? "I'll review your request and send the demo link shortly."
                                            : "Thanks for your interest! I'll contact you with the payment details securely."}
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {mode === "source" && paymentStep === "card" ? (
                                        /* Mock Payment UI */
                                        <div className="space-y-4">
                                            <div className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                                                <div className="flex justify-between items-center mb-4">
                                                    <span className="text-white font-medium">Total Amount</span>
                                                    <span className="text-2xl font-bold text-green-400">$49.00</span>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="relative">
                                                        <CreditCard className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                                        <input type="text" placeholder="Card Number" className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded text-white focus:outline-none focus:border-green-500" disabled />
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <input type="text" placeholder="MM/YY" className="w-1/2 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded text-white focus:outline-none" disabled />
                                                        <input type="text" placeholder="CVC" className="w-1/2 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded text-white focus:outline-none" disabled />
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                                    <Lock className="w-3 h-3" /> Secure Payment (Simulated)
                                                </p>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={status === "loading"}
                                                className="w-full py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition-colors flex items-center justify-center gap-2"
                                            >
                                                {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Purchase"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setPaymentStep("details")}
                                                className="w-full py-2 text-gray-400 hover:text-white text-sm"
                                            >
                                                Back to Details
                                            </button>
                                        </div>
                                    ) : (
                                        /* User Details Form */
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                                    placeholder="Your Name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                                    placeholder="you@company.com"
                                                />
                                            </div>
                                            {mode === "source" && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-1">Phone (Optional)</label>
                                                    <input
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                                        placeholder="+1 (555) 000-0000"
                                                    />
                                                </div>
                                            )}
                                            {mode === "demo" && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-1">Reason (Optional)</label>
                                                    <textarea
                                                        rows={2}
                                                        value={formData.reason}
                                                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                                        className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                                                        placeholder="Why do you need access?"
                                                    />
                                                </div>
                                            )}

                                            <button
                                                type="submit"
                                                className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mt-2"
                                            >
                                                {mode === "demo" ? "Request Access" : "Proceed to Payment"} <Send className="w-4 h-4" />
                                            </button>
                                        </>
                                    )}
                                </form>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
