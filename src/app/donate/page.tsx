"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Button3D } from "@/components/ui/Button3D";
import { Background3D } from "@/components/canvas/Background3D";
import { Heart, BookOpen, GraduationCap, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function DonatePage() {
    const handleDonate = () => {
        window.open("https://razorpay.me/@ranjeetkumar2238", "_blank");
    };

    return (
        <main className="min-h-screen pt-24 pb-12 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">

                {/* Hero Section */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-500/30"
                    >
                        <Heart className="w-10 h-10 text-white fill-white" />
                    </motion.div>

                    <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
                        Empower <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600">Futures</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        Your contribution helps provide quality education, resources, and mentorship to aspiring students who dream big but lack the means.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
                    {/* Impact Card */}
                    <GlassCard className="p-8 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Why Donate?</h3>
                        <ul className="space-y-4">
                            {[
                                { icon: BookOpen, text: "Provide essential learning materials and books." },
                                { icon: GraduationCap, text: "Sponsor tuition fees for underprivileged students." },
                                { icon: CheckCircle, text: "Support skill development workshops." },
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-4">
                                    <div className="p-2 bg-primary-start/10 rounded-lg text-primary-start">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </GlassCard>

                    {/* Action Card */}
                    <GlassCard className="p-8 bg-gradient-to-br from-pink-500/5 to-rose-500/5 border-pink-500/20">
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Make a Difference</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
                                Every small contribution adds up to create a massive impact. Join us in this journey.
                            </p>

                            <Button3D
                                onClick={handleDonate}
                                className="w-full max-w-sm py-4 text-lg bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-xl shadow-pink-500/20 border-0"
                            >
                                <Heart className="w-5 h-5 mr-2 fill-white/20" /> Donate via Razorpay
                            </Button3D>

                            <p className="text-xs text-gray-400 mt-4">
                                Secure payment gateway provided by Razorpay.
                            </p>
                        </div>
                    </GlassCard>
                </div>

                {/* Trust Section */}
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-sm text-gray-400 font-medium uppercase tracking-widest mb-4">Transparency & Trust</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        100% of your donation goes directly towards educational initiatives. We believe in complete transparency and impact.
                    </p>
                </div>

            </div>
        </main>
    );
}
