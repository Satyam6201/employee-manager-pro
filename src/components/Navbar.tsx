"use client";
import { signOut, useSession } from "next-auth/react";
import { Sun, Moon, LogOut, Briefcase, Bell, Settings, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <Link href="/dashboard">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform duration-300">
              <Briefcase size={22} />
            </div>
            <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">
              Team<span className="text-indigo-600">Flow</span>
            </span>
          </motion.div>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Notifications (Visual Only) */}
          <button className="hidden sm:flex p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white dark:border-zinc-950"></span>
          </button>

          {/* Theme Toggle Switch */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:ring-2 ring-indigo-500/20 transition-all"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {/* User Profile Dropdown */}
          <div className="relative ml-2 pl-4 border-l border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-none">
                  {session?.user?.name || "Anonymous User"}
                </p>
                <p className="text-[10px] text-indigo-500 font-semibold uppercase tracking-tighter mt-1">
                  Access: Admin
                </p>
              </div>
              
              {/* Avatar Mock */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/40 dark:to-violet-900/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                {session?.user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <ChevronDown size={14} className={`text-zinc-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-3 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-2 z-[60]"
                >
                  <button className="w-full flex items-center gap-2 p-2.5 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-colors">
                    <Settings size={16} /> Account Settings
                  </button>
                  <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1" />
                  <button 
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="w-full flex items-center gap-2 p-2.5 text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors font-medium"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
}