"use client";

import React from 'react';
import { Users, Building2, Wallet, Clock, Rocket, FileText, MoreHorizontal } from 'lucide-react';

export default function DashboardPage() {
  return (
    <main className="p-8 font-sans bg-black min-h-screen text-white">
      
      {/* HEADER ATAS */}
      <header className="flex justify-between items-start mb-10 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Dashboard</h2>
        </div>
        <div className="flex items-center gap-3">
            <div className="text-right">
                <p className="text-sm font-bold text-white">Administrator</p>
                <p className="text-xs text-slate-500">Payroll Management</p>
            </div>
            <div className="w-10 h-10 bg-[#1e1e1e] rounded-full flex items-center justify-center font-bold text-[#00A99D] border border-white/10">
                A
            </div>
        </div>
      </header>

      {/* WELCOME SECTION */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Nurwan Soufwan!</h1>
        <p className="text-slate-400 mt-2">Here's what's happening with your payroll system today.</p>
      </div>

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
           {/* Efek Glow di belakang */}
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
           
           <div className="flex justify-between items-start mb-4 relative z-10">
              <Wallet className="text-[#FFD700]" size={24} /> {/* Ikon Emas */}
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

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Activities */}
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

          {/* New Reports / Placeholder */}
          <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 border-dashed flex flex-col items-center justify-center text-center relative">
             <div className="bg-[#1e1e1e] w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white">
                <Rocket size={24} />
             </div>
             <h5 className="text-white font-bold mb-2">New Reports Coming Soon</h5>
             <p className="text-xs text-slate-500 max-w-[200px]">We're building advanced analytics for your payroll.</p>
          </div>

      </div>

    </main>
  );
}