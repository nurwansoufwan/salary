"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutGrid, 
  Hotel, 
  Briefcase, 
  Users, 
  UserCog,      
  Settings,     
  ClipboardCheck, 
  CalendarRange,  
  Banknote,       
  LogOut, 
  FileText,
  History,
  Wallet
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // 1. Ambil Role dari LocalStorage saat website dimuat
  useEffect(() => {
    setIsClient(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setRole(parsedUser.role); // "admin" atau "user"
      } catch (e) {
        console.error("Gagal parsing user data", e);
      }
    }
  }, []);

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    localStorage.clear();
    router.push("/sign-in");
  };

  // Helper untuk styling menu
  const menuItemClass = (path: string) => `
    w-full flex items-center gap-3 p-3 rounded-lg transition-all mb-1 cursor-pointer text-sm font-medium
    ${isActive(path) 
      ? "bg-[#005a70] text-white shadow-md border-l-4 border-[#00A99D]" 
      : "text-slate-400 hover:text-white hover:bg-white/5"}
  `;

  // --- DEFINISI MENU BERDASARKAN ROLE (Sesuai Soal UTS) ---

  // Menu untuk ADMIN (HRD)
  const adminMenus = [
    {
      title: "DATA MASTER",
      items: [
        { label: "Divisi", href: "/master/divisi", icon: Hotel },
        { label: "Jabatan", href: "/master/jabatan", icon: Briefcase },
        { label: "Karyawan", href: "/master/karyawan", icon: Users },
        { label: "User", href: "/master/user", icon: UserCog },
        { label: "Konfigurasi", href: "/master/konfigurasi", icon: Settings },
      ]
    },
    {
      title: "PRESENSI",
      items: [
        { label: "Report Presensi", href: "/presensi", icon: ClipboardCheck },
      ]
    },
    {
      title: "CUTI",
      items: [
        { label: "Report Cuti", href: "/cuti", icon: CalendarRange },
      ]
    },
    {
      title: "GAJI",
      items: [
        { label: "Proses Gaji", href: "/gaji/proses", icon: Wallet },
        { label: "Report Gaji", href: "/gaji", icon: Banknote },
      ]
    }
  ];

  // Menu untuk USER (KARYAWAN)
  const userMenus = [
    {
      title: "PRESENSI",
      items: [
        { label: "Kehadiran", href: "/presensi/kehadiran", icon: ClipboardCheck },
      ]
    },
    {
      title: "CUTI",
      items: [
        { label: "Form Pengajuan", href: "/cuti/form", icon: FileText },
        { label: "Riwayat & Saldo", href: "/cuti/riwayat", icon: History },
      ]
    },
    {
      title: "GAJI",
      items: [
        { label: "Slip Gaji", href: "/gaji/slip", icon: Banknote },
      ]
    }
  ];

  // Tentukan menu mana yang dipakai
  const menuList = role === "admin" ? adminMenus : userMenus;

  if (!isClient) return null; // Mencegah hydration mismatch

  return (
    <aside className="w-64 bg-[#082f49] flex flex-col fixed h-full z-50 border-r border-white/5 font-sans overflow-hidden">
      
      {/* LOGO */}
      <div className="p-6 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#00A99D] rounded flex items-center justify-center text-white font-bold text-lg shadow-lg">S</div>
          <span className="text-xl font-bold text-white tracking-tight italic">Salary<span className="text-[#00A99D]">App</span></span>
        </div>
        <div className="mt-2 px-1">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 border-b border-white/10 pb-1 block">
                {role === 'admin' ? 'HRD Administrator' : 'Employee Portal'}
            </span>
        </div>
      </div>

      {/* NAVIGASI */}
      <nav className="flex-1 px-4 space-y-6 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        
        {/* DASHBOARD (Selalu Muncul) */}
        <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-3">Main Menu</p>
            <Link href="/dashboard">
            <div className={menuItemClass("/dashboard")}>
                <LayoutGrid size={18} />
                <span>Dashboard</span>
            </div>
            </Link>
        </div>

        {/* MENU DINAMIS (Looping) */}
        {menuList.map((section, index) => (
            <div key={index}>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-3 mt-4">
                    {section.title}
                </p>
                <div className="space-y-1">
                    {section.items.map((item, idx) => (
                        <Link key={idx} href={item.href}>
                            <div className={menuItemClass(item.href)}>
                                <item.icon size={18} />
                                <span>{item.label}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        ))}
        
        {/* Spacer agar logout tidak terlalu mepet kalau menu sedikit */}
        <div className="h-10"></div>
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-white/5 bg-[#082f49]">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 p-2 text-slate-400 hover:text-red-400 text-sm font-medium transition-colors">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}