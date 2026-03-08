"use client";

import React from "react";
import { Plus, Search, MoreVertical, Users } from "lucide-react";

export default function MasterKaryawanPage() {
  const karyawan = [
    { id: 1, nik: "2024001", nama: "Ahmad Fauzi", jabatan: "Manager IT", email: "ahmad@mail.com", status: "Aktif" },
    { id: 2, nik: "2024002", nama: "Siti Aminah", jabatan: "Staff HRD", email: "siti@mail.com", status: "Aktif" },
    { id: 3, nik: "2024003", nama: "Rudi Hartono", jabatan: "Staff Finance", email: "rudi@mail.com", status: "Non-Aktif" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Users className="text-[#00A99D]" /> Data Karyawan
            </h1>
            <p className="text-slate-400 text-sm">Database seluruh pegawai perusahaan.</p>
        </div>
        <button className="bg-[#005a70] hover:bg-[#004a5c] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition">
          <Plus size={16} /> Karyawan Baru
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-800 mb-6 flex gap-4">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
            <input type="text" placeholder="Cari nama atau NIK..." className="w-full bg-[#020617] border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[#00A99D]" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1e293b] text-slate-400 uppercase">
            <tr>
              <th className="px-6 py-4">Karyawan</th>
              <th className="px-6 py-4">Jabatan</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Opsi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {karyawan.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/50">
                <td className="px-6 py-4">
                    <div className="font-bold text-white">{item.nama}</div>
                    <div className="text-xs text-slate-500">NIK: {item.nik}</div>
                </td>
                <td className="px-6 py-4 text-slate-300">{item.jabatan}</td>
                <td className="px-6 py-4 text-slate-400">{item.email}</td>
                <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${item.status === 'Aktif' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-700 text-slate-400'}`}>
                        {item.status}
                    </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-white"><MoreVertical size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}