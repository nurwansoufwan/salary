"use client";

import React from "react";
import { Plus, Pencil, Trash2, Briefcase } from "lucide-react";

export default function MasterJabatanPage() {
  const jabatan = [
    { id: 1, nama: "Senior Manager", gapok: "15.000.000", tunjangan: "5.000.000" },
    { id: 2, nama: "Manager", gapok: "10.000.000", tunjangan: "3.000.000" },
    { id: 3, nama: "Supervisor", gapok: "7.000.000", tunjangan: "1.500.000" },
    { id: 4, nama: "Staff", gapok: "4.500.000", tunjangan: "500.000" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Briefcase className="text-[#00A99D]" /> Master Jabatan
            </h1>
            <p className="text-slate-400 text-sm">Atur gaji pokok dan tunjangan per jabatan.</p>
        </div>
        <button className="bg-[#005a70] hover:bg-[#004a5c] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition">
          <Plus size={16} /> Tambah Jabatan
        </button>
      </div>

      <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1e293b] text-slate-400 uppercase">
            <tr>
              <th className="px-6 py-4">Nama Jabatan</th>
              <th className="px-6 py-4">Gaji Pokok (Rp)</th>
              <th className="px-6 py-4">Tunjangan (Rp)</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {jabatan.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/50">
                <td className="px-6 py-4 text-white font-medium">{item.nama}</td>
                <td className="px-6 py-4 text-emerald-400">{item.gapok}</td>
                <td className="px-6 py-4 text-emerald-400">{item.tunjangan}</td>
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