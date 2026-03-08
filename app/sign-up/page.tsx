"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

    // --- LOGIKA SIMULASI REGISTRASI LANGSUNG LOGIN ---
    setTimeout(() => {
      try {
        // 1. Buat data user baru (Role otomatis jadi 'user' / Karyawan)
        const newUser = {
          id: Math.floor(Math.random() * 10000), // ID Acak
          name: name,
          email: email,
          role: "user", // KUNCI: Registrasi selalu jadi USER (Karyawan)
        };

        // 2. Simpan ke LocalStorage (Otomatis dianggap Login)
        localStorage.setItem("user", JSON.stringify(newUser));
        
        // 3. Set Cookie (Opsional, untuk konsistensi)
        document.cookie = "role=user; path=/";

        // 4. Redirect ke Dashboard
        router.push("/dashboard");
        router.refresh(); // Refresh agar sidebar mendeteksi user baru

      } catch (err) {
        setError("Gagal melakukan registrasi.");
        setLoading(false);
      }
    }, 1500); // Simulasi delay loading 1.5 detik
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
              placeholder="user@gmail.com"
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

          {error && <p className="text-xs font-medium text-red-400 text-center">{error}</p>}

          <button
            disabled={loading}
            className="w-full rounded-xl bg-[#005a70] py-3 text-sm font-bold tracking-wide text-white transition-all hover:bg-[#007a8a] active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-cyan-900/20"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-semibold text-sky-500 hover:text-sky-400 transition-colors">
              Sign in instead
            </Link>
          </p>
        </form>
      </main>

      <footer className="mt-12 text-xs text-slate-600">
        © 2026 SalaryApp. All rights reserved.
      </footer>
    </div>
  );
}