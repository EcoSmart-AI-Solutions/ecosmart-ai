"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Leaf,
  TrendingUp,
  Package,
  Recycle,
  CalendarDays,
  Filter,
  Clock3,
} from "lucide-react";

import BottomNav from "@/components/dashboard/BottomNav";
import { navItems } from "@/lib/dashboard-data";

type ActivityStatus = "Recycled" | "Pending";

type ActivityRecord = {
  id: string;
  title: string;
  dateLabel: string;
  relativeTime: string;
  amount: number;
  weightKg: number;
  status: ActivityStatus;
};

const mockActivities: ActivityRecord[] = [
  {
    id: "1",
    title: "Plastic Bottles",
    dateLabel: "Today",
    relativeTime: "2 hours ago",
    amount: 450,
    weightKg: 2.5,
    status: "Recycled",
  },
  {
    id: "2",
    title: "Aluminum Cans",
    dateLabel: "Yesterday",
    relativeTime: "Yesterday",
    amount: 320,
    weightKg: 1.8,
    status: "Recycled",
  },
  {
    id: "3",
    title: "Paper Waste",
    dateLabel: "Apr 5, 2026",
    relativeTime: "2 days ago",
    amount: 180,
    weightKg: 3.2,
    status: "Pending",
  },
  {
    id: "4",
    title: "Glass Bottles",
    dateLabel: "Apr 4, 2026",
    relativeTime: "3 days ago",
    amount: 520,
    weightKg: 4.1,
    status: "Recycled",
  },
  {
    id: "5",
    title: "Cardboard",
    dateLabel: "Apr 3, 2026",
    relativeTime: "4 days ago",
    amount: 280,
    weightKg: 5.0,
    status: "Recycled",
  },
  {
    id: "6",
    title: "Metal Scraps",
    dateLabel: "Apr 2, 2026",
    relativeTime: "5 days ago",
    amount: 650,
    weightKg: 6.3,
    status: "Pending",
  },
  {
    id: "7",
    title: "Plastic Containers",
    dateLabel: "Apr 1, 2026",
    relativeTime: "6 days ago",
    amount: 410,
    weightKg: 3.7,
    status: "Recycled",
  },
];

type FilterType = "All" | "Recycled" | "Pending";

export default function ActivityPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [activeTab, setActiveTab] = useState<
    "home" | "scan" | "activity" | "profile"
  >("activity");

  const filteredActivities = useMemo(() => {
    if (activeFilter === "All") return mockActivities;
    return mockActivities.filter((item) => item.status === activeFilter);
  }, [activeFilter]);

  const totalEarned = mockActivities.reduce((sum, item) => sum + item.amount, 0);
  const totalKg = mockActivities.reduce((sum, item) => sum + item.weightKg, 0);
  const recycledCount = mockActivities.filter(
    (item) => item.status === "Recycled"
  ).length;
  const thisWeekCount = mockActivities.length;

  return (
    <main className="min-h-screen bg-[#edf3ea]">
      <div className="mx-auto">
        <div className="flex justify-center">
          <section className="w-full border-black/5 bg-[#f6f7f4] shadow-[0_20px_80px_rgba(0,0,0,0.16)]">
            <div className="flex min-h-215 flex-col rounded-[28px]">
              <header className="flex items-center justify-between bg-[#f3f4f6] px-5 pb-4 pt-5 sm:px-8 sm:pb-5 sm:pt-7 lg:px-10 lg:pt-8">
                <div className="flex items-center gap-2 font-semibold text-[#2f7d32]">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#7bbf71] bg-white">
                    <Leaf className="h-4 w-4" />
                  </span>
                  <span className="text-lg sm:text-xl">EcoSmart AI</span>
                </div>
              </header>

              <div className="flex-1 px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
                <div>
                  <h1 className="text-[2rem] font-bold text-[#246c3b] sm:text-[2.3rem] lg:text-[2.7rem]">
                    Activity
                  </h1>
                  <p className="mt-2 text-base text-slate-500 sm:text-lg">
                    Track your recycling journey
                  </p>
                </div>

                <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                  <StatCard
                    icon={<TrendingUp className="h-5 w-5" />}
                    iconWrapClass="bg-[#ddebd6] text-[#5b9938]"
                    value={`₦${totalEarned}`}
                    label="Total Earned"
                  />
                  <StatCard
                    icon={<Package className="h-5 w-5" />}
                    iconWrapClass="bg-[#f8ebc7] text-[#d9a11b]"
                    value={`${Math.round(totalKg * 100)}`}
                    label="Total kg"
                  />
                  <StatCard
                    icon={<Recycle className="h-5 w-5" />}
                    iconWrapClass="bg-[#dff4e6] text-[#22b455]"
                    value={`${recycledCount}`}
                    label="Items Recycled"
                  />
                  <StatCard
                    icon={<CalendarDays className="h-5 w-5" />}
                    iconWrapClass="bg-[#dfe9d9] text-[#2f7d32]"
                    value={`${thisWeekCount}`}
                    label="This Week"
                  />
                </section>

                <section className="mt-8">
                  <div className="flex gap-3 overflow-x-auto">
                    {(["All", "Recycled", "Pending"] as FilterType[]).map(
                      (filter) => (
                        <button
                          key={filter}
                          type="button"
                          onClick={() => setActiveFilter(filter)}
                          className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-medium transition sm:text-base ${
                            activeFilter === filter
                              ? "bg-[#5d9d35] text-white shadow-[0_10px_20px_rgba(93,157,53,0.22)]"
                              : "bg-white text-slate-600 hover:bg-[#eef7ea]"
                          }`}
                        >
                          {filter}
                        </button>
                      )
                    )}
                  </div>
                </section>

                <section className="mt-8">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <h2 className="text-[1.35rem] font-semibold text-[#246c3b] sm:text-[1.55rem]">
                      History ({filteredActivities.length})
                    </h2>

                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-slate-600"
                    >
                      <Filter className="h-5 w-5" />
                      <span className="text-sm font-medium sm:text-base">
                        Filter
                      </span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {filteredActivities.map((item) => {
                      const isRecycled = item.status === "Recycled";

                      return (
                        <article
                          key={item.id}
                          className="rounded-3xl bg-white px-5 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex min-w-0 items-start gap-4">
                              <div
                                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                                  isRecycled
                                    ? "bg-[#e5f4e8] text-[#22b455]"
                                    : "bg-[#eef0f3] text-slate-500"
                                }`}
                              >
                                {isRecycled ? (
                                  <Leaf className="h-7 w-7" />
                                ) : (
                                  <Clock3 className="h-7 w-7" />
                                )}
                              </div>

                              <div className="min-w-0">
                                <h3 className="truncate text-xl font-semibold text-slate-900">
                                  {item.title}
                                </h3>
                                <p className="mt-1 text-base text-slate-500">
                                  {item.dateLabel}
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="text-[1.8rem] font-bold text-[#24713d]">
                                ₦{item.amount}
                              </p>
                              <span
                                className={`mt-2 inline-flex rounded-full px-4 py-1 text-sm font-medium ${
                                  isRecycled
                                    ? "bg-[#e5f4e8] text-[#22b455]"
                                    : "bg-[#f1f2f5] text-slate-500"
                                }`}
                              >
                                {item.status}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 border-t border-slate-200 pt-4">
                            <div className="flex items-center justify-between text-sm text-slate-500 sm:text-base">
                              <span>{item.relativeTime}</span>
                              <span>{item.weightKg.toFixed(1)} kg</span>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              </div>

              <BottomNav
                navItems={navItems}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                openProfileSidebar={() => {}}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  icon,
  value,
  label,
  iconWrapClass,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  iconWrapClass: string;
}) {
  return (
    <div className="rounded-3xl bg-white px-5 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${iconWrapClass}`}
      >
        {icon}
      </div>
      <div className="text-[1.9rem] font-bold text-[#246c3b]">{value}</div>
      <div className="mt-1 text-base text-slate-500">{label}</div>
    </div>
  );
}