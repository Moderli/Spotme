"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { registerGuest, getEventPrivacyMode } from "@/lib/guest-data-client";

type Step = "form" | "success";

export default function VerifyPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const router = useRouter();

  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setSubmitting(true);
    setError(null);

    const fullPhone = `${countryCode}${phone.replace(/\s/g, "")}`;

    const guest = await registerGuest(eventId, fullPhone, name.trim());

    if (!guest) {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    // Store guest ID in localStorage for this session
    localStorage.setItem(`guest_id_${eventId}`, guest.id);
    localStorage.setItem(`guest_name_${eventId}`, name.trim());

    setStep("success");

    // Check privacy mode — redirect to find-me if enabled, otherwise gallery
    const privacyMode = await getEventPrivacyMode(eventId);
    setTimeout(() => {
      router.push(privacyMode
        ? `/event/${eventId}/find-me`
        : `/event/${eventId}/gallery`);
    }, 1500);
  };

  return (
    <div className="flex min-h-[calc(100vh-56px)] items-center justify-center px-5 py-10 sm:px-8">
      <div className="w-full max-w-sm">

        {/* ── Step: Form ────────────────────────────── */}
        {step === "form" && (
          <div className="animate-fade-in">
            {/* WhatsApp icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#25D366]/10">
              <svg viewBox="0 0 24 24" className="h-8 w-8 fill-[#25D366]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>

            <h1 className="text-center text-xl font-semibold tracking-tight sm:text-2xl">
              Join the event
            </h1>
            <p className="mt-2 text-center text-sm text-[#827970]">
              Enter your name and WhatsApp number to access your photos.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {/* Name field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#766D66]">
                  Your Name
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="mt-2 h-12 w-full rounded-xl border border-[#2D2D2D]/8 bg-white px-4 text-base outline-none transition focus:border-[#25D366]/50 focus:shadow-[0_0_0_3px_rgba(37,211,102,0.08)]"
                />
              </div>

              {/* Phone field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#766D66]">
                  WhatsApp Number
                </label>
                <div className="mt-2 flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="h-12 w-[88px] shrink-0 rounded-xl border border-[#2D2D2D]/8 bg-white px-2.5 text-sm font-medium outline-none transition focus:border-[#25D366]/50"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+81">🇯🇵 +81</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+65">🇸🇬 +65</option>
                  </select>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    className="h-12 flex-1 rounded-xl border border-[#2D2D2D]/8 bg-white px-4 text-base font-medium tracking-wide outline-none transition focus:border-[#25D366]/50 focus:shadow-[0_0_0_3px_rgba(37,211,102,0.08)]"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-xs text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || name.length < 2 || phone.length < 6}
                className="mt-2 flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#D67D5C] to-[#C46A4A] text-base font-semibold text-white shadow-[0_10px_24px_rgba(214,125,92,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(214,125,92,0.28)] active:scale-[0.98] disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {submitting ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    View Event Photos
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-[11px] text-[#A69C93] leading-4">
              Your number is only used to identify your photos. <br />
              We never share your data.
            </p>
          </div>
        )}

        {/* ── Step: Success ─────────────────────────── */}
        {step === "success" && (
          <div className="flex flex-col items-center animate-fade-in">
            <div className="relative flex h-20 w-20 items-center justify-center">
              <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-[#D67D5C]/20 border-t-[#D67D5C]" />
              <span className="material-symbols-outlined text-[28px] text-[#D67D5C]">check</span>
            </div>
            <h2 className="mt-6 text-lg font-semibold">Welcome, {name}!</h2>
            <p className="mt-2 text-sm text-[#827970]">Taking you to your photos...</p>
          </div>
        )}
      </div>
    </div>
  );
}
