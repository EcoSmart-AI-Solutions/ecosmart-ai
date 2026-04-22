"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Check,
  Menu,
  ArrowUpRight,
  Recycle,
  MapPin,
  Lightbulb,
  Home,
  ScanLine,
  BarChart3,
  UserCircle2,
} from "lucide-react";

type resultprops = {
  openSidebar: () => void;
};

export default function Result({ openSidebar }: resultprops) {
  const [scannedImage, setScannedImage] = useState<string>("");

  useEffect(() => {
    const savedImage = localStorage.getItem("scannedImage");
    if (savedImage) {
      setScannedImage(savedImage);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#edf3ea] ">
      <div className="mx-auto">
        <div className="flex justify-center">
          <section className="w-full border-black/5 bg-[#f6f7f4] shadow-[0_20px_80px_rgba(0,0,0,0.16)] ">
            <div className="flex min-h-230 flex-col overflow-hidden rounded-[28px]">
              <header className="flex items-center justify-between bg-[#f3f4f6] px-5 pb-4 pt-5 sm:px-8 sm:pb-5 sm:pt-7 lg:px-10 lg:pt-8">
                <div className="flex items-center gap-2">
                  <img
                    src="/images/logo.png"
                      alt="EcoSmart AI Logo"
                      className="h-10 w-auto object-contain"
                  />
                </div>

                <button
                  onClick={openSidebar}
                  className="rounded-xl p-2 text-slate-700 transition hover:bg-white"
                  aria-label="Open navigation"
                  >
                  <Menu className="h-6 w-6" />
                </button>
              </header>

              <div className="flex-1 space-y-6 px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
                <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                  <div className="relative overflow-hidden rounded-[30px] bg-black">
                    {scannedImage ? (
                      <img
                        src={scannedImage}
                        alt="Scanned waste item"
                        className="h-80 w-full object-cover sm:h-105 lg:h-130"
                      />
                    ) : (
                      <div className="flex h-80 w-full items-center justify-center bg-slate-200 text-slate-500 sm:h-105 lg:h-130">
                        No scanned image found
                      </div>
                    )}

                    <div className="absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#5d9d35] text-white shadow-[0_12px_30px_rgba(93,157,53,0.35)]">
                      <Check className="h-8 w-8" />
                    </div>

                    <div className="absolute bottom-4 right-4 rounded-full bg-[#edf7ee] px-4 py-2 text-sm font-semibold text-[#2b7a3d] shadow-md">
                      <span className="inline-flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#2b7a3d]" />
                        Recyclable
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <section>
                      <h1 className="text-[2rem] font-bold leading-tight text-slate-900 sm:text-[2.3rem] lg:text-[2.7rem]">
                        Aluminium
                      </h1>
                      <p className="mt-2 text-base leading-7 text-slate-500 sm:text-lg sm:leading-8 lg:text-xl">
                        This item is commonly found in households and is widely
                        recyclable and has value
                      </p>
                    </section>

                    <section className="rounded-[28px] bg-[#d8ecd8] px-6 py-6 shadow-[0_18px_45px_rgba(90,140,90,0.12)]">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-lg font-medium text-[#246c3b] sm:text-xl">
                            Estimated Value Per Item
                          </p>
                          <h2 className="mt-2 text-[2rem] font-bold tracking-tight text-[#1e6a35] sm:text-[2.2rem] lg:text-[2.5rem]">
                            ₦50 – ₦150
                          </h2>
                          <p className="mt-2 text-base text-[#2e7a46] sm:text-lg">
                            Depends on size &amp; condition
                          </p>
                        </div>

                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#5d9d35] text-white">
                          <ArrowUpRight className="h-8 w-8" />
                        </div>
                      </div>
                    </section>
                  </div>
                </section>

                <section className="rounded-[28px] bg-white px-6 py-6 shadow-sm ring-1 ring-black/5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#eef1f3] text-[#63a13f]">
                      <Recycle className="h-7 w-7" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-[1.5rem] font-semibold text-slate-900 sm:text-[1.8rem]">
                        What to Do
                      </h3>
                      <p className="mt-2 text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
                        Aluminium is commonly found in households
                        <br />
                        (e.g. cans, foil) and is widely recyclable. It
                        retains value and can be reused multiple times
                        without losing quality.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-200 pt-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-base text-slate-400">Category</p>
                        <p className="mt-1 text-lg font-semibold text-slate-900 sm:text-xl">
                          Metal Waste (Non-Ferrous Metal)
                        </p>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-base text-slate-400">Confidence</p>
                        <p className="mt-1 text-lg font-semibold text-slate-900 sm:text-xl">
                          95%
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="rounded-[28px] bg-white px-6 py-6 shadow-sm ring-1 ring-black/5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f4e5ad] text-[#f2a400]">
                      <MapPin className="h-7 w-7" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-[1.5rem] font-semibold text-slate-900 sm:text-[1.8rem]">
                        Nearby Recycler
                      </h3>
                      <p className="mt-1 text-lg text-slate-500 sm:text-xl">
                        EcoCycle Center - 0.8 km away
                      </p>
                      <Link
                        href="#"
                        className="mt-2 inline-block text-lg font-semibold text-[#5c9d35] sm:text-xl"
                      >
                        Get Directions →
                      </Link>
                    </div>
                  </div>
                </section>

                <div className="grid gap-5 lg:grid-cols-2">
                  <Link
                    href="/dashboard/recyclers"
                    className="flex w-full items-center justify-center rounded-[22px] bg-[#5d9d35] px-6 py-5 text-center text-lg font-semibold text-white shadow-[0_16px_35px_rgba(93,157,53,0.25)] transition hover:brightness-105 sm:text-[1.4rem]"
                  >
                    Find Recycler
                  </Link>

                  <Link
                    href="/dashboard/scan"
                    className="flex w-full items-center justify-center gap-3 rounded-[22px] border-2 border-[#2f7d32] bg-transparent px-6 py-5 text-center text-lg font-semibold text-[#5d9d35] transition hover:bg-[#f3faf0] sm:text-[1.35rem]"
                  >
                    <Recycle className="h-6 w-6" />
                    Scan Another Item
                  </Link>
                </div>

                <section className="rounded-[28px] border border-[#cfe7e7] bg-[#dff0e2] px-6 py-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#1da1f2] shadow-sm">
                      <Lightbulb className="h-7 w-7" />
                    </div>

                    <div>
                      <h3 className="text-[1.5rem] font-semibold text-slate-900 sm:text-[1.8rem]">
                        Eco Tip
                      </h3>
                      <p className="mt-2 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                        Recycling aluminium saves energy and reduces
                        environmental pollution significantly compared
                        to producing new aluminium.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <nav className="grid grid-cols-4 border-t border-black/5 bg-[#f3f4f6] px-3 py-3 sm:px-4 sm:py-4">
                <Link
                  href="/dashboard"
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl py-2 text-sm"
                >
                  <Home className="h-6 w-6 text-slate-400" />
                  <span className="font-medium text-slate-400">Home</span>
                </Link>

                <Link
                  href="/dashboard/scan"
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl py-2 text-sm"
                >
                  <ScanLine className="h-6 w-6 text-[#5c9d35]" />
                  <span className="font-medium text-[#5c9d35]">Scan</span>
                </Link>

                <Link
                  href="/dashboard/activity"
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl py-2 text-sm"
                >
                  <BarChart3 className="h-6 w-6 text-slate-400" />
                  <span className="font-medium text-slate-400">Activity</span>
                </Link>

                <Link
                  href="/dashboard/profile"
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl py-2 text-sm"
                >
                  <UserCircle2 className="h-6 w-6 text-slate-400" />
                  <span className="font-medium text-slate-400">Profile</span>
                </Link>
              </nav>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}