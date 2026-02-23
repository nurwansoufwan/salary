"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// Pastikan lucide-react sudah terinstall
import { 
  LayoutGrid, 
  Database, 
  Hotel, 
  Briefcase, 
  Users, 
  UserCircle, 
  Settings2, 
  CalendarCheck, 
  CalendarDays, 
  Wallet, 
  LogOut, 
  ChevronDown 
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [isMasterOpen, setIsMasterOpen] = useState(true);
  
  // STATE BARU: Untuk menyimpan nama halaman yang sedang aktif
  const [activePage, setActivePage] = useState("Dashboard Utama");

  const handleLogout = () => {
    localStorage.clear();
    router.push("/sign-in");
  };

  // Fungsi untuk menangani klik menu
  const handleMenuClick = (name: string) => {
    setActivePage(name);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* --- SIDEBAR (Navy Blue sesuai gambar SalaryApp) --- */}
      <aside className="w-64 bg-[#034C72] flex flex-col fixed h-full z-20 shadow-xl">
        <div className="p-6 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#00A99D] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">S</div>
            <span className="text-xl font-bold text-white tracking-tight">Salary<span className="text-[#00A99D]">App</span></span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {/* Dashboard Menu */}
          <button 
            onClick={() => handleMenuClick("Dashboard Utama")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all mb-4 ${activePage === "Dashboard Utama" ? 'bg-[#ffffff15] border border-[#ffffff10] text-white shadow-sm' : 'text-slate-300 hover:bg-[#075985]'}`}
          >
            <LayoutGrid size={20} className={activePage === "Dashboard Utama" ? "text-[#00A99D]" : "text-slate-400"} />
            <span className="text-sm font-medium">Dashboard</span>
          </button>

          {/* Master Section */}
          <div className="mb-2">
            <button 
              onClick={() => setIsMasterOpen(!isMasterOpen)}
              className="w-full flex items-center justify-between p-3 rounded-xl text-slate-300 hover:bg-[#075985] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Database size={20} className="text-slate-400" />
                <span className="text-sm">Master</span>
              </div>
              <ChevronDown size={14} className={`transition-transform duration-300 ${isMasterOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMasterOpen && (
              <div className="ml-4 mt-2 space-y-1 border-l border-[#ffffff15]">
                {[
                  { name: 'Divisi', icon: Hotel },
                  { name: 'Jabatan', icon: Briefcase },
                  { name: 'Karyawan', icon: Users },
                  { name: 'User', icon: UserCircle },
                  { name: 'Konfigurasi', icon: Settings2 }
                ].map((item) => (
                  <button 
                    key={item.name} 
                    onClick={() => handleMenuClick(item.name)}
                    className={`w-full flex items-center gap-3 p-2 pl-6 text-sm transition-all group ${activePage === item.name ? 'text-[#00A99D] font-bold' : 'text-slate-300 hover:text-[#00A99D]'}`}
                  >
                    <item.icon size={18} className={activePage === item.name ? "opacity-100" : "opacity-50"} /> 
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Menu Lainnya */}
          {[
            { name: 'Presensi', icon: CalendarCheck },
            { name: 'Cuti', icon: CalendarDays },
            { name: 'Gaji', icon: Wallet }
          ].map((menu) => (
            <button 
              key={menu.name}
              onClick={() => handleMenuClick(menu.name)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activePage === menu.name ? 'bg-[#ffffff15] text-white' : 'text-slate-300 hover:bg-[#075985]'}`}
            >
              <menu.icon size={20} className={activePage === menu.name ? "text-[#00A99D]" : "text-slate-400"} />
              <span className="text-sm font-medium">{menu.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#ffffff10]">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 text-slate-400 hover:text-red-400 transition-all text-left">
            <LogOut size={20} />
            <span className="text-sm font-medium">Keluar</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Navbar - JUDUL SEKARANG DINAMIS */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-1 block">Overview</span>
            {/* Teks ini akan berubah sesuai menu yang diklik */}
            <h2 className="text-sm font-bold text-slate-800 tracking-tight transition-all">
              {activePage}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900 leading-none">Nurwan Soufwan</p>
              <p className="text-[10px] text-[#00A99D] mt-1 font-black tracking-widest uppercase">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-md flex items-center justify-center font-bold text-slate-600 text-xs">NS</div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-8">
          <div className="mb-10">
            {/* Judul Konten juga berubah otomatis */}
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Halaman {activePage}</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Manajemen data {activePage.toLowerCase()} SalaryApp.</p>
          </div>

          {/* Kartu Statistik tetap tampil */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-50 hover:border-[#00A99D] transition-all group">
               <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Total Karyawan</span>
               <h3 className="text-4xl font-black text-slate-900 mt-4 tracking-tighter group-hover:text-[#00A99D]">1,240</h3>
            </div>
            {/* ... kartu lainnya ... */}
          </div>
        </main>
      </div>
    </div>
  );
}