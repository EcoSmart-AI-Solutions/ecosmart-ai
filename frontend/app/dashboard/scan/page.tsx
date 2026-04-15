"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function ScanPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraReady, setCameraReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setError("");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setCameraReady(true);
        };
      }
    } catch (err) {
      console.error(err);
      setError("Could not access camera. Please allow camera permission.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const captureAndGoToResult = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    context.drawImage(video, 0, 0, width, height);

    const imageData = canvas.toDataURL("image/png");

    localStorage.setItem("scannedImage", imageData);

    stopCamera();
    router.push("/dashboard/scan/analyze");
  };

  return (
    <main className="min-h-screen bg-[#edf3ea] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.12)]">
          <div className="border-b border-black/5 px-5 py-4 sm:px-6">
            <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              Scan Waste Item
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Use your camera to scan, then view the result immediately.
            </p>
          </div>

          <div className="p-4 sm:p-6">
            {error ? (
              <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            ) : (
              <div className="overflow-hidden rounded-3xl bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="h-105 w-full object-cover sm:h-130"
                />
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={captureAndGoToResult}
                disabled={!cameraReady}
                className="w-full rounded-full bg-[#2f6b3b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#25572f] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                Capture and View Result
              </button>

              <button
                onClick={startCamera}
                className="w-full rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
              >
                Restart Camera
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}