"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar"; // Sesuaikan jika nama filenya Sidebar.tsx
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Tentukan halaman mana saja yang TIDAK boleh ada Sidebar
  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up" || pathname === "/";

  return (
    <html lang="id">
      <body className={`${inter.className} bg-[#020617]`}>
        <div className="flex min-h-screen">
          
          {/* HANYA tampilkan Sidebar jika BUKAN halaman Auth */}
          {!isAuthPage && <Sidebar />}

          {/* Jika halaman Auth, hilangkan margin kiri (ml-64) agar konten ke tengah */}
          <div className={`flex-1 transition-all duration-300 ${!isAuthPage ? "ml-64" : ""}`}>
            {children}
          </div>

        </div>
      </body>
    </html>
  );
}