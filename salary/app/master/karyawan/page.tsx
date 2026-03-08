"use client";
import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function PageKaryawan() {
  const [karyawanList] = useState([
    { id: 1, nama: "Ahmad Fauzi", jabatan: "Manager IT", status: "AKTIF" },
    { id: 2, nama: "Siti Aminah", jabatan: "HR Specialist", status: "AKTIF" },
  ]);

  return (
    <main className="p-8 font-sans bg-black min-h-screen text-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Management Karyawan</h1>
        <p className="text-slate-400 text-sm">Manage employee records and information.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-4">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
            <h3 className="font-bold mb-6 flex items-center gap-2"><Plus size={18} /> Tambah Karyawan</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-xs font-bold text-slate-400 mb-2">NIK</label>
                   <input type="text" placeholder="NIK" className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#00A99D]"/>
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-400 mb-2">Nama</label>
                   <input type="text" placeholder="Nama Lengkap" className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#00A99D]"/>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2">Email</label>
                <input type="email" placeholder="email@company.com" className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#00A99D]"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-xs font-bold text-slate-400 mb-2">Tempat Lahir</label>
                   <input type="text" placeholder="Kota" className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#00A99D]"/>
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-400 mb-2">Tanggal Lahir</label>
                   <input type="date" className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-sm text-slate-400 focus:outline-none focus:border-[#00A99D]"/>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2">Alamat</label>
                <textarea placeholder="Alamat Lengkap" rows={3} className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#00A99D]"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2">Jabatan</label>
                <select className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-sm text-slate-400 focus:outline-none focus:border-[#00A99D]">
                    <option>Pilih Jabatan</option>
                    <option>Manager IT</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2">Status Aktif</label>
                <select className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#00A99D]">
                    <option>Aktif</option>
                    <option>Tidak Aktif</option>
                </select>
              </div>
              <button className="w-full bg-[#005fcc] hover:bg-blue-600 text-white py-3 rounded-lg font-bold transition-all text-sm mt-2">
                Simpan
              </button>
            </form>
          </div>
        </div>

        <div className="xl:col-span-8">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold">Data Karyawan</h3>
              <span className="text-xs bg-[#00A99D]/20 text-[#00A99D] px-3 py-1 rounded-full font-bold">{karyawanList.length} Items Total</span>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-[#1e1e1e] text-slate-400 font-bold uppercase text-xs">
                <tr>
                  <th className="p-4 rounded-l-lg">NO</th>
                  <th className="p-4">NAMA</th>
                  <th className="p-4">JABATAN</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4 text-right rounded-r-lg">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {karyawanList.map((item, index) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-slate-400">{index + 1}</td>
                    <td className="p-4 font-bold">{item.nama}</td>
                    <td className="p-4"><span className="bg-[#2d2d2d] border border-white/10 px-2 py-1 rounded text-xs text-slate-300">{item.jabatan}</span></td>
                    <td className="p-4"><span className="bg-[#00A99D]/20 text-[#00A99D] px-2 py-1 rounded-full text-xs font-bold">{item.status}</span></td>
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