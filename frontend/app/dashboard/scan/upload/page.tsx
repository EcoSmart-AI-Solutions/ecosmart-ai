"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Leaf,
  Upload,
  Home,
  ScanLine,
  BarChart3,
  UserCircle2,
} from "lucide-react";

export default function UploadImagePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  const handleOpenPicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/heic", "image/heif"];
    const maxSize = 10 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      setError("Please upload a JPG, PNG, or HEIC image.");
      return;
    }

    if (file.size > maxSize) {
      setError("Image must be 10MB or less.");
      return;
    }

    setError("");
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setPreview(result);
        localStorage.setItem("scannedImage", result);
        localStorage.removeItem("manualWasteType");
        localStorage.setItem("scanSource", "upload");
        router.push("/dashboard/scan/analyze");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="min-h-screen bg-[#edf3ea]">
      <div className="mx-auto">
        <div className="flex justify-center">
          <section className="w-full border-black/5 bg-[#f6f7f4] shadow-[0_20px_80px_rgba(0,0,0,0.16)]">
            <div className="flex min-h-190 flex-col rounded-[28px] lg:min-h-205">
              <header className="flex items-center justify-between bg-[#f3f4f6] px-5 pb-4 pt-5 sm:px-8 sm:pb-5 sm:pt-7 lg:px-10 lg:pt-8">
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

              <div className="flex-1 px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 text-base text-slate-600 sm:text-lg"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Back to Home
                </Link>

                <div className="mt-8">
                  <h1 className="text-[2rem] font-bold text-slate-900 sm:text-[2.3rem] lg:text-[2.7rem]">
                    Upload Image
                  </h1>
                  <p className="mt-2 text-base text-slate-500 sm:text-lg lg:text-xl">
                    Select an image of your waste to analyze
                  </p>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                  <div>
                    <button
                      type="button"
                      onClick={handleOpenPicker}
                      className="flex w-full flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-[#d6dde0] bg-white px-6 py-12 text-center transition hover:bg-[#fbfcfb] sm:py-16 lg:min-h-90"
                    >
                      {preview ? (
                        <img
                          src={preview}
                          alt="Upload preview"
                          className="max-h-70 w-full rounded-[20px] object-cover"
                        />
                      ) : (
                        <>
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#eef3f4] text-[#5d9d35]">
                            <Upload className="h-10 w-10" />
                          </div>
                          <h2 className="mt-5 text-[1.4rem] font-semibold text-[#2f7d32] sm:text-[1.6rem]">
                            Tap to Select Image
                          </h2>
                          <p className="mt-2 text-base text-slate-500 sm:text-lg">
                            JPG, PNG or HEIC (max. 10MB)
                          </p>
                        </>
                      )}
                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.heic,.heif,image/jpeg,image/png,image/heic,image/heif"
                      className="hidden"
                      onChange={handleFileChange}
                    />

                    {fileName && !error && (
                      <p className="mt-4 text-sm font-medium text-slate-600 sm:text-base">
                        Selected: {fileName}
                      </p>
                    )}

                    {error && (
                      <div className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600 sm:text-base">
                        {error}
                      </div>
                    )}
                  </div>

                  <aside className="rounded-[28px] border border-[#6da06e] bg-[#e8f1ea] px-5 py-5 sm:px-6 sm:py-6">
                    <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
                      Tips for Best Results
                    </h3>

                    <ul className="mt-4 space-y-3 text-sm text-[#2f6b3b] sm:text-base">
                      <li>• Ensure good lighting for clear images</li>
                      <li>• Center the waste item in the frame</li>
                      <li>• Avoid blurry or dark photos</li>
                    </ul>
                  </aside>
                </div>
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