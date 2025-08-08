import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAuthSuccess: (user: any, accessToken: string) => void;
};

const AuthModal = ({ isOpen, onClose, onAuthSuccess }: AuthModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("signup-email") as string;
        const password = formData.get("signup-password") as string;
        const username = formData.get("username") as string;

        try {

        } catch (err: any) {
            console.error("Signup error:", err);
            setError(err.message || "Sign up failed");
        } finally {
            setIsLoading(false);
        };
    };

    const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("signin-email") as string;
        const password = formData.get("signin-password") as string;

        try {

        } catch (err: any) {
            console.error("Signin error:", err);
            setError(err.message || "Sign in failed");
        } finally {
            setIsLoading(false);
        };
    };

    if (!isOpen) {
        return null;
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="w-full max-w-md"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="rounded-lg border border-slate-200 bg-white/95 backdrop-blur-sm text-slate-950 shadow-lg">
                        <div className="flex flex-col space-y-1.5 p-6 text-center relative">
                            <button
                                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity
                                    hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                                onClick={onClose}
                            >
                                <X size={16} />
                            </button>
                            <h3 className="text-2xl font-semibold leading-none tracking-tight">Welcome to BlackJack</h3>
                            <p className="text-sm text-slate-500">Sign in or create an account to track your stats</p>
                        </div>
                        <div className="p-6 pt-0">
                            <div className="w-full">
                                <div className="inline-flex h-10 items-center justify-center rounded-md bg-slate-100
                                    p-1 text-slate-500 w-full"
                                >
                                    <button
                                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm
                                            px-3 py-1.5 text-sm font-medium ring-offset-white transition-all
                                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950
                                            focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
                                            flex-1 ${activeTab === "signin" ? "bg-white text-slate-950 shadow-sm" : ""}`
                                        }
                                        onClick={() => setActiveTab("signin")}
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm
                                            px-3 py-1.5 text-sm font-medium ring-offset-white transition-all
                                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950
                                            focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
                                            flex-1 ${activeTab === "signup" ? "bg-white text-slate-950 shadow-sm" : ""}`
                                        }
                                        onClick={() => setActiveTab("signup")}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                                <div className="mt-2">
                                    {activeTab === "signin" && (
                                        <form className="space-y-4" onSubmit={handleSignin}>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium leading-none
                                                    peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    className="flex h-10 w-full rounded-md border border-slate-200
                                                        bg-white px-3 py-2 text-sm ring-offset-white file:border-0
                                                        file:bg-transparent file:text-sm file:font-medium
                                                        placeholder:text-slate-500 focus-visible:outline-none
                                                        focus-visible:ring-2 focus-visible:ring-slate-950
                                                        focus-visible:ring-offset-2 disabled:cursor-not-allowed
                                                        disabled:opacity-50"
                                                    id="signin-email"
                                                    name="signin-email"
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium leading-none
                                                    peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    className="flex h-10 w-full rounded-md border border-slate-200
                                                        bg-white px-3 py-2 text-sm ring-offset-white file:border-0
                                                        file:bg-transparent file:text-sm file:font-medium
                                                        placeholder:text-slate-500 focus-visible:outline-none
                                                        focus-visible:ring-2 focus-visible:ring-slate-950
                                                        focus-visible:ring-offset-2 disabled:cursor-not-allowed
                                                        disabled:opacity-50"
                                                    id="signin-password"
                                                    name="signin-password"
                                                    type="password"
                                                    placeholder="Enter your password"
                                                    required
                                                />
                                            </div>
                                            {error && (
                                                <div className="text-red-600 text-sm text-center font-medium">{error}</div>
                                            )}
                                        </form>
                                    )}
                                    {activeTab === "signup" && (
                                        <form className="space-y-4" onSubmit={handleSignup}>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium leading-none
                                                    peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Username
                                                </label>
                                                <input
                                                    className="flex h-10 w-full rounded-md border border-slate-200
                                                        bg-white px-3 py-2 text-sm ring-offset-white file:border-0
                                                        file:bg-transparent file:text-sm file:font-medium
                                                        placeholder:text-slate-500 focus-visible:outline-none
                                                        focus-visible:ring-2 focus-visible:ring-slate-950
                                                        focus-visible:ring-offset-2 disabled:cursor-not-allowed
                                                        disabled:opacity-50"
                                                    id="username"
                                                    name="username"
                                                    type="text"
                                                    placeholder="Choose a username"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium leading-none
                                                    peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    className="flex h-10 w-full rounded-md border border-slate-200
                                                        bg-white px-3 py-2 text-sm ring-offset-white file:border-0
                                                        file:bg-transparent file:text-sm file:font-medium
                                                        placeholder:text-slate-500 focus-visible:outline-none
                                                        focus-visible:ring-2 focus-visible:ring-slate-950
                                                        focus-visible:ring-offset-2 disabled:cursor-not-allowed
                                                        disabled:opacity-50"
                                                    id="signup-email"
                                                    name="signup-email"
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium leading-none
                                                    peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    className="flex h-10 w-full rounded-md border border-slate-200
                                                        bg-white px-3 py-2 text-sm ring-offset-white file:border-0
                                                        file:bg-transparent file:text-sm file:font-medium
                                                        placeholder:text-slate-500 focus-visible:outline-none
                                                        focus-visible:ring-2 focus-visible:ring-slate-950
                                                        focus-visible:ring-offset-2 disabled:cursor-not-allowed
                                                        disabled:opacity-50"
                                                    id="signup-password"
                                                    name="signup-password"
                                                    type="password"
                                                    placeholder="Enter your password"
                                                    required
                                                />
                                            </div>
                                            {error && (
                                                <div className="text-red-600 text-sm text-center font-medium">{error}</div>
                                            )}
                                            <button
                                                className="inline-flex items-center justify-center whitespace-nowrap
                                                    rounded-md text-sm font-medium ring-offset-white transition-colors
                                                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950
                                                    focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
                                                    bg-slate-900 text-slate-50 hover:bg-slate-900/90 h-10 px-4 py-2 w-full"
                                                type="submit"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? "Creating Account..." : "Sign Up"}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AuthModal;