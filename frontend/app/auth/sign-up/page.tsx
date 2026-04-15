"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setErrorMessage("You must agree to the Terms & Conditions and Privacy Policy.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const existingUsers = JSON.parse(
        localStorage.getItem("mockUsers") || "[]"
      ) as Array<{
        fullName: string;
        email: string;
        password: string;
      }>;

      const emailExists = existingUsers.some(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );

      if (emailExists) {
        setErrorMessage("An account with this email already exists.");
        setLoading(false);
        return;
      }

      const newUser = {
        fullName,
        email,
        password,
      };

      localStorage.setItem(
        "mockUsers",
        JSON.stringify([...existingUsers, newUser])
      );

      localStorage.setItem(
        "mockCurrentUser",
        JSON.stringify({
          fullName,
          email,
        })
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccessMessage("Account created successfully! Redirecting to dashboard...");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-center text-2xl font-bold tracking-tight text-primary sm:text-4xl">
            Create Account
          </h1>

          <p className="mt-3 text-center text-sm text-muted-foreground sm:text-base">
            Start making smarter eco decisions
          </p>

          <Card className="mx-auto mt-10 w-full max-w-155 rounded-[28px] border-0 bg-transparent shadow-card">
            <CardContent className="p-5 sm:p-9">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2.5">
                  <Label htmlFor="name" className="text-sm font-semibold text-primary sm:text-base">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="rounded-2xl border-2 border-input bg-background pl-12 text-lg placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="email" className="text-sm font-semibold text-primary sm:text-base">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="rounded-2xl border-2 border-input bg-background pl-12 text-lg placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="password" className="text-sm font-semibold text-primary sm:text-base">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      className="rounded-2xl border-2 border-input bg-background pl-12 pr-12 text-lg placeholder:text-muted-foreground"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
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
                      placeholder="Confirm your password"
                      className="rounded-2xl border-2 border-input bg-background pl-12 pr-12 text-lg placeholder:text-muted-foreground"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                      aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    >
                      {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <input
                    id="agree-terms"
                    name="agree-terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-input text-primary focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <label htmlFor="agree-terms" className="text-xs text-muted-foreground sm:text-sm">
                    I agree to the{" "}
                    <Link href="#" className="font-semibold text-primary">
                      Terms &amp; Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="font-semibold text-primary">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {errorMessage && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                    {errorMessage}
                  </p>
                )}

                {successMessage && (
                  <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-600">
                    {successMessage}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full text-base font-bold shadow-button sm:text-lg"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="mt-8 text-center text-xs text-muted-foreground sm:text-sm">
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="font-semibold text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}