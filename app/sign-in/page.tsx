"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    // Simulasi Login (Ganti dengan fetch API Anda)
    setTimeout(() => {
        router.push("/dashboard");
        setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#020617] p-4 text-white">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#005a70] shadow-lg">
        <span className="text-xl font-bold italic">S</span>
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
        <p className="mt-2 text-sm text-slate-400">Sign in to access your payroll dashboard</p>
      </div>

      <main className="w-full max-w-[400px] rounded-2xl border border-white/5 bg-[#111827]/50 p-8 shadow-2xl backdrop-blur-sm">
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase text-slate-400">Email Address</label>
            <input
              type="email"
              placeholder="admin@mail.com"
              className="w-full rounded-xl border border-white/10 bg-[#1f2937] px-4 py-3 text-sm outline-none focus:border-[#005a70]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase text-slate-400">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-[#1f2937] px-4 py-3 text-sm outline-none focus:border-[#005a70]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-[#005a70] py-3 text-sm font-bold text-white hover:bg-[#007a8a] disabled:opacity-50 transition-all"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link href="/sign-up" className="font-semibold text-sky-500 hover:underline">Register here</Link>
          </p>
        </form>
      </main>
      <footer className="mt-12 text-xs text-slate-600">© 2024 SalaryApp. All rights reserved.</footer>
    </div>
  );
}