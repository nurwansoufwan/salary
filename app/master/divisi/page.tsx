"use client";
import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function PageDivisi() {
  const [divisiList] = useState([
    { id: 1, nama: "OB" },
    { id: 2, nama: "INFORMATION TECHNOLOGY" },
    { id: 3, nama: "EDUCATION" },
    { id: 4, nama: "HRD" },
  ]);

  return (
    <main className="p-8 font-sans bg-black min-h-screen text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Management Divisi</h1>
        <p className="text-slate-400 text-sm">Configure and manage company departments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Form Tambah */}
        <div className="md:col-span-4">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <Plus size={18} /> Tambah Divisi
            </h3>
            <form>
              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-400 mb-2">NAMA DIVISI</label>
                <input 
                  type="text" 
                  placeholder="Contoh: IT Support" 
                  className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#00A99D]"
                />
              </div>
              <button className="w-full bg-[#005fcc] hover:bg-blue-600 text-white py-3 rounded-lg font-bold transition-all text-sm">
                Simpan
              </button>
            </form>
          </div>
        </div>

        {/* Tabel Data */}
        <div className="md:col-span-8">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold">Data Divisi</h3>
              <span className="text-xs bg-[#00A99D]/20 text-[#00A99D] px-3 py-1 rounded-full font-bold">{divisiList.length} Items Total</span>
            </div>

            <table className="w-full text-left text-sm">
              <thead className="bg-[#1e1e1e] text-slate-400 font-bold uppercase text-xs">
                <tr>
                  <th className="p-4 rounded-l-lg">NO</th>
                  <th className="p-4">NAMA DIVISI</th>
                  <th className="p-4 text-right rounded-r-lg">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {divisiList.map((item, index) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-slate-400">{index + 1}</td>
                    <td className="p-4 font-bold">{item.nama}</td>
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