"use client";

import { useEffect, useState } from "react";
import { Plus, Info, Minus, Pencil, Trash2, RotateCcw } from "lucide-react";

interface Konfigurasi {
  id: number;
  tahun: string;
  jatah_cuti_tahunan: number;
  nilai_uang_per_cuti: number;
  aktif: boolean;
}

export default function PageKonfigurasi() {
  const [konfigurasiList, setKonfigurasiList] = useState<Konfigurasi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form states
  const [tahun, setTahun] = useState("");
  const [jatahCuti, setJatahCuti] = useState("");
  const [nilaiUang, setNilaiUang] = useState("");
  const [aktif, setAktif] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const fetchKonfigurasi = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/konfigurasi", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengambil data konfigurasi");
      setKonfigurasiList(Array.isArray(data.data) ? data.data : data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchKonfigurasi();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = editingId
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/konfigurasi/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/konfigurasi";
    
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
          tahun,
          jatah_cuti_tahunan: parseInt(jatahCuti),
          nilai_uang_per_cuti: parseInt(nilaiUang),
          aktif: aktif,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menyimpan data");

      resetForm();
      fetchKonfigurasi();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTahun("");
    setJatahCuti("");
    setNilaiUang("");
    setAktif(true);
    setEditingId(null);
    setError("");
  };

  const handleEdit = (item: Konfigurasi) => {
    setEditingId(item.id);
    setTahun(item.tahun);
    setJatahCuti(item.jatah_cuti_tahunan.toString());
    setNilaiUang(item.nilai_uang_per_cuti.toString());
    setAktif(item.aktif);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus konfigurasi ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/konfigurasi/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (!res.ok) throw new Error("Gagal menghapus data");
      fetchKonfigurasi();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <main className="p-8 font-sans bg-black min-h-screen text-white relative">
      {/* Zoom Control */}
      <div className="absolute top-8 right-8 flex items-center bg-[#111] border border-white/10 rounded-lg p-2 text-sm shadow-md z-10">
        <span className="px-3 text-slate-400">100%</span>
        <button className="p-1 hover:bg-white/10 rounded"><Minus size={14}/></button>
        <button className="p-1 hover:bg-white/10 rounded"><Plus size={14}/></button>
        <button onClick={() => window.location.reload()} className="ml-2 px-2 py-1 bg-white/10 rounded text-xs hover:bg-white/20 flex items-center gap-1">
          <RotateCcw size={12}/> Refresh
        </button>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Konfigurasi Tahun</h1>
        <p className="text-slate-400 text-sm">Setup annual leave and compensation parameters.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-sm">
        {/* FORM SECTION */}
        <div className="md:col-span-4">
          <div className="bg-[#111] p-6 rounded-xl border border-white/10 sticky top-8">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              {editingId ? <Pencil size={18} className="text-amber-500" /> : <Plus size={18} className="text-[#00A99D]" />} 
              {editingId ? "Edit Konfigurasi" : "Tambah Konfigurasi"}
            </h3>
            
            {/* Warning Box */}
            {!editingId && konfigurasiList.length > 0 && (
              <div className="bg-yellow-900/20 border border-yellow-700/50 p-4 rounded-lg flex gap-3 mb-6">
                <Info className="text-yellow-500 shrink-0" size={18} />
                <p className="text-xs text-yellow-500 leading-relaxed">
                  Data konfigurasi sudah tersedia. Gunakan fitur edit untuk melakukan perubahan.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Tahun</label>
                <input 
                  type="number" 
                  value={tahun}
                  onChange={(e) => setTahun(e.target.value)}
                  placeholder="2024" 
                  className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00A99D] transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Jatah Cuti Tahunan</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={jatahCuti}
                    onChange={(e) => setJatahCuti(e.target.value)}
                    placeholder="12" 
                    className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00A99D] transition-all"
                    required
                  />
                  <span className="absolute right-4 top-3 text-[10px] font-bold text-slate-600 tracking-widest">HARI</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Nilai Uang Per Cuti</label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-slate-500 text-xs font-bold">Rp</span>
                  <input 
                    type="number" 
                    value={nilaiUang}
                    onChange={(e) => setNilaiUang(e.target.value)}
                    placeholder="0" 
                    className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 pl-10 text-white focus:outline-none focus:border-[#00A99D] transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Status</label>
                <select 
                  value={aktif ? "true" : "false"}
                  onChange={(e) => setAktif(e.target.value === "true")}
                  className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#00A99D]"
                >
                  <option value="true">Aktif</option>
                  <option value="false">Tidak Aktif</option>
                </select>
              </div>

              {error && <p className="text-red-500 text-xs italic">{error}</p>}

              <div className="flex gap-2">
                <button 
                  type="submit"
                  disabled={loading}
                  className={`flex-1 ${editingId ? 'bg-amber-600 hover:bg-amber-700' : 'bg-[#005a70] hover:bg-[#008f85]'} text-white py-3 rounded-lg font-bold transition-all shadow-lg disabled:opacity-50`}
                >
                  {loading ? "Loading..." : editingId ? "Update Data" : "Simpan Data"}
                </button>
                {editingId && (
                  <button 
                    type="button"
                    onClick={resetForm}
                    className="px-4 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
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
          <div className="bg-[#111] p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold">Data Konfigurasi</h3>
              <span className="text-xs bg-[#00A99D]/20 text-[#00A99D] px-3 py-1 rounded-full font-bold">
                {konfigurasiList.length} Items Total
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead className="bg-[#1e1e1e] text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4 rounded-l-lg">NO</th>
                    <th className="p-4">TAHUN</th>
                    <th className="p-4">JATAH</th>
                    <th className="p-4">NILAI UANG</th>
                    <th className="p-4">STATUS</th>
                    <th className="p-4 text-right rounded-r-lg">AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {konfigurasiList.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500 italic">Data tidak ditemukan</td>
                    </tr>
                  ) : (
                    konfigurasiList.map((item, index) => (
                      <tr key={item.id} className="bg-white/5 hover:bg-white/10 transition-colors group">
                        <td className="p-4 text-slate-500 rounded-l-lg">{index + 1}</td>
                        <td className="p-4 font-bold text-white">{item.tahun}</td>
                        <td className="p-4 text-slate-300">{item.jatah_cuti_tahunan} Hari</td>
                        <td className="p-4 text-emerald-400 font-mono">{formatCurrency(item.nilai_uang_per_cuti)}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${item.aktif ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'}`}>
                            {item.aktif ? 'AKTIF' : 'OFF'}
                          </span>
                        </td>
                        <td className="p-4 text-right rounded-r-lg">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleEdit(item)}
                              className="p-2 hover:bg-amber-500/20 text-amber-500 rounded-lg transition-all"
                            >
                              <Pencil size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(item.id)}
                              className="p-2 hover:bg-rose-500/20 text-rose-500 rounded-lg transition-all"
                            >
                              <Trash2 size={16} />
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