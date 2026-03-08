"use client";

import React, { useState } from "react";
import { Calendar, Clock, Search, Filter } from "lucide-react";

export default function PresensiPage() {
  // Data Dummy Presensi
  const dataPresensi = [
    { id: 1, nama: "Ahmad Fauzi", role: "Manager IT", tanggal: "08/03/2026", masuk: "07:55", pulang: "17:05", status: "Hadir", color: "text-green-400 bg-green-500/10" },
    { id: 2, nama: "Siti Aminah", role: "HR Specialist", tanggal: "08/03/2026", masuk: "08:15", pulang: "17:00", status: "Terlambat", color: "text-yellow-400 bg-yellow-500/10" },
    { id: 3, nama: "Budi Santoso", role: "Staff Marketing", tanggal: "08/03/2026", masuk: "-", pulang: "-", status: "Alpha", color: "text-red-400 bg-red-500/10" },
    { id: 4, nama: "Dewi Sartika", role: "Finance", tanggal: "08/03/2026", masuk: "07:50", pulang: "17:10", status: "Hadir", color: "text-green-400 bg-green-500/10" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Presensi Harian</h1>
          <p className="text-slate-400 mt-1">Monitoring kehadiran karyawan secara real-time.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-[#0f172a] border border-slate-800 px-4 py-2 rounded-lg hover:bg-slate-800 transition">
            <Calendar size={18} />
            <span>08 Mar 2026</span>
          </button>
          <button className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-500 transition font-medium">
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Karyawan", val: "124", color: "text-white" },
          { label: "Hadir Tepat Waktu", val: "110", color: "text-green-400" },
          { label: "Terlambat", val: "12", color: "text-yellow-400" },
          { label: "Tidak Hadir", val: "2", color: "text-red-400" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#0f172a] border border-slate-800 p-5 rounded-xl">
            <p className="text-slate-400 text-sm">{stat.label}</p>
            <h3 className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.val}</h3>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-4">
          <h3 className="font-semibold text-white">Log Kehadiran</h3>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Cari karyawan..." 
              className="bg-[#020617] border border-slate-700 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-teal-500 w-64 text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-[#1e293b] text-slate-400 uppercase font-medium">
            <tr>
              <th className="px-6 py-4">Nama Karyawan</th>
              <th className="px-6 py-4">Tanggal</th>
              <th className="px-6 py-4">Jam Masuk</th>
              <th className="px-6 py-4">Jam Pulang</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {dataPresensi.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/50 transition">
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{item.nama}</div>
                  <div className="text-xs text-slate-500">{item.role}</div>
                </td>
                <td className="px-6 py-4 text-slate-400">{item.tanggal}</td>
                <td className="px-6 py-4 font-mono text-slate-300">{item.masuk}</td>
                <td className="px-6 py-4 font-mono text-slate-300">{item.pulang}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.color}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}