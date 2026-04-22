"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Leaf,
  ArrowLeft,
  MapPin,
  Home,
  ScanLine,
  BarChart3,
  UserCircle2,
  Recycle,
} from "lucide-react";

type LocationOption = {
  state: string;
  address: string;
  mapQuery: string;
};

type RecyclerItem = {
  id: number;
  name: string;
  distance: string;
  types: string;
  price: string;
  phone: string;
  chatNumber: string;
  rating: string;
  verified: boolean;
};

const nigeriaLocations: LocationOption[] = [
  {
    state: "Abuja",
    address: "Plot 156 Industrial Raw Bld, Wuse Zone 3, Abuja",
    mapQuery: "Abuja,Nigeria",
  },
  {
    state: "Lagos",
    address: "12 Acme Road, Ikeja, Lagos",
    mapQuery: "Ikeja,Lagos,Nigeria",
  },
  {
    state: "Enugu",
    address: "7 Ogui Road, Enugu, Nigeria",
    mapQuery: "Enugu,Nigeria",
  },
  {
    state: "Rivers",
    address: "22 Aba Road, Port Harcourt, Rivers",
    mapQuery: "Port Harcourt,Rivers,Nigeria",
  },
  {
    state: "Kano",
    address: "18 Zaria Road, Kano, Nigeria",
    mapQuery: "Kano,Nigeria",
  },
  {
    state: "Oyo",
    address: "14 Ring Road, Ibadan, Oyo, Nigeria",
    mapQuery: "Ibadan,Oyo,Nigeria",
  },
];

const recyclerList: RecyclerItem[] = [
  {
    id: 1,
    name: "GreenCycle Center",
    distance: "0.8km away",
    types: "Plastic, Metal, Paper",
    price: "₦50 – ₦150/kg",
    phone: "+234 802 123 4567",
    chatNumber: "+234 802 123 4567",
    rating: "4.8",
    verified: true,
  },
  {
    id: 2,
    name: "EcoHub Recycler",
    distance: "1.2km away",
    types: "Plastic, Aluminium, Cables",
    price: "₦60 – ₦170/kg",
    phone: "+234 803 456 7890",
    chatNumber: "+234 803 456 7890",
    rating: "4.7",
    verified: true,
  },
  {
    id: 3,
    name: "Clean Earth Point",
    distance: "1.6km away",
    types: "Metal, Paper, Plastic",
    price: "₦55 – ₦160/kg",
    phone: "+234 805 111 2233",
    chatNumber: "+234 805 111 2233",
    rating: "4.6",
    verified: true,
  },
];

export default function RecyclersPage() {
  const router = useRouter();
  const [selectedState, setSelectedState] = useState("Abuja");

  const currentLocation = useMemo(() => {
    return (
      nigeriaLocations.find((item) => item.state === selectedState) ??
      nigeriaLocations[0]
    );
  }, [selectedState]);

  const handleContactRecycler = (recycler: RecyclerItem) => {
    sessionStorage.setItem(
      "selectedRecyclerContact",
      JSON.stringify({
        recycler,
        location: currentLocation,
      })
    );

    router.push("/dashboard/recyclers/contact");
  };

  const handleViewDetails = (recycler: RecyclerItem) => {
    sessionStorage.setItem(
      "selectedRecyclerDetails",
      JSON.stringify({
        recycler,
        location: currentLocation,
      })
    );

    router.push("/dashboard/recyclers/details");
  };

  return (
    <main className="min-h-screen bg-[#edf3ea]">
      <div className="mx-auto flex justify-center">
        <section className="w-full  min-h-screen bg-[#f6f7f4] shadow-[0_20px_80px_rgba(0,0,0,0.16)]">
          <div className="flex min-h-screen flex-col overflow-hidden rounded-[28px]">
            <header className="flex items-center justify-between bg-[#f3f4f6] px-5 pb-4 pt-5">
              <div className="flex items-center gap-2 font-semibold text-[#2f7d32]">
               <div className="flex items-center gap-2">
                  <img
                    src="/images/logo.png"
                      alt="EcoSmart AI Logo"
                      className="h-10 w-auto object-contain"
                  />
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <Link
                href="/dashboard/scan/result"
                className="inline-flex items-center gap-2 text-base text-slate-600"
              >
                <ArrowLeft className="h-5 w-5" />
                Back
              </Link>

              <div className="mt-6 flex items-center gap-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#dfeedd] px-4 py-3 text-base font-semibold text-[#2f7d32]">
                  <MapPin className="h-5 w-5 text-[#f5aa00]" />
                  Location
                </div>

                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="rounded-full border border-[#d7e6d4] bg-white px-4 py-3 text-base font-medium text-slate-700 outline-none"
                >
                  {nigeriaLocations.map((location) => (
                    <option key={location.state} value={location.state}>
                      {location.state}, Nigeria
                    </option>
                  ))}
                </select>
              </div>

              <p className="mt-4 text-base text-slate-500">
                {currentLocation.address}
              </p>

              <section className="mt-6 overflow-hidden rounded-[22px] bg-[#eceae4]">
                <iframe
                  title="Recycler map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    currentLocation.mapQuery
                  )}&z=12&output=embed`}
                  className="h-65 w-full border-0"
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
                        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-[#eef5ea] text-[#5c9d35]">
                          <Recycle className="h-7 w-7" />
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
                          {item.verified ? "Verified" : "Unverified"}
                        </span>
                        <p className="mt-3 text-sm text-slate-500">
                          {item.rating} rating
                        </p>
                        <p className="mt-2 text-xl font-bold text-[#24713d]">
                          {item.price}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => handleContactRecycler(item)}
                        className="rounded-full bg-[#6aa436] px-6 py-3 text-base font-semibold text-white shadow-md"
                      >
                        Contact Recycler
                      </button>

                      <button
                        type="button"
                        onClick={() => handleViewDetails(item)}
                        className="rounded-full border border-[#2f7d32] px-8 py-3 text-base font-semibold text-[#2f7d32]"
                      >
                        View Details
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <nav className="grid grid-cols-4 border-t border-black/5 bg-[#f3f4f6] px-3 py-3">
              <Link
                href="/dashboard"
                className="flex flex-col items-center gap-2 py-2 text-sm"
              >
                <Home className="h-6 w-6 text-slate-400" />
                <span className="font-medium text-slate-400">Home</span>
              </Link>

              <Link
                href="/dashboard/scan"
                className="flex flex-col items-center gap-2 py-2 text-sm"
              >
                <ScanLine className="h-6 w-6 text-slate-400" />
                <span className="font-medium text-slate-400">Scan</span>
              </Link>

              <Link
                href="/dashboard/activity"
                className="flex flex-col items-center gap-2 py-2 text-sm"
              >
                <BarChart3 className="h-6 w-6 text-slate-400" />
                <span className="font-medium text-slate-400">Activity</span>
              </Link>

              <Link
                href="/dashboard/profile"
                className="flex flex-col items-center gap-2 py-2 text-sm"
              >
                <UserCircle2 className="h-6 w-6 text-slate-400" />
                <span className="font-medium text-slate-400">Profile</span>
              </Link>
            </nav>
          </div>
        </section>
      </div>
    </main>
  );
}