"use client";

import { Menu, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { data: session } = useSession();

  return (
    <header className="h-16 bg-surface border-b border-surface-container flex items-center justify-between px-4 lg:px-8 z-30 relative">
      <div className="flex items-center">
        {/* Mobile menu toggle */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 mr-4 text-on-surface-variant hover:text-primary transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <h2 className="absolute left-[45%] -translate-x-1/2 font-display font-semibold text-lg text-primary hidden sm:block">
        Manajemen Konten & Portofolio
      </h2>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="font-body font-medium text-primary text-sm">
              {session?.user?.name || "Admin"}
            </span>
            <span className="font-body text-xs text-on-surface-variant">
              {session?.user?.email || "admin@architextrue.com"}
            </span>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-semibold border border-primary/20">
            A
          </div>
        </div>

        <div className="w-px h-8 bg-surface-container mx-2"></div>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2 p-2 text-error hover:bg-error/10 rounded-lg transition-colors group cursor-pointer"
        >
          <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:block font-body text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </header>
  );
}
