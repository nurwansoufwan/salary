"use client";

import React from "react";
import { DollarSign, Download, Printer } from "lucide-react";

export default function GajiPage() {
  const dataGaji = [
    { id: 1, nama: "Ahmad Fauzi", jabatan: "Manager IT", pokok: "12.000.000", tunjangan: "2.000.000", pot: "500.000", total: "13.500.000" },
    { id: 2, nama: "Siti Aminah", jabatan: "HR Specialist", pokok: "8.000.000", tunjangan: "1.500.000", pot: "200.000", total: "9.300.000" },
    { id: 3, nama: "Budi Santoso", jabatan: "Staff Marketing", pokok: "6.500.000", tunjangan: "1.000.000", pot: "150.000", total: "7.350.000" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-8">
      {/* Header dengan Summary */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Payroll & Penggajian</h1>
          <p className="text-slate-400 mt-1">Periode: Maret 2026</p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-[#0f172a] border border-slate-800 p-4 rounded-xl flex items-center gap-4 pr-10">
            <div className="p-3 bg-teal-500/10 rounded-lg text-teal-400">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Total Payroll</p>
              <h3 className="text-xl font-bold text-white">Rp 450.000.000</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1e293b] text-slate-400 uppercase font-medium">
            <tr>
              <th className="px-6 py-4">Karyawan</th>
              <th className="px-6 py-4">Gaji Pokok</th>
              <th className="px-6 py-4">Tunjangan</th>
              <th className="px-6 py-4 text-red-400">Potongan</th>
              <th className="px-6 py-4 text-teal-400 font-bold">Total Terima</th>
              <th className="px-6 py-4 text-right">Slip Gaji</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {dataGaji.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/50 transition">
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{item.nama}</div>
                  <div className="text-xs text-slate-500">{item.jabatan}</div>
                </td>
                <td className="px-6 py-4 text-slate-300">Rp {item.pokok}</td>
                <td className="px-6 py-4 text-green-400 text-xs">+ Rp {item.tunjangan}</td>
                <td className="px-6 py-4 text-red-400 text-xs">- Rp {item.pot}</td>
                <td className="px-6 py-4 font-bold text-white text-base">Rp {item.total}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded text-xs transition border border-slate-700">
                      <Download size={14} /> Slip
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}