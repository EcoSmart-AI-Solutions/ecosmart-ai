"use client";

import { useEffect, useState } from "react";

import DashboardHeader from "@/components/dashboard/Header";
import WelcomeSection from "@/components/dashboard/Welcome";
import ScanCard from "@/components/dashboard/Scan";
import QuickActions from "@/components/dashboard/QuickActions";
import EarningsCard from "@/components/dashboard/EarningCards";
import EcoTipCard from "@/components/dashboard/EcoTips";
import RecentActivity from "@/components/dashboard/RecentActivity";
import BottomNav from "@/components/dashboard/BottomNav";
import NavigationSidebar from "@/components/dashboard/NavigationSidebar";

import { navItems, quickActions } from "@/lib/dashboard-data";
import {
  createActivity,
  getDashboardData,
  markActivityAsRecycled,
} from "@/services/dashboard";
import type { ActivityItem } from "@/types/dashboard";

type RawDashboardResponse = {
  user: {
    name: string;
  };
  stats: {
    totalEarnings: number;
    itemsScanned: number;
  };
  recentActivity: {
    id: string;
    item: string;
    amount: number;
    status: string;
  }[];
};

type DashboardData = {
  user: {
    name: string;
  };
  stats: {
    totalEarnings: number;
    itemsScanned: number;
  };
  recentActivity: ActivityItem[];
};

export default function EcoSmartDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "home" | "scan" | "activity" | "profile"
  >("home");
  const [isNavSidebarOpen, setIsNavSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const token = "";

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response: RawDashboardResponse = await getDashboardData(token);

      const currentUser =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("mockCurrentUser") || "null")
          : null;

      const formattedData: DashboardData = {
        user: {
          name: currentUser?.fullName || response.user.name,
        },
        stats: response.stats,
        recentActivity: response.recentActivity.map((activity) => ({
          _id: activity.id,
          title: activity.item,
          time: "Just now",
          amount: activity.amount,
          status: activity.status === "Recycled" ? "Recycled" : "Pending",
        })),
      };

      setDashboardData(formattedData);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleQuickAction = async (actionId: string) => {
    try {
      if (actionId === "scan") {
        await createActivity(token, {
          title: "Plastic Bottle",
          type: "scan",
          status: "Recycled",
          amount: 65,
        });
        setActiveTab("scan");
      } else if (actionId === "upload") {
        await createActivity(token, {
          title: "Cardboard Pack",
          type: "upload",
          status: "Pending",
          amount: 50,
        });
      } else if (actionId === "type") {
        await createActivity(token, {
          title: "Glass Bottle",
          type: "manual",
          status: "Recycled",
          amount: 60,
        });
      } else {
        setActiveTab("activity");
      }

      await fetchDashboard();
    } catch (error) {
      console.error("Quick action error:", error);
    }
  };

  const handleMarkPendingAsRecycled = async (id: string) => {
    try {
      await markActivityAsRecycled(token, id);
      await fetchDashboard();
    } catch (error) {
      console.error("Mark recycled error:", error);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-lg">Loading dashboard...</div>;
  }

  if (!dashboardData) {
    return (
      <div className="p-10 text-center text-lg">Failed to load dashboard</div>
    );
  }

  return (
    <main className="min-h-screen bg-[#edf3ea]">
      <div className="mx-auto w-full">
        <div className="grid">
          <section className="w-full border-black/5 bg-[#f6f7f4] shadow-[0_20px_80px_rgba(0,0,0,0.16)]">
            <div className="relative flex min-h-205 flex-col overflow-hidden rounded-[28px] sm:min-h-225">
              <DashboardHeader openSidebar={() => setIsNavSidebarOpen(true)} />

              <div className="flex-1 space-y-4 px-4 pb-4 sm:space-y-5 sm:px-6 sm:pb-5 lg:px-8 lg:pb-8">
                <WelcomeSection name={dashboardData.user.name} />

                <ScanCard handleQuickAction={handleQuickAction} />

                <QuickActions
                  quickActions={quickActions}
                  handleQuickAction={handleQuickAction}
                />

                <EarningsCard
                  totalEarnings={dashboardData.stats.totalEarnings}
                  ecoPoints={dashboardData.stats.itemsScanned}
                />

                <EcoTipCard />

                <RecentActivity
                  activities={dashboardData.recentActivity}
                  setActiveTab={setActiveTab}
                  markPendingAsRecycled={handleMarkPendingAsRecycled}
                />
              </div>

              {!isNavSidebarOpen && (
                <BottomNav
                  navItems={navItems}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  openProfileSidebar={() => {}}
                />
              )}

              <NavigationSidebar
                isOpen={isNavSidebarOpen}
                onClose={() => setIsNavSidebarOpen(false)}
                onNavigate={setActiveTab}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}