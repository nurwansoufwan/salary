"use client";

import React from "react";
import { Plus, Pencil, Trash2, Building2 } from "lucide-react";

export default function MasterDivisiPage() {
  // Data Dummy
  const divisi = [
    { id: 1, nama: "Information Technology (IT)", kode: "IT-DEPT" },
    { id: 2, nama: "Human Resources (HRD)", kode: "HR-DEPT" },
    { id: 3, nama: "Finance & Accounting", kode: "FA-DEPT" },
    { id: 4, nama: "Marketing", kode: "MKT-DEPT" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Building2 className="text-[#00A99D]" /> Master Divisi
            </h1>
            <p className="text-slate-400 text-sm">Kelola data departemen perusahaan.</p>
        </div>
        <button className="bg-[#005a70] hover:bg-[#004a5c] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition">
          <Plus size={16} /> Tambah Divisi
        </button>
      </div>

      <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1e293b] text-slate-400 uppercase">
            <tr>
              <th className="px-6 py-4">Kode</th>
              <th className="px-6 py-4">Nama Divisi</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {divisi.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/50">
                <td className="px-6 py-4 font-mono text-[#00A99D]">{item.kode}</td>
                <td className="px-6 py-4 text-white font-medium">{item.nama}</td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <button className="p-2 bg-amber-500/10 text-amber-500 rounded hover:bg-amber-500/20"><Pencil size={16} /></button>
                  <button className="p-2 bg-rose-500/10 text-rose-500 rounded hover:bg-rose-500/20"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}