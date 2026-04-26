// @ts-nocheck
import { GlassCard } from "@/components/ui/GlassCard";
import { Button3D } from "@/components/ui/Button3D";
import { Play } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Videos | Ranjeet Kumar",
};

const videos = [
    { id: 1, title: "Next.js 15 Tutorial", views: "1.2k" },
    { id: 2, title: "Intro to AI Agents", views: "3.5k" },
    { id: 3, title: "Portfolio Code Walkthrough", views: "800" },
];

export default function VideoPage() {
    return (
        <main className="container mx-auto px-4 py-24 min-h-screen">
            <h1 className="text-4xl font-bold font-heading mb-8 text-center mt-12">Video Library</h1>

            <div className="flex justify-center mb-8">
                <Link href="/video/upload">
                    <Button3D variant="outline">
                        + Upload New Video
                    </Button3D>
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map(video => (
                    <GlassCard key={video.id} className="group overflow-hidden cursor-pointer p-0">
                        <div className="aspect-video bg-black/50 relative flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-5 h-5 text-white fill-white" />
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg text-white mb-2">{video.title}</h3>
                            <p className="text-sm text-gray-500">{video.views} views</p>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </main>
    );
}
