"use client";

import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Building2, 
  Wallet, 
  Clock, 
  Rocket, 
  FileText, 
  CalendarCheck, 
  Banknote,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null);
  const [userNama, setUserNama] = useState("");

  // 1. Cek Role saat aplikasi dimuat
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setRole(parsedUser.role); // "admin" atau "user"
        setUserNama(parsedUser.name || "User");
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
  }, []);

  // --- TAMPILAN DASHBOARD ADMIN (HRD) ---
  // (Menggunakan Desain Black Theme yang kamu kirim)
  const AdminDashboard = () => (
    <>
      {/* STATS CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Card 1: Total Karyawan */}
        <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-[#00A99D]/50 transition-all">
           <div className="flex justify-between items-start mb-4">
              <Users className="text-slate-400 group-hover:text-[#00A99D] transition-colors" size={24} />
              <span className="bg-[#00A99D]/20 text-[#00A99D] text-xs font-bold px-2 py-1 rounded">+12%</span>
           </div>
           <p className="text-slate-500 text-xs font-medium mb-1">Total Karyawan</p>
           <h3 className="text-3xl font-bold text-white">124</h3>
        </div>

        {/* Card 2: Divisi */}
        <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 relative group hover:border-[#00A99D]/50 transition-all">
           <div className="flex justify-between items-start mb-4">
              <Building2 className="text-slate-400 group-hover:text-[#00A99D] transition-colors" size={24} />
              <span className="bg-slate-800 text-slate-400 text-xs font-bold px-2 py-1 rounded">Stable</span>
           </div>
           <p className="text-slate-500 text-xs font-medium mb-1">Divisi</p>
           <h3 className="text-3xl font-bold text-white">8</h3>
        </div>

        {/* Card 3: Payroll (GLOWING EFFECT) */}
        <div className="bg-[#111111] p-6 rounded-2xl border border-white/10 relative group shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)]">
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
           <div className="flex justify-between items-start mb-4 relative z-10">
              <Wallet className="text-[#FFD700]" size={24} /> 
              <span className="bg-[#00A99D]/20 text-[#00A99D] text-xs font-bold px-2 py-1 rounded">+5%</span>
           </div>
           <p className="text-slate-400 text-xs font-medium mb-1 relative z-10">Payroll Bulan Ini</p>
           <h3 className="text-3xl font-bold text-white relative z-10">Rp 450M</h3>
        </div>

        {/* Card 4: Pending Approval */}
        <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 relative group hover:border-red-500/30 transition-all">
           <div className="flex justify-between items-start mb-4">
              <Clock className="text-slate-400 group-hover:text-red-400 transition-colors" size={24} />
              <span className="bg-red-500/20 text-red-500 text-xs font-bold px-2 py-1 rounded">-2</span>
           </div>
           <p className="text-slate-500 text-xs font-medium mb-1">Pending Approval</p>
           <h3 className="text-3xl font-bold text-white">12</h3>
        </div>
      </div>

      {/* BOTTOM SECTION ADMIN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#111111] p-6 rounded-2xl border border-white/5">
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00A99D]"></span> 
              Recent Activities
            </h4>
            <div className="space-y-6">
              {[1, 2, 3].map((item, index) => (
                <div key={index} className="flex gap-4 items-start group">
                  <div className="bg-[#1e1e1e] p-3 rounded-lg text-slate-400 group-hover:text-[#00A99D] group-hover:bg-[#00A99D]/10 transition-all">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-sm group-hover:text-[#00A99D] transition-colors">Updated Divisi "IT Support"</h5>
                    <p className="text-xs text-slate-500 mt-1">{2 + index * 2} hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 border-dashed flex flex-col items-center justify-center text-center relative">
             <div className="bg-[#1e1e1e] w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white">
                <Rocket size={24} />
             </div>
             <h5 className="text-white font-bold mb-2">New Reports Coming Soon</h5>
             <p className="text-xs text-slate-500 max-w-[200px]">We're building advanced analytics for your payroll.</p>
          </div>
      </div>
    </>
  );

  // --- TAMPILAN DASHBOARD USER (KARYAWAN) ---
  // (Desain Disesuaikan agar mirip Black Theme Admin)
  const UserDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Card 1: Status Kehadiran (User) */}
        <div className="bg-gradient-to-br from-[#00A99D]/20 to-[#111111] p-6 rounded-2xl border border-[#00A99D]/30 relative overflow-hidden">
           <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                  <Clock className="text-[#00A99D]" size={24} />
                  <span className="bg-[#00A99D] text-black text-xs font-bold px-2 py-1 rounded">Hari Ini</span>
              </div>
              <p className="text-cyan-100 text-xs font-medium mb-1">Status Kehadiran</p>
              <h3 className="text-2xl font-bold text-white mb-4">Belum Absen</h3>
              <button className="bg-[#00A99D] hover:bg-[#008f85] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-cyan-900/20 transition w-full">
                 Absen Masuk
              </button>
           </div>
           {/* Background Decoration */}
           <Clock className="absolute -right-6 -bottom-6 text-[#00A99D] opacity-10" size={120} />
        </div>

        {/* Card 2: Sisa Cuti (User) */}
        <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 relative group hover:border-[#00A99D]/50 transition-all">
           <div className="flex justify-between items-start mb-4">
              <CalendarCheck className="text-slate-400 group-hover:text-[#00A99D] transition-colors" size={24} />
              <span className="bg-slate-800 text-slate-400 text-xs font-bold px-2 py-1 rounded">Tahunan</span>
           </div>
           <p className="text-slate-500 text-xs font-medium mb-1">Sisa Cuti Anda</p>
           <h3 className="text-3xl font-bold text-white">12 <span className="text-sm font-normal text-slate-500">Hari</span></h3>
           <p className="text-xs text-slate-500 mt-4 border-t border-white/5 pt-3">
              Valid sampai 31 Des 2026
           </p>
        </div>

        {/* Card 3: Gaji Terakhir (User) */}
        <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 relative group hover:border-emerald-500/50 transition-all">
           <div className="flex justify-between items-start mb-4">
              <Banknote className="text-slate-400 group-hover:text-emerald-500 transition-colors" size={24} />
              <span className="bg-emerald-500/10 text-emerald-500 text-xs font-bold px-2 py-1 rounded">Lunas</span>
           </div>
           <p className="text-slate-500 text-xs font-medium mb-1">Gaji Terakhir (Feb)</p>
           <h3 className="text-2xl font-bold text-white">Rp 5.500.000</h3>
           <button className="text-xs text-[#00A99D] hover:text-white mt-4 flex items-center gap-1 transition-colors">
              Lihat Slip Gaji <Rocket size={12} />
           </button>
        </div>
      </div>

      {/* Recent Activity User */}
      <div className="bg-[#111111] p-6 rounded-2xl border border-white/5">
        <h4 className="text-white font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00A99D]"></span> 
          Riwayat Kehadiran Minggu Ini
        </h4>
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 hover:bg-white/5 p-2 rounded transition">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1e1e1e] flex items-center justify-center text-[#00A99D]">
                            <CheckCircle2 size={18} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">Hadir Tepat Waktu</p>
                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                <Clock size={10} /> 07:55 AM - 17:05 PM
                            </div>
                        </div>
                    </div>
                    <span className="text-xs font-medium text-slate-400 bg-slate-800 px-2 py-1 rounded">0{i} Mar 2026</span>
                </div>
            ))}
        </div>
      </div>
    </>
  );

  return (
    <main className="p-8 font-sans bg-black min-h-screen text-white">
      
      {/* HEADER ATAS (Sama untuk keduanya) */}
      <header className="flex justify-between items-start mb-10 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Dashboard</h2>
          <p className="text-xs text-slate-500">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="text-right">
                <p className="text-sm font-bold text-white capitalize">{userNama}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider">{role === 'admin' ? 'Administrator' : 'Employee'}</p>
            </div>
            <div className="w-10 h-10 bg-[#1e1e1e] rounded-full flex items-center justify-center font-bold text-[#00A99D] border border-white/10">
                {userNama.charAt(0).toUpperCase()}
            </div>
        </div>
      </header>

      {/* WELCOME SECTION */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userNama}!</h1>
        <p className="text-slate-400 mt-2">
            {role === 'admin' 
                ? "Here's what's happening with your payroll system today." 
                : "Have a productive day at work!"}
        </p>
      </div>

      {/* RENDER KONTEN BERDASARKAN ROLE */}
      {role === 'admin' ? <AdminDashboard /> : role === 'user' ? <UserDashboard /> : (
          // Loading State
          <div className="h-64 flex flex-col items-center justify-center text-slate-500 gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00A99D]"></div>
              <p className="text-sm">Loading Dashboard...</p>
          </div>
      )}

    </main>
  );
}