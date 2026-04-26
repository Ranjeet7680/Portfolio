// @ts-nocheck
import { GlassCard } from "@/components/ui/GlassCard";
import { Button3D } from "@/components/ui/Button3D";

export const metadata = {
    title: "Blog | Ranjeet Kumar",
};

const posts = [
    {
        id: 1,
        title: "Introduction of generating ai by Ranjeet Kumar",
        date: "Latest",
        excerpt: "An introduction to Generative AI and its future potential.",
        link: "https://rajranjeet7680.wixsite.com/ranjeet-kumar/post/introduction-of-generating-ai-by-ranjeet-kumar"
    },
    {
        id: 2,
        title: "Top BEST Startup Companies",
        date: "Latest",
        excerpt: "Certainly! Here are some promising startups in India that you might find interesting: Urban Company: A marketplace for independent...",
        link: "https://rajranjeet7680.wixsite.com/ranjeet-kumar/post/top-best-startup-companies"
    },
    {
        id: 3,
        title: "TOP BUSINESS IDEAS",
        date: "Latest",
        excerpt: "Certainly! Starting a business can be an exciting and rewarding venture. Here are ten business ideas that you might consider: Website..",
        link: "https://rajranjeet7680.wixsite.com/ranjeet-kumar/post/top-business-ideas"
    },
    {
        id: 4,
        title: "How to learn CODING by RANJEET KUMAR",
        date: "Latest",
        excerpt: "Learning to code is an exciting journey! Whether you’re a beginner or someone looking to enhance your skills, here are some steps to get...",
        link: "https://rajranjeet7680.wixsite.com/ranjeet-kumar/post/how-to-learn-coding"
    },
    {
        id: 5,
        title: "How to make software or APP",
        date: "Latest",
        excerpt: "Creating software or an app involves several steps, and I'll guide you through the process. Whether you're a beginner or have some...",
        link: "https://rajranjeet7680.wixsite.com/ranjeet-kumar/post/how-to-make-software-or-app"
    }
];

export default function BlogPage() {
    return (
        <main className="container mx-auto px-4 py-24 min-h-screen">
            <h1 className="text-4xl font-bold font-heading mb-8 text-center mt-12">Latest Insights</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                    <a key={post.id} href={post.link} target="_blank" rel="noopener noreferrer" className="block h-full transition-transform hover:-translate-y-1">
                        <GlassCard className="flex flex-col h-full hover:border-primary-start/50 transition-colors cursor-pointer">
                            <div className="h-40 bg-white/5 rounded-lg mb-4 flex items-center justify-center text-gray-500 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-start/10 to-transparent pointer-events-none" />
                                <span className="font-mono text-sm tracking-widest text-primary-start/70">VLOG {post.id}</span>
                            </div>
                            <h2 className="text-xl font-bold mb-2 text-white dark:text-white text-gray-900 group-hover:text-primary-start transition-colors">{post.title}</h2>
                            <p className="text-xs text-primary-start mb-4 uppercase tracking-wider">{post.date}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 flex-1">{post.excerpt}</p>
                            <Button3D variant="outline" className="w-full text-sm pointer-events-none">Read More</Button3D>
                        </GlassCard>
                    </a>
                ))}
            </div>
        </main>
    );
}
