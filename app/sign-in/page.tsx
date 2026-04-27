"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Eye } from "lucide-react";

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

    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login gagal");

      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      document.cookie = `token=${data.token}; path=/; max-age=86400`;

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
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
            <h1 className="text-2xl font-bold text-slate-900">Welcome Back Creative!</h1>
            <p className="text-sm text-slate-400">We Are Happy To See You Again</p>
          </div>

          <div className="mb-8 flex rounded-full bg-slate-200/50 p-1">
            <button className="flex-1 rounded-full py-2 text-sm font-semibold bg-[#4a89f3] text-white shadow-md">Sign in</button>
            <button onClick={() => router.push("/sign-up")} className="flex-1 rounded-full py-2 text-sm font-semibold text-slate-500 hover:text-slate-700">Sign Up</button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white/70 py-4 pl-5 pr-12 text-sm outline-none transition-all focus:border-[#4a89f3]" required />
              <Mail className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            </div>

            <div className="relative">
              <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white/70 py-4 pl-5 pr-12 text-sm outline-none transition-all focus:border-[#4a89f3]" required />
              <Eye className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 rounded-full accent-[#4a89f3]" /> Remember me
              </label>
              <a href="#" className="text-xs font-bold text-[#4a89f3] hover:underline">Forgot Password?</a>
            </div>

            {error && <p className="text-xs text-red-500 bg-red-50 p-2 rounded-lg">{error}</p>}

            <button disabled={loading} className="w-full rounded-2xl bg-[#4a89f3] py-4 text-sm font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-600 transition-all active:scale-[0.98]">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-400">
            Don't have an account? <span onClick={() => router.push("/sign-up")} className="text-[#4a89f3] font-bold cursor-pointer hover:underline">Register Here</span>
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

          {/* Grainy Texture Overlay (Optional but nice) */}
          <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />

          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-12 text-center text-white">
            <div className="mb-6 rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl shadow-2xl">
              <h2 className="text-3xl font-bold tracking-tight">Streamline Your Payroll</h2>
              <p className="mt-4 text-blue-50/80 leading-relaxed">The most advanced platform for creative teams to manage salary and performance.</p>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 w-[80%] -translate-x-1/2 rounded-2xl border border-white/20 bg-white/10 p-4 text-center backdrop-blur-md">
            <p className="text-[10px] text-white/70">© 2026 Abdul. All rights reserved.</p>
          </div>
        </div>
      </main>
    </div>
  );
}