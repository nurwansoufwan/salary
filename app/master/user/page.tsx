"use client";

import React, { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function UserPage() {
  // State untuk Data dari API
  const [dataUser, setDataUser] = useState<User[]>([]);
  
  // State untuk Form Input
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER", // Default role
  });

  // State UI
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Ambil token dari storage (Sesuaikan dengan sistem login Anda)
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  // ===============================
  // 1. Fetch Data User (GET)
  // ===============================
  const fetchUsers = async () => {
    try {
      const response = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept": "application/json",
        },
      });
      const result = await response.json();
      // Sesuaikan jika response API dibungkus properti .data
      setDataUser(result.data || result);
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  // ===============================
  // 2. Simpan Data User (POST)
  // ===============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("User berhasil ditambahkan!");
        setFormData({ name: "", email: "", password: "", role: "USER" });
        fetchUsers(); // Refresh tabel
      } else {
        const errorData = await response.json();
        alert("Gagal: " + (errorData.message || "Terjadi kesalahan"));
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  const openDetail = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-screen flex bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden font-sans">
      <div className="flex flex-1 flex-col overflow-y-auto relative">
        <main className="p-8">
          <div className="mb-10 text-left">
            <h2 className="text-4xl font-extrabold tracking-tight">Management User</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Control system access and user permissions.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Tambah User (Kiri) */}
            <div className="lg:col-span-5">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] p-8 border border-slate-200 dark:border-white/5 shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-xl font-bold">
                    +
                  </div>
                  <h3 className="text-xl font-bold">Tambah User</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Nama</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Nama Lengkap" 
                      className="input-style" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="email@example.com" 
                      className="input-style" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Password</label>
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••" 
                      className="input-style" 
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Role</label>
                    <select 
                      className="input-style appearance-none cursor-pointer"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="USER">User / Karyawan</option>
                      <option value="ADMIN">Admin HRD</option>
                      <option value="MANAGER">Manager</option>
                    </select>
                  </div>
                  
                  <button 
                    disabled={loading}
                    className="w-full bg-[#005a8d] hover:bg-[#0077b6] text-white font-bold py-4 rounded-2xl shadow-lg transition-all mt-4 active:scale-95 disabled:opacity-50"
                  >
                    {loading ? "Menyimpan..." : "Simpan"}
                  </button>
                </form>
              </div>
            </div>

            {/* Tabel Data User (Kanan) */}
            <div className="lg:col-span-7">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden transition-all">
                <div className="p-8 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                  <h3 className="text-xl font-bold">Data User</h3>
                  <span className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[11px] font-bold px-3 py-1 rounded-full border border-cyan-500/20">
                    ● {dataUser.length} Items Total
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 dark:text-slate-500 text-[12px] uppercase tracking-widest">
                        <th className="px-6 py-6 font-bold">No</th>
                        <th className="px-6 py-6 font-bold">Nama</th>
                        <th className="px-6 py-6 font-bold">Email</th>
                        <th className="px-6 py-6 font-bold text-center">Role</th>
                        <th className="px-6 py-6 font-bold text-right pr-8">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {dataUser.map((item, index) => (
                        <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-all duration-300">
                          <td className="px-6 py-6 font-bold text-slate-400 dark:text-slate-50">{index + 1}</td>
                          <td className="px-6 py-6 font-bold text-slate-700 dark:text-slate-100">{item.name}</td>
                          <td className="px-6 py-6 text-sm text-slate-500 dark:text-slate-400">{item.email}</td>
                          <td className="px-6 py-6 text-center">
                            <span className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase ${
                              item.role === 'ADMIN' 
                              ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' 
                              : 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20'
                            }`}>
                              {item.role}
                            </span>
                          </td>
                          <td className="px-6 py-6 pr-8">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <button onClick={() => openDetail(item)} className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              </button>
                              <button className="p-2 rounded-lg bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                              </button>
                              <button className="p-2 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Modal Detail User */}
        {isModalOpen && selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/80 backdrop-blur-sm transition-all" onClick={() => setIsModalOpen(false)}></div>
            <div className="relative w-full max-w-[440px] bg-white dark:bg-[#0f0f0f] rounded-[32px] shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 animate-in fade-in zoom-in duration-300">
              <div className="bg-gradient-to-r from-[#003d5e] to-[#005a8d] p-8 relative">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 h-8 w-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">✕</button>
                <h3 className="text-2xl font-bold text-white">{selectedUser.name}</h3>
                <p className="text-white/70 font-medium tracking-wide">System Access Profile</p>
              </div>
              <div className="p-8 space-y-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">Email Account</p>
                  <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 font-mono">{selectedUser.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Access Role</p>
                    <p className="font-bold text-slate-900 dark:text-white">{selectedUser.role}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Account Status</p>
                    <span className="text-emerald-500 text-[10px] font-black uppercase tracking-tighter italic">● Verified Access</span>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-full py-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-sm mt-4">
                  Close Detail
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .input-style {
          width: 100%;
          background-color: transparent;
          border: 1px solid rgba(203, 213, 225, 0.5);
          border-radius: 1rem;
          padding: 0.875rem 1.25rem;
          color: inherit;
          transition: all 0.3s;
        }
        :global(.dark) .input-style {
          background-color: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }
        .input-style:focus {
          outline: none;
          border-color: #06b6d4;
          box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.2);
        }
      `}</style>
    </div>
  );
}