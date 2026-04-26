// @ts-nocheck
"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button3D } from "@/components/ui/Button3D";
import { Upload, DollarSign, ShoppingBag } from "lucide-react";

export default function ShopUploadPage() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate upload
        setTimeout(() => {
            setLoading(false);
            alert("Product listed successfully (simulated)!");
        }, 2000);
    };

    return (
        <main className="container mx-auto px-4 py-24 min-h-screen">
            <h1 className="text-4xl font-bold font-heading mb-8 text-center mt-12">List New Product</h1>

            <div className="max-w-2xl mx-auto">
                <GlassCard className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Product Name</label>
                            <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-start" required />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Price ($)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3.5 text-gray-500">$</span>
                                    <input type="number" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 pl-8 text-white focus:outline-none focus:border-primary-start" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                                <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-start">
                                    <option>Digital Asset</option>
                                    <option>Service</option>
                                    <option>Merchandise</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                            <textarea rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-start" required />
                        </div>

                        <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:bg-white/5 transition-colors cursor-pointer">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-400">Upload Product Images</p>
                        </div>

                        <Button3D variant="primary" className="w-full py-4 text-base" disabled={loading}>
                            {loading ? "Listing..." : "List Product"}
                            {!loading && <ShoppingBag className="w-4 h-4 ml-2" />}
                        </Button3D>
                    </form>
                </GlassCard>
            </div>
        </main>
    );
}
