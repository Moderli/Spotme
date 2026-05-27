"use client";

import { useState, FormEvent } from "react";
import Header from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import MobileNav from "@/components/landing/mobile-nav";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setIsSubmitting(false);
      return;
    }

    // Redirect to dashboard on success
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="bg-background text-on-surface font-sans min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />

      <main className="flex-grow flex items-center justify-center py-20 px-margin-mobile">
        <div className="w-full max-w-md bg-surface-container-lowest p-8 md:p-12 rounded-[32px] soft-lift border border-outline-variant/10 animate-fade-in">
          <div className="text-center mb-8">
            <span className="font-serif text-3xl font-bold text-primary italic">Revela</span>
            <h1 className="text-2xl font-serif font-bold text-on-surface mt-4">Welcome Back</h1>
            <p className="text-sm text-on-surface-variant mt-2">
              Sign in to manage your memories and galleries.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 animate-fade-in">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="font-sans font-semibold text-xs text-on-surface-variant px-1 block">
                Email Address
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-bright border-none ring-1 ring-outline-variant/30 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary quint-ease outline-none text-sm font-sans"
                placeholder="hello@domain.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="font-sans font-semibold text-xs text-on-surface-variant block">
                  Password
                </label>
                <a href="#" className="text-xs text-primary font-semibold hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-bright border-none ring-1 ring-outline-variant/30 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary quint-ease outline-none text-sm font-sans"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center gap-2 px-1">
              <input
                type="checkbox"
                id="remember"
                className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
              />
              <label htmlFor="remember" className="text-xs text-on-surface-variant font-sans cursor-pointer select-none">
                Keep me signed in on this device
              </label>
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-primary text-on-primary py-4 rounded-xl font-sans font-semibold text-sm hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                  Signing in...
                </>
              ) : (
                "Sign In to Archive"
              )}
            </button>

            <div className="text-center pt-4 border-t border-outline-variant/10 text-xs text-on-surface-variant font-sans">
              New to Revela?{" "}
              <Link href="/register" className="text-primary font-semibold hover:underline">
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
