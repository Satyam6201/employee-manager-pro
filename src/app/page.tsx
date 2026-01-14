"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowRight, Lock, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-950 flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Main Content Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl text-center z-10"
      >
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-8 border border-indigo-100 dark:border-indigo-800"
        >
          <Sparkles size={14} />
          <span>Streamlining Workforce Management</span>
        </motion.div>

        {/* Hero Title */}
        <h1 className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
          Manage Your Team with <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Precision</span>
        </h1>
        
        {/* Description */}
        <p className="text-xl text-gray-600 dark:text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed">
          The ultimate platform for modern businesses to manage employee records, track growth, and boost productivity in one centralized hub.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {session ? (
            <Link
              href="/dashboard"
              className="group px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl flex items-center gap-2 transition-all hover:shadow-xl hover:shadow-indigo-500/25 active:scale-95"
            >
              Enter Dashboard 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="group px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl flex items-center gap-2 transition-all hover:shadow-xl hover:shadow-indigo-500/25 active:scale-95"
              >
                Sign In 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/register"
                className="px-8 py-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all active:scale-95"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Trust Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 pt-8 border-t border-gray-100 dark:border-zinc-800 flex flex-col items-center gap-4"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-900 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                <Users size={16} className="text-zinc-500" />
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Lock size={14} /> Trusted by teams worldwide with 128-bit encryption.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}