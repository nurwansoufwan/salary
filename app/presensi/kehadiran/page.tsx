"use client";

import React, { useState, useEffect } from "react";
import { Clock, MapPin, CheckCircle } from "lucide-react";

export default function KehadiranPage() {
  const [waktu, setWaktu] = useState("");
  const [status, setStatus] = useState("Belum Absen");

  // Update jam real-time
  useEffect(() => {
    const timer = setInterval(() => {
      setWaktu(new Date().toLocaleTimeString("id-ID"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAbsen = (tipe: string) => {
    alert(`Berhasil Absen ${tipe} pada jam ${waktu}`);
    setStatus(`Sudah Absen ${tipe}`);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Presensi Harian</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Jam Digital */}
        <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg shadow-cyan-900/10">
          <p className="text-slate-400 mb-2">Waktu Saat Ini</p>
          <div className="text-5xl font-mono font-bold text-[#00A99D] mb-4">
            {waktu || "--:--:--"}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full">
            <MapPin size={14} />
            <span>Lokasi: Kantor Pusat (Tasikmalaya)</span>
          </div>
        </div>

        {/* Card Tombol Aksi */}
        <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-2xl flex flex-col justify-center gap-4">
          <div className="mb-4">
            <p className="text-sm text-slate-400">Status Hari Ini:</p>
            <p className="text-xl font-semibold text-white flex items-center gap-2">
              <CheckCircle size={20} className={status === "Belum Absen" ? "text-slate-600" : "text-emerald-500"} />
              {status}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleAbsen("Masuk")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-emerald-900/20 flex flex-col items-center gap-1"
            >
              <Clock size={24} />
              ABSEN MASUK
            </button>
            <button 
              onClick={() => handleAbsen("Pulang")}
              className="bg-rose-600 hover:bg-rose-500 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-rose-900/20 flex flex-col items-center gap-1"
            >
              <LogOutIcon />
              ABSEN PULANG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogOutIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
    )
}