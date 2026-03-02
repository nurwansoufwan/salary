"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Pendaftaran gagal");

      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#020617] p-4 text-white">
      {/* Logo Circle */}
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#005a70] shadow-lg shadow-cyan-900/20">
        <span className="text-xl font-bold italic">S</span>
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
        <p className="mt-2 text-sm text-slate-400">Join SalaryApp to manage your payroll</p>
      </div>

      <main className="w-full max-w-[400px] rounded-2xl border border-white/5 bg-[#111827]/50 p-8 shadow-2xl backdrop-blur-sm">
        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#1f2937] px-4 py-3 text-sm outline-none transition-all focus:border-[#005a70] focus:ring-1 focus:ring-[#005a70]"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#1f2937] px-4 py-3 text-sm outline-none transition-all focus:border-[#005a70] focus:ring-1 focus:ring-[#005a70]"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#1f2937] px-4 py-3 text-sm outline-none transition-all focus:border-[#005a70] focus:ring-1 focus:ring-[#005a70]"
              required
            />
          </div>

          {error && <p className="text-xs font-medium text-red-400">{error}</p>}

          <button
            disabled={loading}
            className="w-full rounded-xl bg-[#005a70] py-3 text-sm font-bold tracking-wide text-white transition-all hover:bg-[#007a8a] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <a href="/sign-in" className="font-semibold text-sky-500 hover:text-sky-400 transition-colors">
              Sign in instead
            </a>
          </p>
        </form>
      </main>

      <footer className="mt-12 text-xs text-slate-600">
        © 2024 SalaryApp. All rights reserved.
      </footer>
    </div>
  );
}