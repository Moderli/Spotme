"use client";

import { useState, FormEvent } from "react";
import Header from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import MobileNav from "@/components/landing/mobile-nav";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Register() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) return;

    setIsSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (authError) {
      setError(authError.message);
      setIsSubmitting(false);
      return;
    }

    setSuccess(true);
    setIsSubmitting(false);

    // After a short delay, redirect to dashboard (auto-confirmed in dev)
    setTimeout(() => {
      router.push("/dashboard");
      router.refresh();
    }, 2000);
  };

  return (
    <div className="bg-background text-on-surface font-sans min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />

      <main className="flex-grow flex items-center justify-center py-20 px-margin-mobile">
        <div className="w-full max-w-md bg-surface-container-lowest p-8 md:p-12 rounded-[32px] soft-lift border border-outline-variant/10 animate-fade-in">
          <div className="text-center mb-8">
            <span className="font-serif text-3xl font-bold text-primary italic">Revela</span>
            <h1 className="text-2xl font-serif font-bold text-on-surface mt-4">Create your account</h1>
            <p className="text-sm text-on-surface-variant mt-2">
              Start preserving your event memories today.
            </p>
          </div>

          {success ? (
            <div className="text-center py-8 flex flex-col items-center justify-center animate-fade-in">
              <span className="material-symbols-outlined text-green-600 text-5xl mb-4">check_circle</span>
              <h2 className="text-xl font-serif font-bold text-on-surface mb-2">Account Created!</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Redirecting you to your dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 animate-fade-in">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="font-sans font-semibold text-xs text-on-surface-variant px-1 block">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-surface-bright border-none ring-1 ring-outline-variant/30 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary quint-ease outline-none text-sm font-sans"
                  placeholder="Your full name"
                />
              </div>

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
                <label className="font-sans font-semibold text-xs text-on-surface-variant px-1 block">
                  Password
                </label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  className="w-full bg-surface-bright border-none ring-1 ring-outline-variant/30 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary quint-ease outline-none text-sm font-sans"
                  placeholder="At least 6 characters"
                />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-primary text-on-primary py-4 rounded-xl font-sans font-semibold text-sm hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <div className="text-center pt-4 border-t border-outline-variant/10 text-xs text-on-surface-variant font-sans">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-semibold hover:underline">
                  Sign in
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
