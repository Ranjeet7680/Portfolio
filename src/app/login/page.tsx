"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button3D } from "@/components/ui/Button3D";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, Github, AlertCircle } from "lucide-react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Import auth directly for email/password actions

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { signInWithGoogle, user } = useAuth();
    const router = useRouter();

    if (user) {
        // Redirect if already logged in
        router.push("/");
    }

    const handleGoogleSignIn = async () => {
        setError(null);
        setLoading(true);
        try {
            await signInWithGoogle();
            router.push("/");
        } catch (err: any) {
            setError(err.message || "Failed to sign in with Google");
        } finally {
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            router.push("/");
        } catch (err: any) {
            // Friendly error messages
            if (err.code === 'auth/invalid-credential') setError("Invalid email or password.");
            else if (err.code === 'auth/email-already-in-use') setError("Email is already registered.");
            else if (err.code === 'auth/weak-password') setError("Password should be at least 6 characters.");
            else setError(err.message || "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-24 pb-12 flex items-center justify-center relative overflow-hidden px-4">
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-start/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="w-full max-w-md relative z-10">
                <GlassCard className="border-t border-white/50 dark:border-white/10 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold font-heading mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-start to-primary-end">
                            {isLogin ? "Welcome Back" : "Create Account"}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {isLogin
                                ? "Enter your credentials to access your account"
                                : "Join us specifically for you"}
                        </p>
                    </div>

                    <form onSubmit={handleEmailAuth} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 pl-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-start transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-primary-start focus:ring-1 focus:ring-primary-start transition-all dark:text-white dark:placeholder-gray-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 pl-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-start transition-colors" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-primary-start focus:ring-1 focus:ring-primary-start transition-all dark:text-white dark:placeholder-gray-500"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        <Button3D
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Processing..." : (isLogin ? "Sign In" : "Sign Up")}
                        </Button3D>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-transparent px-2 text-gray-500 backdrop-blur-md rounded-md">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/10 transition-colors text-sm font-medium text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Google
                        </button>
                    </div>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                        </span>
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="ml-2 font-medium text-primary-start hover:underline focus:outline-none"
                        >
                            {isLogin ? "Sign Up" : "Sign In"}
                        </button>
                    </div>
                </GlassCard>
            </div>
        </main>
    );
}
