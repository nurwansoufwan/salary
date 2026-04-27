"use client";

import { useEffect, useState, useRef } from "react";
import { Plus, Edit, Trash2, Search, ChevronDown, X } from "lucide-react";

interface Divisi {
  id: number;
  divisi: string;
}

interface Jabatan {
  id: number;
  jabatan: string;
  id_divisi: number;
  gaji_pokok: number;
}

export default function JabatanPage() {
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([]);
  const [divisiList, setDivisiList] = useState<Divisi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form states
  const [namaJabatan, setNamaJabatan] = useState("");
  const [idDivisi, setIdDivisi] = useState<string>("");
  const [gajiPokok, setGajiPokok] = useState("");

  // Searchable Select states
  const [searchDivisi, setSearchDivisi] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  // Cleanup searchable select when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchDivisi = async () => {
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi", {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      const data = await res.json();
      if (res.ok) setDivisiList(data.data || data);
    } catch (err) {
      console.error("Fetch Divisi Error:", err);
    }
  };

  const fetchJabatan = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan", {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengambil data jabatan");
      setJabatanList(data.data || data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDivisi();
      fetchJabatan();
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = editingId
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan";
    
    const method = editingId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          jabatan: namaJabatan,
          id_divisi: parseInt(idDivisi),
          gaji_pokok: parseInt(gajiPokok),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menyimpan data");

      resetForm();
      fetchJabatan();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Jabatan) => {
    setEditingId(item.id);
    setNamaJabatan(item.jabatan);
    setIdDivisi(item.id_divisi.toString());
    setGajiPokok(item.gaji_pokok.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus jabatan ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Gagal menghapus jabatan");
      fetchJabatan();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setNamaJabatan("");
    setIdDivisi("");
    setGajiPokok("");
    setEditingId(null);
    setError("");
  };

  const filteredDivisi = divisiList.filter(d => 
    d.divisi.toLowerCase().includes(searchDivisi.toLowerCase())
  );

  const selectedDivisiLabel = divisiList.find(d => d.id.toString() === idDivisi)?.divisi || "Pilih Divisi";

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0 
    }).format(amount);
  };

  return (
    <div className="space-y-8 p-4 lg:p-0">
      <div className="pl-8">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Management Jabatan</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Atur struktur organisasi dan standar penggajian.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        
        {/* ================= FORM SECTION ================= */}
        
        <div className="lg:col-span-4 rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 dark:bg-zinc-900 dark:shadow-none border border-slate-100 dark:border-zinc-800 h-fit lg:sticky lg:top-24">
          <div className="mb-6 flex items-center gap-3">
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${editingId ? 'bg-yellow-500/10 text-yellow-500' : 'bg-blue-500/10 text-blue-500'}`}>
              {editingId ? <Edit size={20} /> : <Plus size={20} />}
            </div>
            
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {editingId ? "Edit Jabatan" : "Tambah Jabatan"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">Nama Jabatan</label>
              <input
                type="text"
                placeholder="Contoh: Senior Developer"
                value={namaJabatan}
                onChange={(e) => setNamaJabatan(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                required
              />
            </div>

            {/* Custom Searchable Select */}
            <div className="relative" ref={selectRef}>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">Divisi</label>
              <div 
                onClick={() => setIsSelectOpen(!isSelectOpen)}
                className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm flex justify-between items-center transition-all hover:border-slate-300 dark:border-zinc-700 dark:bg-zinc-800"
              >
                <span className={idDivisi ? "text-slate-900 dark:text-white font-medium" : "text-slate-400"}>
                  {selectedDivisiLabel}
                </span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${isSelectOpen ? 'rotate-180' : ''}`} />
              </div>

              {isSelectOpen && (
                <div className="absolute z-50 mt-2 w-full rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 ring-1 ring-slate-200/50">
                  <div className="relative mb-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                      type="text"
                      placeholder="Cari divisi..."
                      value={searchDivisi}
                      onChange={(e) => setSearchDivisi(e.target.value)}
                      className="w-full rounded-lg border-none bg-slate-100 pl-9 pr-4 py-2 text-xs outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto overflow-x-hidden">
                    {filteredDivisi.map((d) => (
                      <div
                        key={d.id}
                        onClick={() => {
                          setIdDivisi(d.id.toString());
                          setIsSelectOpen(false);
                          setSearchDivisi("");
                        }}
                        className={`rounded-lg px-4 py-2.5 text-sm cursor-pointer transition-colors mb-1 ${
                          idDivisi === d.id.toString() 
                            ? "bg-blue-600 text-white" 
                            : "hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {d.divisi}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">Gaji Pokok</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rp</span>
                <input
                  type="number"
                  placeholder="0"
                  value={gajiPokok}
                  onChange={(e) => setGajiPokok(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 text-sm font-bold focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-bold text-red-600 border border-red-100 dark:bg-red-900/20 dark:border-red-900/30">
                <X size={14} /> {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-95 disabled:opacity-50 transition-all"
              >
                {loading ? "Menyimpan..." : editingId ? "Perbarui" : "Simpan Jabatan"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl bg-slate-100 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-400 transition-all"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* ================= TABLE SECTION ================= */}
        <div className="lg:col-span-8 rounded-3xl bg-white shadow-xl shadow-slate-200/50 dark:bg-zinc-900 dark:shadow-none border border-slate-100 dark:border-zinc-800 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 dark:border-zinc-800 flex justify-between items-center bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Daftar Jabatan</h2>
            <div className="bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-emerald-500/20">
              {jabatanList.length} Total Posisi
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-zinc-800/50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-zinc-800">
                  <th className="px-8 py-4">No</th>
                  <th className="px-8 py-4">Jabatan</th>
                  <th className="px-8 py-4">Divisi</th>
                  <th className="px-8 py-4">Gaji Pokok</th>
                  <th className="px-8 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
                {jabatanList.map((item, index) => (
                  <tr key={item.id} className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/5 transition-all">
                    <td className="px-8 py-5 text-sm font-bold text-slate-400">{index + 1}</td>
                    <td className="px-8 py-5">
                      <div className="text-sm font-bold text-slate-700 dark:text-white group-hover:text-blue-600 transition-colors">
                        {item.jabatan}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="inline-block px-3 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-zinc-700">
                        {divisiList.find(d => d.id === item.id_divisi)?.divisi || "N/A"}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
                        {formatCurrency(item.gaji_pokok)}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}