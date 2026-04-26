// @ts-nocheck
import { GlassCard } from "@/components/ui/GlassCard";
import { MessageSquare, Users } from "lucide-react";
import { ChatWindow } from "@/components/features/ChatWindow";

export const metadata = {
    title: "Forum | Ranjeet Kumar",
};

const topics = [
    { id: 1, title: "Introduction", count: 120, description: "Introduce yourself to the community." },
    { id: 2, title: "Web Development", count: 85, description: "React, Next.js, and frontend discussions." },
    { id: 3, title: "AI & ML", count: 200, description: "Deep learning models and AI trends." },
    { id: 4, title: "Career Advice", count: 50, description: "Tips for jobs and internships." },
];

export default function ForumPage() {
    return (
        <main className="container mx-auto px-4 py-24 min-h-screen">
            <h1 className="text-4xl font-bold font-heading mb-8 text-center mt-12 text-gray-900 dark:text-white">Community Forum</h1>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Topics List */}
                <div className="lg:col-span-1 space-y-4">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Topics</h2>
                    {topics.map(topic => (
                        <GlassCard key={topic.id} className="cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors p-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{topic.title}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{topic.description}</p>
                                </div>
                                <span className="text-xs bg-black/5 dark:bg-white/10 px-2 py-1 rounded-full text-gray-600 dark:text-gray-300">{topic.count}</span>
                            </div>
                        </GlassCard>
                    ))}
                </div>

                {/* Chat Area */}
                <div className="lg:col-span-2">
                    <ChatWindow />
                </div>
            </div>
        </main>
    );
}
