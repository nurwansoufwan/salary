"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutGrid, 
  Database, 
  Hotel, 
  Briefcase, 
  Users, 
  UserCog,      
  Settings,     
  ClipboardCheck, 
  CalendarRange,  
  Banknote,       
  LogOut, 
  ChevronDown 
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMasterOpen, setIsMasterOpen] = useState(true);

  const isActive = (path: string) => pathname === path;
  const isMasterActive = pathname.startsWith("/master");

  const handleLogout = () => {
    localStorage.clear();
    router.push("/sign-in");
  };

  const menuItemClass = (path: string) => `
    w-full flex items-center gap-3 p-3 rounded-lg transition-all mb-1 cursor-pointer text-sm font-medium
    ${isActive(path) 
      ? "bg-[#005a70] text-white shadow-md border-l-4 border-[#00A99D]" 
      : "text-slate-400 hover:text-white hover:bg-white/5"}
  `;

  return (
    <aside className="w-64 bg-[#082f49] flex flex-col fixed h-full z-50 border-r border-white/5 font-sans overflow-hidden">
      
      {/* LOGO */}
      <div className="p-6 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#00A99D] rounded flex items-center justify-center text-white font-bold text-lg shadow-lg">S</div>
          <span className="text-xl font-bold text-white tracking-tight italic">Salary<span className="text-[#00A99D]">App</span></span>
        </div>
      </div>

      {/* NAVIGASI */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        
        <Link href="/dashboard">
          <div className={menuItemClass("/dashboard")}>
            <LayoutGrid size={18} />
            <span>Dashboard</span>
          </div>
        </Link>

        {/* MASTER MENU */}
        <div className="mt-2">
          <button
            onClick={() => setIsMasterOpen(!isMasterOpen)}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium ${isMasterActive ? "text-white" : "text-slate-400 hover:text-white"}`}
          >
            <div className="flex items-center gap-3">
              <Database size={18} />
              <span>Master</span>
            </div>
            <ChevronDown size={14} className={`transition-transform ${isMasterOpen ? "rotate-180" : ""}`} />
          </button>

          {isMasterOpen && (
            <div className="ml-4 mt-1 border-l border-white/10 pl-2 space-y-1">
              <Link href="/master/divisi">
                <div className={`p-2 text-xs flex items-center gap-3 rounded ${isActive("/master/divisi") ? "text-[#00A99D] font-bold bg-white/5" : "text-slate-500 hover:text-white"}`}>
                  <Hotel size={14} /> Divisi
                </div>
              </Link>
              <Link href="/master/jabatan">
                <div className={`p-2 text-xs flex items-center gap-3 rounded ${isActive("/master/jabatan") ? "text-[#00A99D] font-bold bg-white/5" : "text-slate-500 hover:text-white"}`}>
                  <Briefcase size={14} /> Jabatan
                </div>
              </Link>
              <Link href="/master/karyawan">
                <div className={`p-2 text-xs flex items-center gap-3 rounded ${isActive("/master/karyawan") ? "text-[#00A99D] font-bold bg-white/5" : "text-slate-500 hover:text-white"}`}>
                  <Users size={14} /> Karyawan
                </div>
              </Link>
              
              {/* MENU USER */}
              <Link href="/master/user">
                <div className={`p-2 text-xs flex items-center gap-3 rounded ${isActive("/master/user") ? "text-[#00A99D] font-bold bg-white/5" : "text-slate-500 hover:text-white"}`}>
                  <UserCog size={14} /> User
                </div>
              </Link>

              {/* MENU KONFIGURASI */}
              <Link href="/master/konfigurasi">
                <div className={`p-2 text-xs flex items-center gap-3 rounded ${isActive("/master/konfigurasi") ? "text-[#00A99D] font-bold bg-white/5" : "text-slate-500 hover:text-white"}`}>
                  <Settings size={14} /> Konfigurasi
                </div>
              </Link>
            </div>
          )}
        </div>

        <Link href="/presensi"><div className={menuItemClass("/presensi")}><ClipboardCheck size={18} /><span>Presensi</span></div></Link>
        <Link href="/cuti"><div className={menuItemClass("/cuti")}><CalendarRange size={18} /><span>Cuti</span></div></Link>
        <Link href="/gaji"><div className={menuItemClass("/gaji")}><Banknote size={18} /><span>Gaji</span></div></Link>
      </nav>

      <div className="p-4 border-t border-white/5">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 p-2 text-slate-400 hover:text-red-400 text-sm font-medium">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}