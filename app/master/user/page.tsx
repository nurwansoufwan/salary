"use client";
import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function PageUser() {
  const [userList] = useState([
    { id: 1, nama: "Admin HRD", email: "hrd@mail.com", role: "ADMIN" },
    { id: 2, nama: "Nurwan Soufwan", email: "nurwan@mail.com", role: "USER" },
  ]);

  return (
    <main className="p-8 font-sans bg-black min-h-screen text-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Management User</h1>
        <p className="text-slate-400 text-sm">Control system access and user permissions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
            <h3 className="font-bold mb-6 flex items-center gap-2"><Plus size={18} /> Tambah User</h3>
            <form className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Nama Lengkap</label>
                <input type="text" className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00A99D]"/>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Email</label>
                <input type="email" className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00A99D]"/>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Role</label>
                <select className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-slate-400 focus:outline-none focus:border-[#00A99D]">
                  <option>USER</option>
                  <option>ADMIN</option>
                </select>
              </div>
              <button className="w-full bg-[#005a70] hover:bg-[#008f85] text-white py-3 rounded-lg font-bold">Simpan</button>
            </form>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
            <h3 className="font-bold mb-6">Daftar Pengguna</h3>
            <table className="w-full text-left text-sm">
              <thead className="bg-[#1e1e1e] text-slate-400 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-4">NAMA</th>
                  <th className="p-4">ROLE</th>
                  <th className="p-4 text-right">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {userList.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                        <div className="font-bold">{user.nama}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                    </td>
                    <td className="p-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${user.role === 'ADMIN' ? 'bg-amber-500/20 text-amber-500' : 'bg-slate-700 text-slate-200'}`}>
                            {user.role}
                        </span>
                    </td>
                    <td className="p-4 text-right">
                        <button className="text-blue-400 mr-2 hover:text-blue-300"><Edit size={16}/></button>
                        <button className="text-red-400 hover:text-red-300"><Trash2 size={16}/></button>
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