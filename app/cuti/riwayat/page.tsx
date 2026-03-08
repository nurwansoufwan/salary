"use client";

import React from "react";
import { History, CalendarCheck } from "lucide-react";

export default function RiwayatCutiPage() {
  const history = [
    { id: 1, tgl: "10-12 Jan 2026", tipe: "Cuti Tahunan", alasan: "Liburan Keluarga", status: "Disetujui", color: "text-emerald-400 bg-emerald-500/10" },
    { id: 2, tgl: "05 Feb 2026", tipe: "Sakit", alasan: "Demam", status: "Disetujui", color: "text-emerald-400 bg-emerald-500/10" },
    { id: 3, tgl: "01 Mar 2026", tipe: "Cuti Tahunan", alasan: "Urusan Pribadi", status: "Pending", color: "text-amber-400 bg-amber-500/10" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Riwayat & Saldo Cuti</h1>

      {/* Info Saldo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#005a70] to-[#003846] p-6 rounded-xl text-white shadow-lg">
          <p className="text-cyan-100 text-sm mb-1">Sisa Cuti Tahunan</p>
          <h2 className="text-4xl font-bold">8 <span className="text-lg font-normal opacity-70">Hari</span></h2>
        </div>
        <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-xl">
          <p className="text-slate-400 text-sm mb-1">Cuti Terpakai</p>
          <h2 className="text-4xl font-bold text-white">4 <span className="text-lg font-normal text-slate-500">Hari</span></h2>
        </div>
      </div>

      {/* Tabel Riwayat */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center gap-2">
            <History size={18} className="text-[#00A99D]" />
            <h3 className="font-semibold text-white">Riwayat Pengajuan</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1e293b] text-slate-400 uppercase">
            <tr>
              <th className="px-6 py-4">Tanggal</th>
              <th className="px-6 py-4">Jenis</th>
              <th className="px-6 py-4">Alasan</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/50">
                <td className="px-6 py-4 font-mono text-slate-300">{item.tgl}</td>
                <td className="px-6 py-4 text-white">{item.tipe}</td>
                <td className="px-6 py-4 text-slate-400">{item.alasan}</td>
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