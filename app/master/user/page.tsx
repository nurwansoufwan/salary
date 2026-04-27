"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, UserPlus, ShieldAlert } from "lucide-react";

interface User {
  id: number;
  nama: string;
  email: string;
  role: string;
}

export default function PageUser() {
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form states
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [password, setPassword] = useState(""); // Tambahan untuk create user

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengambil data user");
      setUserList(data.data || data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = editingId
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/user/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/user";
    
    const method = editingId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          nama,
          email,
          role,
          ...(password && { password }), // Hanya kirim password jika diisi
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menyimpan data user");

      resetForm();
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNama("");
    setEmail("");
    setRole("USER");
    setPassword("");
    setEditingId(null);
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setNama(user.nama);
    setEmail(user.email);
    setRole(user.role);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus user ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (!res.ok) throw new Error("Gagal menghapus user");
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="p-8 font-sans bg-black min-h-screen text-white relative">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1 tracking-tight">Management User</h1>
        <p className="text-slate-400 text-sm">Control system access and user permissions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-sm">
        {/* FORM SECTION */}
        <div className="md:col-span-4">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10 sticky top-8 shadow-2xl">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              {editingId ? <Edit size={18} className="text-[#00A99D]" /> : <Plus size={18} className="text-[#00A99D]" />} 
              {editingId ? "Edit User" : "Tambah User"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00A99D] transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00A99D] transition-all"
                  placeholder="name@mail.com"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Role Access</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00A99D]"
                >
<<<<<<< HEAD
                  <option value="USER">USERR</option>
=======
                  <option value="USER">USER</option>
>>>>>>> f6c9514 (apa ajal)
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>

              {!editingId && (
                <div>
                  <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00A99D] transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-xs">
                  <ShieldAlert size={14} /> {error}
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#005a70] hover:bg-[#008f85] text-white py-3 rounded-lg font-bold transition-all shadow-lg shadow-cyan-900/20 disabled:opacity-50"
                >
                  {loading ? "Processing..." : editingId ? "Update User" : "Simpan User"}
                </button>
                {editingId && (
                  <button 
                    type="button"
                    onClick={resetForm}
                    className="px-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="md:col-span-8">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold">Daftar Pengguna</h3>
              <span className="text-[10px] bg-[#00A99D]/20 text-[#00A99D] px-3 py-1 rounded-full font-black tracking-widest uppercase">
                {userList.length} Total Member
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#1e1e1e] text-slate-500 font-black uppercase text-[10px] tracking-tighter">
                  <tr>
                    <th className="p-4 rounded-l-lg">NAMA & EMAIL</th>
                    <th className="p-4">ROLE</th>
                    <th className="p-4 text-right rounded-r-lg">AKSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {userList.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-12 text-center text-slate-500 italic">
                        {loading ? "Fetching records..." : "No users found."}
                      </td>
                    </tr>
                  ) : (
                    userList.map((user) => (
                      <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="p-4">
                          <div className="font-bold text-slate-200 group-hover:text-[#00A99D] transition-colors">
                            {user.nama}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono tracking-tight">{user.email}</div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-black tracking-widest ${
                            user.role === 'ADMIN' 
                            ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                            : 'bg-slate-800 text-slate-400 border border-white/5'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleEdit(user)}
                              className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                            >
                              <Edit size={16}/>
                            </button>
                            <button 
                              onClick={() => handleDelete(user.id)}
                              className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                            >
                              <Trash2 size={16}/>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}