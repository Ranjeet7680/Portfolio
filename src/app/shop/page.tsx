"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button3D } from "@/components/ui/Button3D";
import { PaymentModal } from "@/components/features/PaymentModal";
import Link from "next/link";
import { Sparkles, Zap, Bot, Box, Crown, Code } from "lucide-react";

const products = [
    {
        id: 1,
        title: "AI Avatar Pack",
        price: "$29",
        type: "AI Model",
        description: "Generate hyper-realistic avatars.",
        icon: Bot,
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        id: 2,
        title: "Custom LoRA Model",
        price: "$199",
        type: "Service",
        description: "Fine-tune Stable Diffusion on your own dataset.",
        icon: Sparkles,
        gradient: "from-purple-500 to-pink-500"
    },
    {
        id: 3,
        title: "GPT-4 System Prompts",
        price: "$19",
        type: "Digital",
        description: "100+ optimized prompts for coding & writing.",
        icon: Code,
        gradient: "from-emerald-500 to-teal-500"
    },
    {
        id: 4,
        title: "Neural Art 4K",
        price: "$49",
        type: "Asset Pack",
        description: "High-res abstract neural network backgrounds.",
        icon: Box,
        gradient: "from-orange-500 to-red-500"
    },
    {
        id: 5,
        title: "AI Consultant Hour",
        price: "$150",
        type: "Mentorship",
        description: "1-on-1 strategy session for integrating AI.",
        icon: Crown,
        gradient: "from-yellow-400 to-orange-500"
    },
    {
        id: 6,
        title: "Agent Blueprint",
        price: "$89",
        type: "Codebase",
        description: "Full source code for autonomous agents.",
        icon: Zap,
        gradient: "from-violet-600 to-indigo-600"
    },
];

export default function ShopPage() {
    const [selectedProduct, setSelectedProduct] = useState<{ id: number, title: string, price: string } | null>(null);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    const handleBuy = (product: typeof products[0]) => {
        setSelectedProduct(product);
        setIsPaymentOpen(true);
    };

    return (
        <main className="container mx-auto px-4 py-24 min-h-screen">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold font-heading mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary-start to-primary-end">
                    AI Digital Store
                </h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Premium AI assets, services, and models to supercharge your next project.
                    Powered by secure blockchain & stripe payments.
                </p>
            </div>

            <div className="flex justify-center mb-16">
                <Link href="/shop/upload">
                    <Button3D variant="outline" className="border-dashed border-2">
                        + List Your AI Product
                    </Button3D>
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map(product => (
                    <GlassCard
                        key={product.id}
                        className="p-1 flex flex-col group hover:shadow-2xl hover:shadow-primary-start/10 transition-shadow duration-500"
                    >
                        <div className="p-6 flex flex-col h-full bg-white/50 dark:bg-black/40 rounded-2xl">
                            {/* Icon / Image Placeholder */}
                            <div className={`h-48 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${product.gradient} group-hover:scale-[1.02] transition-transform duration-500 relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
                                <product.icon className="w-16 h-16 text-white relative z-10 drop-shadow-lg" />

                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                                    {product.type}
                                </div>
                            </div>

                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-xl text-gray-900 dark:text-white leading-tight">{product.title}</h3>
                            </div>

                            <p className="text-gray-500 text-sm mb-6 flex-grow">
                                {product.description}
                            </p>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                                <span className="text-2xl font-bold text-gray-900 dark:text-white font-mono">
                                    {product.price}
                                </span>
                                <Button3D
                                    onClick={() => handleBuy(product)}
                                    variant="primary"
                                    className="px-6"
                                >
                                    Buy Now
                                </Button3D>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>

            <PaymentModal
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                product={selectedProduct}
            />
        </main>
    );
}
