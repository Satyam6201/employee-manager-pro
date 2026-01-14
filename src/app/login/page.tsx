"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/dashboard");
      router.refresh(); 
    } else {
      setError("Invalid Email or Password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <div className="w-full max-w-md space-y-8 p-8 bg-white dark:bg-zinc-900 shadow-2xl rounded-3xl border border-gray-100 dark:border-zinc-800">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Welcome <span className="text-indigo-600">Back</span>
          </h2>
          <p className="mt-2 text-sm text-zinc-500">Log in to your account to manage employees</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-center font-medium">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-zinc-400" size={20} />
              <input
                type="email"
                required
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-zinc-400"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-zinc-400" size={20} />
              <input
                type="password"
                required
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-zinc-400"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className="group relative flex w-full justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-4">
          <p className="text-sm text-zinc-500">
            Don't have an account?{" "}
            <Link href="/register" className="font-bold text-indigo-600 hover:text-indigo-500">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}