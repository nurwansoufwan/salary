"use client";

import React from "react";
import { Send } from "lucide-react";

export default function FormCutiPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Form Pengajuan Cuti</h1>

      <div className="max-w-2xl bg-[#0f172a] border border-slate-800 rounded-xl p-8">
        <form className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Jenis Cuti</label>
              <select className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00A99D]">
                <option>Cuti Tahunan</option>
                <option>Sakit (dengan Surat Dokter)</option>
                <option>Cuti Menikah</option>
                <option>Cuti Melahirkan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Tanggal Mulai</label>
              <input type="date" className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00A99D]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Durasi (Hari)</label>
              <input type="number" placeholder="Contoh: 3" className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00A99D]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Tanggal Selesai</label>
              <input type="date" className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00A99D]" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Alasan Cuti</label>
            <textarea rows={4} className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00A99D]" placeholder="Jelaskan alasan pengajuan cuti..."></textarea>
          </div>

          <div className="flex justify-end pt-4">
            <button type="button" className="flex items-center gap-2 bg-[#005a70] hover:bg-[#004a5c] text-white px-6 py-3 rounded-lg font-semibold transition">
              <Send size={18} />
              Kirim Pengajuan
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}