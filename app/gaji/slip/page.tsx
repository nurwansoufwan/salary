"use client";

import React from "react";
import { Printer, Download } from "lucide-react";

export default function SlipGajiPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Slip Gaji Elektronik</h1>
        <button className="flex items-center gap-2 bg-[#005a70] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#004a5c] transition">
          <Printer size={16} /> Cetak PDF
        </button>
      </div>

      {/* Kertas Slip Gaji */}
      <div className="max-w-3xl mx-auto bg-white text-slate-900 p-8 rounded-lg shadow-xl">
        {/* Header Slip */}
        <div className="border-b-2 border-slate-800 pb-6 mb-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-wider text-[#005a70]">PT. TEKNOLOGI MAJU</h2>
            <p className="text-sm text-slate-600">Jl. Perintis Kemerdekaan No. 10, Tasikmalaya</p>
          </div>
          <div className="text-right">
            <h3 className="text-lg font-bold text-slate-800">SLIP GAJI</h3>
            <p className="text-sm text-slate-500">Periode: Maret 2026</p>
          </div>
        </div>

        {/* Info Karyawan */}
        <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
          <div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Nama</span>
              <span className="font-semibold">Karyawan User</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Jabatan</span>
              <span className="font-semibold">Staff IT</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">NIK</span>
              <span className="font-semibold">20260021</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Status</span>
              <span className="font-semibold text-emerald-600">Karyawan Tetap</span>
            </div>
          </div>
        </div>

        {/* Tabel Rincian */}
        <div className="mb-8">
          <h4 className="font-bold text-slate-800 mb-3 border-l-4 border-[#005a70] pl-3">PENERIMAAN</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Gaji Pokok</span>
              <span className="font-mono">Rp 4.500.000</span>
            </div>
            <div className="flex justify-between">
              <span>Tunjangan Transport</span>
              <span className="font-mono">Rp 500.000</span>
            </div>
            <div className="flex justify-between">
              <span>Tunjangan Makan</span>
              <span className="font-mono">Rp 750.000</span>
            </div>
            <div className="flex justify-between font-bold text-slate-800 pt-2 border-t border-slate-300">
              <span>Total Penerimaan (A)</span>
              <span className="font-mono">Rp 5.750.000</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h4 className="font-bold text-slate-800 mb-3 border-l-4 border-rose-500 pl-3">POTONGAN</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>BPJS Kesehatan</span>
              <span className="font-mono text-rose-600">(Rp 100.000)</span>
            </div>
            <div className="flex justify-between">
              <span>BPJS Ketenagakerjaan</span>
              <span className="font-mono text-rose-600">(Rp 150.000)</span>
            </div>
            <div className="flex justify-between font-bold text-slate-800 pt-2 border-t border-slate-300">
              <span>Total Potongan (B)</span>
              <span className="font-mono text-rose-600">Rp 250.000</span>
            </div>
          </div>
        </div>

        {/* Total Gaji Bersih */}
        <div className="bg-slate-100 p-4 rounded-lg flex justify-between items-center">
          <span className="text-lg font-bold text-slate-800">GAJI BERSIH (A - B)</span>
          <span className="text-2xl font-bold text-[#005a70] font-mono">Rp 5.500.000</span>
        </div>
        
        <div className="mt-8 text-center text-xs text-slate-400 italic">
          Dokumen ini digenerate secara otomatis oleh sistem SalaryApp.
        </div>
      </div>
    </div>
  );
}