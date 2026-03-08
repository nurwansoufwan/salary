"use client";

import React, { useState } from "react";
import { Wallet, PlayCircle, Calendar, CheckCircle2 } from "lucide-react";

export default function ProsesGajiPage() {
  const [loading, setLoading] = useState(false);
  const [selesai, setSelesai] = useState(false);

  const handleProses = () => {
    setLoading(true);
    // Simulasi loading proses hitung gaji
    setTimeout(() => {
        setLoading(false);
        setSelesai(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-8 flex items-center justify-center">
      <div className="w-full max-w-lg">
        
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Proses Penggajian</h1>
            <p className="text-slate-400">Pilih periode untuk menghitung gaji seluruh karyawan.</p>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-8 shadow-2xl shadow-cyan-900/10">
            {!selesai ? (
                <>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Periode Gaji</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 text-slate-500" size={18} />
                            <select className="w-full bg-[#020617] border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white appearance-none focus:outline-none focus:border-[#00A99D]">
                                <option>Maret 2026</option>
                                <option>April 2026</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl mb-6 text-sm text-amber-400">
                        <p>⚠️ Pastikan semua data absensi dan cuti sudah divalidasi sebelum memproses gaji.</p>
                    </div>

                    <button 
                        onClick={handleProses}
                        disabled={loading}
                        className="w-full bg-[#005a70] hover:bg-[#004a5c] disabled:opacity-50 text-white py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            "Sedang Menghitung..."
                        ) : (
                            <>
                                <PlayCircle size={20} />
                                PROSES SEKARANG
                            </>
                        )}
                    </button>
                </>
            ) : (
                <div className="text-center py-6">
                    <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Gaji Berhasil Dihitung!</h3>
                    <p className="text-slate-400 text-sm mb-6">Slip gaji sudah tersedia untuk 124 karyawan.</p>
                    <button 
                        onClick={() => window.location.href = '/gaji'}
                        className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-lg text-sm"
                    >
                        Lihat Laporan Gaji
                    </button>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}