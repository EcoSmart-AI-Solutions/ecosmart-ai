"use client";

import Image from "next/image";
import { Menu } from "lucide-react";

type HeaderProps = {
  openSidebar: () => void;
};

export default function Header({ openSidebar }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 pb-4 pt-5 sm:px-6 sm:pt-6">
      
      {/* LOGO */}
      <div className="flex items-center gap-2 font-semibold text-[#2f7d32]">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#7bbf71] bg-white overflow-hidden">
          <Image
            src="/images/logo.png"
            alt="EcoSmart AI Logo"
            width={32}
            height={32}
            className="object-contain"
          />
        </span>
      </div>

      {/* MENU BUTTON → NOW OPENS SIDEBAR */}
      <button
        onClick={openSidebar}
        className="rounded-xl p-2 text-slate-700 transition hover:bg-white"
        aria-label="Open navigation"
      >
        <Menu className="h-6 w-6" />
      </button>
    </header>
  );
}