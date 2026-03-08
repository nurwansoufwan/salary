"use client";

import React from "react";
import { FileText, CheckCircle, XCircle, Plus } from "lucide-react";

export default function CutiPage() {
  const dataCuti = [
    { id: 1, nama: "Rudi Hartono", tipe: "Cuti Tahunan", tanggal: "10-12 Mar 2026", durasi: "3 Hari", alasan: "Acara Keluarga", status: "Pending" },
    { id: 2, nama: "Sinta Bella", tipe: "Sakit", tanggal: "08 Mar 2026", durasi: "1 Hari", alasan: "Demam Tinggi", status: "Approved" },
    { id: 3, nama: "Doni Pratama", tipe: "Cuti Menikah", tanggal: "15-18 Mar 2026", durasi: "4 Hari", alasan: "Menikah", status: "Rejected" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Pengajuan Cuti</h1>
          <p className="text-slate-400 mt-1">Kelola permohonan izin dan cuti karyawan.</p>
        </div>
        <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-lg transition font-medium">
          <Plus size={18} />
          <span>Buat Pengajuan</span>
        </button>
      </div>

      <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1e293b] text-slate-400 uppercase font-medium">
            <tr>
              <th className="px-6 py-4">Karyawan</th>
              <th className="px-6 py-4">Jenis Cuti</th>
              <th className="px-6 py-4">Tanggal & Durasi</th>
              <th className="px-6 py-4">Alasan</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {dataCuti.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/50 transition">
                <td className="px-6 py-4 font-medium text-white">{item.nama}</td>
                <td className="px-6 py-4 text-slate-300">{item.tipe}</td>
                <td className="px-6 py-4">
                  <div className="text-slate-300">{item.tanggal}</div>
                  <div className="text-xs text-slate-500">{item.durasi}</div>
                </td>
                <td className="px-6 py-4 text-slate-400 truncate max-w-[200px]">{item.alasan}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${item.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400' : 
                      item.status === 'Approved' ? 'bg-teal-500/10 text-teal-400' : 
                      'bg-red-500/10 text-red-400'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-teal-500/20 text-teal-400 rounded-lg transition" title="Setujui">
                      <CheckCircle size={18} />
                    </button>
                    <button className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition" title="Tolak">
                      <XCircle size={18} />
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