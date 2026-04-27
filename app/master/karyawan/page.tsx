"use client";

import { useEffect, useState, useRef } from "react";
import { Plus, Edit, Trash2, Info, X, ChevronDown } from "lucide-react";

interface Jabatan {
  id: number;
  jabatan: string;
}

interface Karyawan {
  id: number;
  nik: string;
  nama: string;
  email: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  id_jabatan: number;
  status_aktif: boolean;
  jabatan?: Jabatan;
}

export default function PageKaryawan() {
  const [karyawanList, setKaryawanList] = useState<Karyawan[]>([]);
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedKaryawan, setSelectedKaryawan] = useState<Karyawan | null>(null);

  // Form states
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [idJabatan, setIdJabatan] = useState<string>("");
  const [statusAktif, setStatusAktif] = useState(true);

  // Searchable Select states
  const [searchJabatan, setSearchJabatan] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchJabatan = async () => {
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) setJabatanList(data.data || data);
    } catch (err) {
      console.error("Fetch Jabatan Error:", err);
    }
  };

  const fetchKaryawan = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengambil data");
      setKaryawanList(data.data || data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchJabatan();
      fetchKaryawan();
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = editingId
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan";
    
    const method = editingId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nik, nama, email, alamat,
          tempat_lahir: tempatLahir,
          tanggal_lahir: tanggalLahir,
          id_jabatan: parseInt(idJabatan),
          status_aktif: statusAktif,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menyimpan data");

      resetForm();
      fetchKaryawan();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNik(""); setNama(""); setEmail(""); setTempatLahir("");
    setTanggalLahir(""); setAlamat(""); setIdJabatan("");
    setStatusAktif(true); setEditingId(null);
    setError("");
  };

  const handleEdit = (item: Karyawan) => {
    setEditingId(item.id);
    setNik(item.nik);
    setNama(item.nama);
    setEmail(item.email);
    setTempatLahir(item.tempat_lahir || "");
    setTanggalLahir(item.tanggal_lahir || "");
    setAlamat(item.alamat || "");
    setIdJabatan(item.id_jabatan.toString());
    setStatusAktif(item.status_aktif);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus data karyawan ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Gagal menghapus");
      fetchKaryawan();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const filteredJabatan = jabatanList.filter(j => 
    j.jabatan.toLowerCase().includes(searchJabatan.toLowerCase())
  );

  const selectedJabatanLabel = jabatanList.find(j => j.id.toString() === idJabatan)?.jabatan || "Pilih Jabatan";

  return (
    <main className="p-8 font-sans bg-[#F8FAFC] min-h-screen text-slate-900">
      {/* Header */}
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-bold mb-1">Management Karyawan</h1>
        <p className="text-slate-500 text-sm">Manage employee records and information.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Form Section */}
        <div className="xl:col-span-4 sticky top-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-6 flex items-center gap-2 text-[#00A99D]">
              {editingId ? <Edit size={18} /> : <Plus size={18} />} 
              {editingId ? "Edit Karyawan" : "Tambah Karyawan"}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">NIK</label>
                  <input type="text" value={nik} onChange={(e) => setNik(e.target.value)} required placeholder="NIK" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A99D]/20 focus:border-[#00A99D] transition-all"/>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Nama</label>
                  <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} required placeholder="Nama Lengkap" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A99D]/20 focus:border-[#00A99D] transition-all"/>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="email@company.com" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A99D]/20 focus:border-[#00A99D] transition-all"/>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Tempat Lahir</label>
                  <input type="text" value={tempatLahir} onChange={(e) => setTempatLahir(e.target.value)} placeholder="Kota" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A99D]/20 focus:border-[#00A99D] transition-all"/>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Tanggal Lahir</label>
                  <input type="date" value={tanggalLahir} onChange={(e) => setTanggalLahir(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A99D]/20 focus:border-[#00A99D] transition-all"/>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Alamat</label>
                <textarea value={alamat} onChange={(e) => setAlamat(e.target.value)} placeholder="Alamat Lengkap" rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A99D]/20 focus:border-[#00A99D] transition-all"></textarea>
              </div>

              {/* Searchable Jabatan Select */}
              <div className="relative" ref={selectRef}>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Jabatan</label>
                <div 
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  className="w-full cursor-pointer bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-900 flex justify-between items-center hover:bg-slate-100 transition-all"
                >
                  <span className={idJabatan ? "text-slate-900" : "text-slate-400"}>{selectedJabatanLabel}</span>
                  <ChevronDown size={14} className="text-slate-400" />
                </div>

                {isSelectOpen && (
                  <div className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden ring-1 ring-black/5">
                    <input
                      type="text"
                      placeholder="Cari jabatan..."
                      value={searchJabatan}
                      onChange={(e) => setSearchJabatan(e.target.value)}
                      className="w-full bg-slate-50 border-b border-slate-200 p-3 text-xs text-slate-900 outline-none"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="max-h-40 overflow-y-auto">
                      {filteredJabatan.map((j) => (
                        <div
                          key={j.id}
                          onClick={() => {
                            setIdJabatan(j.id.toString());
                            setIsSelectOpen(false);
                            setSearchJabatan("");
                          }}
                          className="p-3 text-xs hover:bg-[#00A99D] hover:text-white cursor-pointer transition-colors text-slate-700 font-medium"
                        >
                          {j.jabatan}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Status Aktif</label>
                <select 
                  value={statusAktif ? "true" : "false"} 
                  onChange={(e) => setStatusAktif(e.target.value === "true")}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A99D]/20 focus:border-[#00A99D] transition-all"
                >
                  <option value="true">Aktif</option>
                  <option value="false">Tidak Aktif</option>
                </select>
              </div>

              {error && <p className="text-red-600 text-xs italic font-medium">{error}</p>}

              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={loading} className="flex-1 bg-[#005fcc] hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-all shadow-sm text-sm disabled:opacity-50">
                  {loading ? "Processing..." : editingId ? "Update" : "Simpan"}
                </button>
                {editingId && (
                  <button type="button" onClick={resetForm} className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 rounded-lg text-sm font-bold transition-all">Batal</button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Table Section */}
        <div className="xl:col-span-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800">Data Karyawan</h3>
              <span className="text-xs bg-[#00A99D]/10 text-[#00A99D] px-3 py-1 rounded-full font-bold border border-[#00A99D]/20">
                {karyawanList.length} Items Total
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                    <th className="p-4 rounded-l-lg border-y border-slate-100">NO</th>
                    <th className="p-4 border-y border-slate-100">NAMA</th>
                    <th className="p-4 border-y border-slate-100">JABATAN</th>
                    <th className="p-4 border-y border-slate-100">STATUS</th>
                    <th className="p-4 text-right rounded-r-lg border-y border-slate-100">AKSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {karyawanList.map((item, index) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="p-4 text-slate-400">{index + 1}</td>
                      <td className="p-4 font-bold text-slate-800">{item.nama}</td>
                      <td className="p-4">
                        <span className="bg-slate-100 border border-slate-200 px-2 py-1 rounded text-[10px] text-slate-600 font-medium">
                          {item.jabatan?.jabatan || "N/A"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${item.status_aktif ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                          {item.status_aktif ? 'AKTIF' : 'OFF'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-3">
                          <button onClick={() => setSelectedKaryawan(item)} className="text-slate-400 hover:text-blue-600 transition-colors"><Info size={16}/></button>
                          <button onClick={() => handleEdit(item)} className="text-amber-500 hover:text-amber-600 transition-colors"><Edit size={16} /></button>
                          <button onClick={() => handleDelete(item.id)} className="text-rose-500 hover:text-rose-600 transition-colors"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {karyawanList.length === 0 && !loading && (
                    <tr><td colSpan={5} className="p-8 text-center text-slate-400 italic">Data tidak ditemukan</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Detail */}
      {selectedKaryawan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
            <div className="bg-[#005fcc] p-6 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg">Detail Karyawan</h3>
              <button onClick={() => setSelectedKaryawan(null)} className="hover:rotate-90 transition-transform"><X size={20}/></button>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium">NIK</span>
                <span className="font-mono text-slate-900">{selectedKaryawan.nik}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium">Nama</span>
                <span className="font-bold text-slate-900">{selectedKaryawan.nama}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium">Email</span>
                <span className="text-slate-900">{selectedKaryawan.email}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-medium">Jabatan</span>
                <span className="text-[#00A99D] font-bold">{selectedKaryawan.jabatan?.jabatan}</span>
              </div>
              <div className="pt-2">
                <span className="text-slate-500 font-medium block mb-1">Alamat</span>
                <p className="bg-slate-50 p-3 rounded-lg italic text-slate-600 border border-slate-100">{selectedKaryawan.alamat || "-"}</p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
               <button onClick={() => setSelectedKaryawan(null)} className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors">Tutup</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}