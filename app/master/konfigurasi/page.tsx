"use client";
import { useState } from "react";
import { Plus, Info, Minus } from "lucide-react";

export default function PageKonfigurasi() {
  return (
    <main className="p-8 font-sans bg-black min-h-screen text-white relative">
      {/* Zoom Control sesuai desain proyektor */}
      <div className="absolute top-8 right-8 flex items-center bg-[#111] border border-white/10 rounded-lg p-2 text-sm shadow-md">
        <span className="px-3 text-slate-400">75%</span>
        <button className="p-1 hover:bg-white/10 rounded"><Minus size={14}/></button>
        <button className="p-1 hover:bg-white/10 rounded"><Plus size={14}/></button>
        <button className="ml-2 px-2 py-1 bg-white/10 rounded text-xs hover:bg-white/20">Reset</button>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Konfigurasi Tahun</h1>
        <p className="text-slate-400 text-sm">Setup annual leave and compensation parameters.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-sm">
        <div className="md:col-span-4">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
            <h3 className="font-bold mb-6 flex items-center gap-2"><Plus size={18} /> Tambah Konfigurasi</h3>
            
            {/* Box Peringatan Kuning sesuai gambar */}
            <div className="bg-yellow-900/20 border border-yellow-700/50 p-4 rounded-lg flex gap-3 mb-6">
                <Info className="text-yellow-500 shrink-0" size={18} />
                <p className="text-xs text-yellow-500 leading-relaxed">
                    Jika sudah terdapat satu data maka tidak dapat menambah data lagi.
                </p>
            </div>

            <form className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Tahun</label>
                <input type="number" placeholder="2024" className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00A99D]"/>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Jatah Cuti Tahunan</label>
                <div className="relative">
                    <input type="number" placeholder="12" className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00A99D]"/>
                    <span className="absolute right-4 top-3 text-[10px] font-bold text-slate-600 tracking-widest">HARI</span>
                </div>
              </div>
              <button className="w-full bg-[#005a70] hover:bg-[#008f85] text-white py-3 rounded-lg font-bold transition-all shadow-lg">
                Simpan
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold">Data Konfigurasi</h3>
              <span className="text-xs bg-[#00A99D]/20 text-[#00A99D] px-3 py-1 rounded-full font-bold">1 Items Total</span>
            </div>
            <table className="w-full text-left">
              <thead className="bg-[#1e1e1e] text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4 rounded-l-lg">NO</th>
                  <th className="p-4">TAHUN</th>
                  <th className="p-4">JATAH CUTI</th>
                  <th className="p-4">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-slate-500">1</td>
                    <td className="p-4 font-bold text-white">2024</td>
                    <td className="p-4 text-slate-300">12 Hari</td>
                    <td className="p-4">
                      <span className="bg-[#00A99D]/20 text-[#00A99D] px-2 py-1 rounded-full text-[10px] font-bold uppercase">AKTIF</span>
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}