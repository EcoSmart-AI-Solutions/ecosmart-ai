"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Lock, ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type MockResetData = {
  email: string;
  token: string;
  expiresAt: number;
};

type MockUser = {
  fullName?: string;
  email: string;
  password: string;
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = searchParams.get("token");

  const validation = useMemo(() => {
    if (typeof window === "undefined") {
      return { valid: false, reason: "Loading...", email: "" };
    }

    const stored = localStorage.getItem("mockResetData");
    if (!stored) {
      return { valid: false, reason: "No reset request found.", email: "" };
    }

    try {
      const parsed: MockResetData = JSON.parse(stored);

      if (!token) {
        return { valid: false, reason: "Missing reset token.", email: "" };
      }

      if (parsed.token !== token) {
        return { valid: false, reason: "Invalid reset token.", email: "" };
      }

      if (Date.now() > parsed.expiresAt) {
        return { valid: false, reason: "Reset link has expired.", email: "" };
      }

      return { valid: true, reason: "", email: parsed.email };
    } catch {
      return { valid: false, reason: "Invalid reset data.", email: "" };
    }
  }, [token]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validation.valid) {
      setErrorMessage(validation.reason);
      return;
    }

    if (!password || !confirmPassword) {
      setErrorMessage("Please fill in both password fields.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setErrorMessage("Password must include an uppercase letter.");
      return;
    }

    if (!/[0-9]/.test(password)) {
      setErrorMessage("Password must include a number.");
      return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      setErrorMessage("Password must include a special character.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const users = JSON.parse(localStorage.getItem("mockUsers") || "[]") as MockUser[];

      const updatedUsers = users.map((user) =>
        user.email === validation.email
          ? { ...user, password }
          : user
      );

      localStorage.setItem("mockUsers", JSON.stringify(updatedUsers));
      localStorage.removeItem("mockResetData");

      setSuccessMessage("Password reset successful! Redirecting...");

      setTimeout(() => {
        router.push("/auth/sign-in");
      }, 1500);
    } catch (error) {
      setErrorMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-3 sm:px-5 sm:py-4">
      <header className="flex items-center justify-between border-b border-border px-3 py-2">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="EcoSmart AI logo"
            width={130}
            height={38}
            className="h-8 w-auto"
          />
        </Link>
      </header>

      <section>
        <div className="px-4 py-8 sm:px-10 sm:py-12">
          <Link
            href="/auth/sign-in"
            className="inline-flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="size-5" />
            Back to Sign In
          </Link>

          <h1 className="mt-6 text-center text-2xl sm:text-4xl font-bold">
            Set New Password
          </h1>

          <Card className="mx-auto mt-10 w-full max-w-155 rounded-[28px] shadow-card">
            <CardContent className="space-y-5 p-5 sm:p-9">
              {!validation.valid ? (
                <p className="text-red-600">{validation.reason}</p>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* PASSWORD */}
                    <div>
                      <Label>New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2" />

                        <Input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-12 pr-12"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div>
                      <Label>Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2" />

                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) =>
                            setConfirmPassword(e.target.value)
                          }
                          className="pl-12 pr-12"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                          {showConfirmPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                    </div>

                    {errorMessage && (
                      <p className="text-red-600">{errorMessage}</p>
                    )}

                    {successMessage && (
                      <p className="text-green-600">{successMessage}</p>
                    )}

                    <Button type="submit" disabled={loading}>
                      {loading ? "Resetting..." : "Reset Password"}
                    </Button>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}