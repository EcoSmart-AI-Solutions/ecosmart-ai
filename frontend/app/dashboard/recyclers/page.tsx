"use client";

import Link from "next/link";
import {
  Leaf,
  ArrowLeft,
  MapPin,
  ChevronDown,
  Home,
  ScanLine,
  BarChart3,
  UserCircle2,
  Recycle,
} from "lucide-react";

const recyclerList = [
  {
    id: 1,
    name: "GreenCycle Center",
    distance: "0.8km away",
    types: "Metal, Plastic, paper",
    price: "₦50 – ₦150/kg",
    image: "/images/recycler-1.png",
  },
  {
    id: 2,
    name: "GreenCycle Center",
    distance: "0.8km away",
    types: "All item",
    price: "₦50 – ₦150/kg",
    image: "/images/recycler-2.png",
  },
  {
    id: 3,
    name: "GreenCycle Center",
    distance: "0.8km away",
    types: "Metal, Plastic, paper",
    price: "₦50 – ₦150/kg",
    image: "/images/recycler-3.png",
  },
  {
    id: 4,
    name: "GreenCycle Center",
    distance: "0.8km away",
    types: "Metal, Plastic, paper",
    price: "₦50 – ₦150/kg",
    image: "/images/recycler-4.png",
  },
];

export default function RecyclersPage() {
  return (
    <main className="min-h-screen bg-[#edf3ea]">
      <div className="mx-auto">
        <div className="flex justify-center">
          <section className="mx-auto w-full border-black/5 bg-[#f6f7f4] shadow-[0_20px_80px_rgba(0,0,0,0.16)]">
            <div className="flex min-h-230 flex-col overflow-hidden rounded-[28px]">
              <header className="flex items-center justify-between bg-[#f3f4f6] px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
                <div className="flex items-center gap-2 font-semibold text-[#2f7d32]">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#7bbf71] bg-white">
                    <Leaf className="h-4 w-4" />
                  </span>
                  <span className="text-lg">EcoSmart AI</span>
                </div>
              </header>

              <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
                <Link
                  href="/dashboard/scan/result"
                  className="inline-flex items-center gap-2 text-base text-slate-600"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Back
                </Link>

                <div className="mt-6 flex gap-5 overflow-x-auto pb-2 text-lg text-slate-600">
                  <button className="rounded-full bg-[#6aa436] px-7 py-3 font-semibold text-white shadow-md">
                    Plastic
                  </button>
                  <button className="shrink-0 py-3">Metal</button>
                  <button className="shrink-0 py-3">Aluminium</button>
                  <button className="shrink-0 py-3">Cables</button>
                  <button className="shrink-0 py-3">Distance</button>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <button className="inline-flex items-center gap-2 rounded-full bg-[#dfeedd] px-4 py-3 text-base font-semibold text-[#2f7d32]">
                    <MapPin className="h-5 w-5 text-[#f5aa00]" />
                    Location
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  <p className="text-xl text-slate-800">Abuja, Nigeria</p>
                </div>

                <section className="mt-6 overflow-hidden rounded-[22px] bg-[#eceae4]">
                  <iframe
                    title="Recycler map"
                    src="https://www.google.com/maps?q=Abuja,Nigeria&z=5&output=embed"
                    className="h-107.5 w-full border-0"
                    loading="lazy"
                  />
                </section>

                <div className="mt-6 space-y-5">
                  {recyclerList.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-3xl bg-white px-5 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 gap-4">
                          <div className="h-14 w-14 overflow-hidden rounded-2xl bg-[#eef5ea]">
                            <div className="flex h-full w-full items-center justify-center text-[#5c9d35]">
                              <Recycle className="h-7 w-7" />
                            </div>
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate text-xl font-semibold text-slate-900">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-base text-slate-400">
                              {item.distance}
                            </p>
                            <p className="mt-3 text-base text-slate-400">
                              ♻ {item.types}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="inline-flex rounded-full bg-[#e6f2e6] px-4 py-1 text-sm font-medium text-[#4e9155]">
                            Verified
                          </span>
                          <p className="mt-5 text-[1.8rem] font-bold text-[#24713d]">
                            {item.price}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-4">
                        <button
                          type="button"
                          className="rounded-full bg-[#6aa436] px-6 py-3 text-lg font-semibold text-white shadow-md"
                        >
                          Contact Recycler
                        </button>

                        <button
                          type="button"
                          className="rounded-full border border-[#2f7d32] px-8 py-3 text-lg font-semibold text-[#2f7d32]"
                        >
                          View Details
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-6 text-2xl font-semibold text-[#2f7d32]"
                >
                  View more
                </button>

                <section className="mt-8 rounded-[28px] border border-[#cfe7e7] bg-[#dff0e2] px-6 py-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2f7d32] shadow-sm">
                      <Leaf className="h-7 w-7" />
                    </div>

                    <div>
                      <h3 className="text-[1.8rem] font-semibold text-slate-900">
                        Eco Tip
                      </h3>
                      <p className="mt-2 text-lg leading-8 text-slate-600">
                        You can earn more by sorting your waste before taking it
                        to a recycler.
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
                  <ScanLine className="h-6 w-6 text-slate-400" />
                  <span className="font-medium text-slate-400">Scan</span>
                </Link>

                <Link
                  href="/dashboard"
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl py-2 text-sm"
                >
                  <BarChart3 className="h-6 w-6 text-slate-400" />
                  <span className="font-medium text-slate-400">Activity</span>
                </Link>

                <Link
                  href="/dashboard"
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