"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState(""); // Tambahkan state untuk nama
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name, // Kirim nama ke API
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Jika muncul "Data tidak lengkap", pesan ini akan ditangkap di sini
        throw new Error(data.message || "Pendaftaran gagal");
      }

      // Simpan data login ke localStorage agar dianggap sudah masuk
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Berhasil, langsung lempar ke dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-md rounded-2xl bg-white p-8 shadow dark:bg-zinc-900">
        <h1 className="mb-6 text-center text-2xl font-semibold">Daftar Akun</h1>

        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Input Nama - Penting untuk menghindari error "Data tidak lengkap" */}
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="password"
            placeholder="Password (min. 6 karakter)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
            required
          />

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black py-2 text-white font-medium hover:bg-zinc-800 disabled:opacity-50 transition-all"
          >
            {loading ? "Memproses..." : "Daftar Sekarang"}
          </button>

          <p className="text-center text-sm text-zinc-600">
            Sudah punya akun?{" "}
            <a href="/sign-in" className="text-blue-500 hover:underline">
              Masuk di sini
            </a>
          </p>
        </form>
      </main>
    </div>
  );
}