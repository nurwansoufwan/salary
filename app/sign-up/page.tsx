"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Eye } from "lucide-react";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ name, email, role: "user" }));
      document.cookie = "role=user; path=/";
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a] p-4 font-sans">
      <main className="flex w-full max-w-5xl overflow-hidden rounded-[40px] bg-[#f8fafc] shadow-[0_20px_50px_rgba(0,0,0,0.3)] md:flex-row">
        
        {/* Left Side: Form */}
        <div className="flex w-full flex-col p-8 md:w-1/2 md:p-12 lg:p-16">
          <div className="mb-8 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1e293b] text-white">
              <span className="text-xl">✦</span>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Gradiator</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Start Your Journey!</h1>
            <p className="text-sm text-slate-400">Create an account to manage your payroll</p>
          </div>

          <div className="mb-8 flex rounded-full bg-slate-200/50 p-1">
            <button onClick={() => router.push("/sign-in")} className="flex-1 rounded-full py-2 text-sm font-semibold text-slate-500 hover:text-slate-700">Sign in</button>
            <button className="flex-1 rounded-full py-2 text-sm font-semibold bg-[#4a89f3] text-white shadow-md">Sign Up</button>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="relative">
              <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white/70 py-4 pl-5 pr-12 text-sm outline-none transition-all focus:border-[#4a89f3]" required />
              <User className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            </div>

            <div className="relative">
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white/70 py-4 pl-5 pr-12 text-sm outline-none transition-all focus:border-[#4a89f3]" required />
              <Mail className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            </div>

            <div className="relative">
              <input type="password" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white/70 py-4 pl-5 pr-12 text-sm outline-none transition-all focus:border-[#4a89f3]" required />
              <Eye className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            </div>

            <button disabled={loading} className="w-full rounded-2xl bg-[#4a89f3] py-4 text-sm font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-600 transition-all active:scale-[0.98]">
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-400">
            Already have an account? <span onClick={() => router.push("/sign-in")} className="text-[#4a89f3] font-bold cursor-pointer hover:underline">Sign In Here</span>
          </p>
        </div>

        {/* Right Side: Enhanced Mesh Gradient */}
        <div className="relative hidden w-1/2 overflow-hidden md:flex">
          {/* Base Gradient Layer */}
          <div className="absolute inset-0 bg-[#4a89f3]" />
          
          {/* Mesh Gradient Orbs */}
          <div className="absolute -top-[10%] -left-[10%] h-[70%] w-[70%] rounded-full bg-[#1e4db7] blur-[80px] opacity-80 animate-pulse" />
          <div className="absolute top-[20%] -right-[20%] h-[60%] w-[60%] rounded-full bg-[#9fc3ff] blur-[100px] opacity-60" />
          <div className="absolute -bottom-[20%] left-[10%] h-[50%] w-[80%] rounded-full bg-[#6366f1] blur-[90px] opacity-70" />

          {/* Grainy Texture */}
          <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />

          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-12 text-center text-white">
            <div className="mb-6 rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl shadow-2xl">
              <h2 className="text-3xl font-bold tracking-tight">Join the Revolution</h2>
              <p className="mt-4 text-blue-50/80 leading-relaxed">Manage your work-life balance and finances with the most intuitive dashboard ever made.</p>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 w-[80%] -translate-x-1/2 rounded-2xl border border-white/20 bg-white/10 p-4 text-center backdrop-blur-md">
            <p className="text-[10px] text-white/70">© 2026 abdul. All rights reserved.</p>
          </div>
        </div>
      </main>
    </div>
  );
}