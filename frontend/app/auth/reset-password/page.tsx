"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Lock, ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const token = searchParams.get("token");

  const validation = useMemo(() => {
    if (typeof window === "undefined") {
      return { valid: false, reason: "Loading..." };
    }

    const stored = localStorage.getItem("mockResetData");
    if (!stored) {
      return { valid: false, reason: "No reset request found." };
    }

    try {
      const parsed = JSON.parse(stored) as {
        email: string;
        token: string;
        expiresAt: number;
      };

      if (!token) {
        return { valid: false, reason: "Missing reset token." };
      }

      if (parsed.token !== token) {
        return { valid: false, reason: "Invalid reset token." };
      }

      if (Date.now() > parsed.expiresAt) {
        return { valid: false, reason: "Reset link has expired." };
      }

      return { valid: true, email: parsed.email };
    } catch {
      return { valid: false, reason: "Invalid reset data." };
    }
  }, [token]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setMessage("");

    if (!validation.valid) return;

    if (!password || !confirmPassword) {
      setErrorMessage("Please fill in both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setErrorMessage("Password must include at least one uppercase letter.");
      return;
    }

    if (!/[0-9]/.test(password)) {
      setErrorMessage("Password must include at least one number.");
      return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      setErrorMessage("Password must include at least one special character.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("mockUsers") || "[]") as Array<{
      fullName?: string;
      email: string;
      password: string;
    }>;

    const updatedUsers = users.map((user) =>
      user.email === validation.email ? { ...user, password } : user
    );

    localStorage.setItem("mockUsers", JSON.stringify(updatedUsers));
    localStorage.removeItem("mockResetData");

    setMessage("Password reset successful. Redirecting to sign in...");

    setTimeout(() => {
      router.push("/auth/sign-in");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-background px-4 py-3 sm:px-5 sm:py-4">
      <header className="flex items-center justify-between border-b border-border px-3 py-2 sm:px-3 sm:py-2">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="EcoSmart AI logo"
            width={130}
            height={38}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>
      </header>

      <section>
        <div className="px-4 py-8 sm:px-10 sm:py-12">
          <Link
            href="/auth/sign-in"
            className="inline-flex items-center gap-2 text-sm text-foreground sm:text-base"
          >
            <ArrowLeft className="size-5" />
            Back to Sign In
          </Link>

          <h1 className="mt-6 text-center text-2xl font-bold tracking-tight text-primary sm:text-4xl">
            Set New Password
          </h1>
          <p className="mt-3 text-center text-base text-muted-foreground sm:text-xl">
            Create a strong password for your account
          </p>

          <Card className="mx-auto mt-10 w-full max-w-155 rounded-[28px] border-0 bg-transparent shadow-card">
            <CardContent className="space-y-5 p-5 sm:p-9">
              {!validation.valid ? (
                <div className="rounded-2xl bg-red-50 px-4 py-4 text-sm text-red-600 sm:text-base">
                  {validation.reason}
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground sm:text-base">
                    Resetting password for{" "}
                    <span className="font-semibold">{validation.email}</span>
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2.5">
                      <Label
                        htmlFor="password"
                        className="text-sm font-semibold text-primary sm:text-base"
                      >
                        New Password
                      </Label>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter new password"
                          className="rounded-2xl border-2 border-input bg-background pl-12 pr-12 text-lg placeholder:text-muted-foreground"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOff className="size-5" />
                          ) : (
                            <Eye className="size-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <Label
                        htmlFor="confirm-password"
                        className="text-sm font-semibold text-primary sm:text-base"
                      >
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                          className="rounded-2xl border-2 border-input bg-background pl-12 pr-12 text-lg placeholder:text-muted-foreground"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                          aria-label={
                            showConfirmPassword
                              ? "Hide confirm password"
                              : "Show confirm password"
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="size-5" />
                          ) : (
                            <Eye className="size-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-accent p-4 text-sm text-foreground sm:text-base">
                      <p className="font-medium">Password must contain:</p>
                      <ul className="mt-2 list-disc pl-6">
                        <li className="text-primary">At least 8 characters</li>
                        <li className="text-primary">One uppercase letter</li>
                        <li className="text-primary">One number</li>
                        <li className="text-primary">
                          One special character (!@#$%^&*)
                        </li>
                      </ul>
                    </div>

                    {errorMessage && (
                      <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                        {errorMessage}
                      </p>
                    )}

                    {message && (
                      <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-600">
                        {message}
                      </p>
                    )}

                    <Button
                      type="submit"
                      className="w-full text-base font-bold shadow-button sm:text-lg"
                    >
                      Reset Password
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