"use client";
import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function PageJabatan() {
  const [jabatanList] = useState([
    { id: 1, jabatan: "STAFF", divisi: "INFORMATION TECHNOLOGY", gaji: 3000000 },
    { id: 2, jabatan: "HEAD OF", divisi: "HRD", gaji: 5000000 },
  ]);

  return (
    <main className="p-8 font-sans bg-black min-h-screen text-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Management Jabatan</h1>
        <p className="text-slate-400 text-sm">Configure positions and salary structures.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
            <h3 className="font-bold mb-6 flex items-center gap-2"><Plus size={18} /> Tambah Jabatan</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2">Nama Jabatan</label>
                <input type="text" placeholder="Contoh: Manager IT" className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#00A99D]"/>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2">Pilih Divisi</label>
                <select className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-sm text-slate-400 focus:outline-none focus:border-[#00A99D]">
                  <option>Pilih Divisi</option>
                  <option>Information Technology</option>
                  <option>HRD</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2">Gaji Pokok</label>
                <input type="number" placeholder="Rp 0" className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#00A99D]"/>
              </div>
              <button className="w-full bg-[#005fcc] hover:bg-blue-600 text-white py-3 rounded-lg font-bold transition-all text-sm mt-2">
                Simpan
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold">Data Jabatan</h3>
              <span className="text-xs bg-[#00A99D]/20 text-[#00A99D] px-3 py-1 rounded-full font-bold">{jabatanList.length} Items Total</span>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-[#1e1e1e] text-slate-400 font-bold uppercase text-xs">
                <tr>
                  <th className="p-4 rounded-l-lg">NO</th>
                  <th className="p-4">JABATAN</th>
                  <th className="p-4">DIVISI</th>
                  <th className="p-4">GAJI POKOK</th>
                  <th className="p-4 text-right rounded-r-lg">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {jabatanList.map((item, index) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-slate-400">{index + 1}</td>
                    <td className="p-4 font-bold">{item.jabatan}</td>
                    <td className="p-4"><span className="bg-[#2d2d2d] border border-white/10 px-2 py-1 rounded text-xs text-slate-300">{item.divisi}</span></td>
                    <td className="p-4 text-[#00A99D] font-bold">Rp {item.gaji.toLocaleString()}</td>
                    <td className="p-4 text-right flex justify-end gap-2">
                       <button className="text-yellow-500 hover:text-yellow-400"><Edit size={16} /></button>
                       <button className="text-red-500 hover:text-red-400"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}