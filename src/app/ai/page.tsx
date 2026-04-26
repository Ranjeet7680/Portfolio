
"use client";

import { useState, useRef, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button3D } from "@/components/ui/Button3D";
import { Send, Bot, User, Sparkles, Zap, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: number;
    role: "user" | "model";
    text: string;
}

export default function AIPage() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, role: "model", text: "Hello! I'm your AI assistant powered by OpenAI. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const presetQuestions = [
        "Who is Ranjeet?",
        "What are Ranjeet's skills?",
        "Tell me about your projects",
        "How can I contact Ranjeet?"
    ];

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg: Message = { id: Date.now(), role: "user", text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            // First check the 10,000+ local database for a fast answer
            let localAnswer = null;
            try {
                const dbRes = await fetch("/offline-qa.json");
                if (dbRes.ok) {
                    const db = await dbRes.json();
                    const normalized = input.trim().toLowerCase();
                    // 1. Try exact match first
                    let bestMatchKey = Object.keys(db).find(k => k.toLowerCase() === normalized);
                    
                    // 2. Try partial match but only for significant length keys to avoid false positives on 'hi'
                    if (!bestMatchKey) {
                        bestMatchKey = Object.keys(db).find(k => k.length > 5 && normalized.includes(k.toLowerCase()));
                    }

                    if (bestMatchKey) {
                        localAnswer = db[bestMatchKey][0];
                    }
                }
            } catch (e) {
                console.warn("Failed to load local 10,000+ database", e);
            }

            if (localAnswer) {
                const botMsg: Message = { id: Date.now() + 1, role: "model", text: `${localAnswer} (Offline Database)` };
                setMessages(prev => [...prev, botMsg]);
                setIsLoading(false);
                return;
            }

            // Fallback to OpenAI API if not found locally
            const res = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer sk-mnopqrstuvwxabcdmnopqrstuvwxabcdmnopqrst`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "You are an AI assistant. Help the user with their queries." },
                        { role: "user", content: input }
                    ]
                }),
            });

            const data = await res.json();

            if (data.choices && data.choices.length > 0) {
                const text = data.choices[0].message.content;
                const botMsg: Message = { id: Date.now() + 1, role: "model", text: text };
                setMessages(prev => [...prev, botMsg]);
            } else {
                console.error("No text in response", data);
                import("@/lib/chat-rules").then(({ getFallbackResponse }) => {
                    const fallback = getFallbackResponse(input);
                    setMessages(prev => [...prev, { id: Date.now() + 1, role: "model", text: fallback }]);
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            import("@/lib/chat-rules").then(({ getFallbackResponse }) => {
                const fallback = getFallbackResponse(input);
                setMessages(prev => [...prev, { id: Date.now() + 1, role: "model", text: fallback }]);
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="container mx-auto px-2 md:px-4 pt-20 pb-24 md:py-24 h-[100dvh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden">
            <div className="flex-none text-center mt-2 md:mt-8 mb-2 md:mb-8">
                <h1 className="text-3xl md:text-5xl font-bold font-heading mb-2 md:mb-4 text-gray-900 dark:text-white flex items-center justify-center gap-2 md:gap-3">
                    <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-primary-start animate-pulse" />
                    AI Assistant
                </h1>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 hidden md:block max-w-lg mx-auto">
                    Ask me anything about Ranjeet's portfolio, skills, and experience. I'm powered by advanced AI to provide instant answers.
                </p>
            </div>

            <GlassCard className="w-full max-w-4xl flex-1 flex flex-col p-0 overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl relative mb-4 md:mb-0 max-h-full">
                {/* Header */}
                <div className="p-4 bg-white/50 dark:bg-black/40 backdrop-blur-md border-b border-black/10 dark:border-white/10 flex justify-between items-center z-10">
                    <div className="flex items-center gap-3">
                        <div className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </div>
                        <div>
                            <span className="font-bold text-gray-900 dark:text-white block leading-tight">Ranjeet's Agent</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Powered by OpenAI GPT</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => setMessages([{ id: Date.now(), role: "model", text: "Hello! I'm your AI assistant powered by OpenAI. How can I help you today?" }])}
                        className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors text-gray-500 hover:text-red-500"
                        title="Clear Chat"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-gradient-to-b from-transparent to-black/5 dark:to-white/5">
                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <motion.div 
                                key={msg.id} 
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`flex items-end gap-3 max-w-[85%] md:max-w-[75%]`}>
                                    {msg.role === "model" && (
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary-start to-primary-end flex items-center justify-center text-white shadow-lg shrink-0">
                                            <Bot className="w-4 h-4 md:w-5 md:h-5" />
                                        </div>
                                    )}
                                    <div className={`p-4 md:p-5 rounded-2xl whitespace-pre-wrap shadow-sm ${msg.role === "user"
                                            ? "bg-gradient-to-r from-primary-start to-primary-end text-white rounded-br-none"
                                            : "bg-white dark:bg-[#1a1a1a] border border-black/5 dark:border-white/5 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-black/5"
                                        }`}>
                                        <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
                                    </div>
                                    {msg.role === "user" && (
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 ring-1 ring-black/5 dark:ring-white/10 shrink-0">
                                            <User className="w-4 h-4 md:w-5 md:h-5" />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    
                    {isLoading && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex justify-start"
                        >
                            <div className="flex items-end gap-3">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary-start to-primary-end flex items-center justify-center text-white shadow-lg shrink-0">
                                    <Bot className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                                <div className="bg-white dark:bg-[#1a1a1a] border border-black/5 dark:border-white/5 p-4 md:p-5 rounded-2xl rounded-bl-none shadow-sm">
                                    <div className="flex gap-2">
                                        <span className="w-2.5 h-2.5 bg-primary-start/60 rounded-full animate-bounce delay-0" />
                                        <span className="w-2.5 h-2.5 bg-primary-start/80 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <span className="w-2.5 h-2.5 bg-primary-start rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} className="h-1" />
                </div>

                {/* Quick Actions (Only show if few messages and not loading) */}
                {messages.length < 3 && !isLoading && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-4 pb-2 flex flex-wrap gap-2 justify-center"
                    >
                        {presetQuestions.map((q, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setInput(q);
                                }}
                                className="text-xs md:text-sm bg-white/50 dark:bg-white/5 hover:bg-primary-start/10 hover:text-primary-start dark:hover:bg-primary-start/20 border border-black/10 dark:border-white/10 rounded-full px-4 py-2 text-gray-600 dark:text-gray-300 transition-all flex items-center gap-1.5"
                            >
                                <Zap className="w-3 h-3 text-primary-start" />
                                {q}
                            </button>
                        ))}
                    </motion.div>
                )}

                {/* Input */}
                <form onSubmit={handleSend} className="p-4 bg-white/50 dark:bg-black/40 backdrop-blur-md border-t border-black/10 dark:border-white/10 flex gap-2 sm:gap-3 z-10">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 rounded-2xl px-5 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-start/50 focus:border-primary-start placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-inner transition-all"
                        disabled={isLoading}
                    />
                    <Button3D variant="primary" className="px-6 md:px-8 rounded-2xl" disabled={isLoading || !input.trim()}>
                        <Send className="w-4 h-4" />
                    </Button3D>
                </form>
            </GlassCard>
        </main>
    );
}
