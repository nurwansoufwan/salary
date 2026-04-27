"use client";

import React from 'react';
import { Users, Building2, Wallet, Clock, Rocket, FileText, ChevronRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <main className="p-8 font-sans bg-[#F8FAFC] min-h-screen text-slate-900">
      
      {/* HEADER ATAS */}
      <header className="flex justify-between items-start mb-10 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
          <p className="text-sm text-slate-500">Monitor your company's core metrics at a glance.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 pr-4 rounded-full shadow-sm border border-slate-100">
            <div className="w-10 h-10 bg-[#006097] rounded-full flex items-center justify-center font-bold text-white shadow-md">
                NS
            </div>
            <div className="text-left">
                <p className="text-sm font-bold text-slate-800 leading-tight">Nurwan Soufwan</p>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Administrator</p>
            </div>
        </div>
      </header>

      {/* STATS CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Card 1: Total Karyawan */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
           <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 rounded-xl text-[#006097]">
                <Users size={24} />
              </div>
              <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-1 rounded-lg">+12%</span>
           </div>
           <p className="text-slate-500 text-sm font-medium mb-1">Total Karyawan</p>
           <h3 className="text-3xl font-bold text-slate-800">124</h3>
        </div>

        {/* Card 2: Divisi */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
           <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                <Building2 size={24} />
              </div>
              <span className="bg-slate-50 text-slate-400 text-xs font-bold px-2 py-1 rounded-lg">Stable</span>
           </div>
           <p className="text-slate-500 text-sm font-medium mb-1">Total Divisi</p>
           <h3 className="text-3xl font-bold text-slate-800">8</h3>
        </div>

        {/* Card 3: Payroll */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
           <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                <Wallet size={24} />
              </div>
              <span className="bg-blue-50 text-[#006097] text-xs font-bold px-2 py-1 rounded-lg">+5%</span>
           </div>
           <p className="text-slate-500 text-sm font-medium mb-1">Payroll Bulan Ini</p>
           <h3 className="text-3xl font-bold text-slate-800">Rp 450M</h3>
        </div>

        {/* Card 4: Pending */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
           <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-red-50 rounded-xl text-red-500">
                <Clock size={24} />
              </div>
              <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded-lg">High</span>
           </div>
           <p className="text-slate-500 text-sm font-medium mb-1">Pending Approval</p>
           <h3 className="text-3xl font-bold text-slate-800">12</h3>
        </div>

      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
                <h4 className="text-slate-800 font-bold text-lg flex items-center gap-2">
                  <div className="w-2 h-6 rounded-full bg-[#006097]"></div> 
                  Recent Activities
                </h4>
                <button className="text-[#006097] text-sm font-semibold hover:underline flex items-center gap-1">
                    View All <ChevronRight size={14} />
                </button>
            </div>
            
            <div className="space-y-6">
              {[
                { title: "Updated Divisi 'IT Support'", time: "2 hours ago", iconColor: "text-blue-500", bg: "bg-blue-50" },
                { title: "New Employee Added: Sarah J.", time: "4 hours ago", iconColor: "text-emerald-500", bg: "bg-emerald-50" },
                { title: "Payroll Batch #204 Generated", time: "6 hours ago", iconColor: "text-amber-500", bg: "bg-amber-50" },
              ].map((item, index) => (
                <div key={index} className="flex gap-4 items-center p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-default group">
                  <div className={`${item.bg} ${item.iconColor} p-3 rounded-xl shadow-sm`}>
                    <FileText size={20} />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-slate-700 font-bold text-sm group-hover:text-[#006097] transition-colors">{item.title}</h5>
                    <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500" />
                </div>
              ))}
            </div>
          </div>

          {/* New Reports / Action Card */}
          <div className="bg-gradient-to-br from-[#006097] to-[#004a75] p-8 rounded-3xl shadow-lg shadow-blue-200 flex flex-col items-center justify-center text-center text-white">
             <div className="bg-white/20 backdrop-blur-md w-20 h-20 rounded-3xl flex items-center justify-center mb-6 rotate-3">
                <Rocket size={32} className="text-white" />
             </div>
             <h5 className="text-xl font-bold mb-3">Analytics Pro</h5>
             <p className="text-blue-100 text-sm mb-8 leading-relaxed">
                Unlock deeper insights into your employee productivity and payroll trends.
             </p>
             <button className="w-full py-3 bg-white text-[#006097] font-bold rounded-xl shadow-xl hover:bg-blue-50 transition-colors">
                Upgrade Now
             </button>
          </div>

      </div>

    </main>
  );
}