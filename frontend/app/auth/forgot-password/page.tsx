"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resetLink, setResetLink] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setErrorMessage("");
    setResetLink("");

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("mockUsers") || "[]") as Array<{
      fullName?: string;
      email: string;
      password: string;
    }>;

    const existingUser = users.find(
      (user) => user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!existingUser) {
      setErrorMessage("No account found with that email address.");
      return;
    }

    const token = crypto.randomUUID();
    const expiresAt = Date.now() + 1000 * 60 * 15;

    localStorage.setItem(
      "mockResetData",
      JSON.stringify({
        email: existingUser.email,
        token,
        expiresAt,
      })
    );

    const link = `${window.location.origin}/auth/reset-password?token=${token}`;

    setResetLink(link);
    setMessage(`A mock reset link has been sent to ${existingUser.email}.`);

    console.log("Mock reset link:", link);
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
            Forgot Password?
          </h1>
          <p className="mt-3 text-center text-sm text-muted-foreground sm:text-base">
            No worries, we&apos;ll send you reset instructions
          </p>

          <Card className="mx-auto mt-10 w-full max-w-155 rounded-[28px] border-0 bg-transparent shadow-card">
            <CardContent className="space-y-5 p-5 sm:p-9">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2.5">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-primary sm:text-base"
                  >
                    Email Address
                  </Label>

                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-2xl border-2 border-input bg-background pl-12 text-lg placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full text-base font-bold shadow-button sm:text-lg"
                >
                  Send Reset Link
                </Button>
              </form>

              {errorMessage && (
                <div className="rounded-2xl bg-red-50 px-4 py-4 text-sm text-red-600 sm:text-base">
                  {errorMessage}
                </div>
              )}

              {message && (
                <div className="rounded-2xl bg-[#eef6ea] px-4 py-4 text-sm text-[#2f7d32] sm:text-base">
                  {message}
                </div>
              )}

              {resetLink && (
                <div className="rounded-2xl border border-border bg-background px-4 py-4">
                  <p className="text-sm text-muted-foreground sm:text-base">
                    Mock email preview:
                  </p>

                  <Link
                    href={resetLink}
                    className="mt-2 block break-all text-sm font-semibold text-primary underline sm:text-base"
                  >
                    Click here to reset your password
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}