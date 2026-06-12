"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import MobileNav from "@/components/landing/mobile-nav";
import { ArrowRight, Calendar } from "lucide-react";

// Import custom PNGs and SVGs
import catCameraManPointing from "../cat_camera_man_pointing.png";
import holdingPhone from "../holding_phone.png";
import showcasingPrivatePhotos from "../Showcasing_private_photos.png";
import groupHeroPhoto from "../group_Hero_photo.svg";

const carouselImages = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop", // Wedding
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop", // Concert
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800&auto=format&fit=crop", // Birthday
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop", // Corporate
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop", // Awards (Gala Hall)
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop"  // Anniversary (Couple in garden)
];

const slideWords = ["Weddings", "Events", "Concerts", "Birthdays", "Awards", "Parties"];

// ── Pricing Plan Data ────────────────────────────────────────────────────────
const PERSONAL_PLANS = [
  {
    id: "free",
    name: "Free Plan",
    price: "₹0",
    period: "1 year validity",
    badge: null,
    desc: "Perfect for trying out Spotme.",
    features: [
      "1 Event Creation",
      "5 GB Cloud Storage",
      "1 Year Validity",
      "AI Face Matching",
      "Public Event Gallery",
      "Guest Selfie Upload",
    ],
    cta: "Start Free",
    href: "/login",
    highlight: false,
  },
  {
    id: "starter",
    name: "Starter",
    price: "₹499",
    period: "/month",
    badge: null,
    desc: "For beginners starting their photography journey.",
    features: [
      "1 Event Creation",
      "20 GB Cloud Storage",
      "1 Year Validity",
      "AI Face Matching",
      "Public Event Gallery",
      "Guest Selfie Upload",
    ],
    cta: "Get Started",
    href: "/login?plan=starter",
    highlight: false,
  },
  {
    id: "pro",
    name: "Personal Pro",
    price: "₹999",
    period: "/month",
    badge: "Most Popular",
    desc: "For full-time freelance photographers.",
    features: [
      "4 Events Creation",
      "60 GB Reusable Storage",
      "Spotme Team Collaboration (3 people)",
      "AI Face Matching",
      "Privacy Mode (selfie-only access)",
      "High-Resolution Downloads",
      "Priority AI Processing",
      "Custom Event Branding",
    ],
    cta: "Get Personal Pro",
    href: "/login?plan=pro",
    highlight: true,
  },
];

const STUDIO_PLANS = [
  {
    id: "studio_basic",
    name: "Studio Basic",
    price: "₹699",
    period: "/month",
    badge: null,
    desc: "For small studios getting started.",
    features: [
      "5 Events Creation",
      "40 GB Cloud Storage",
      "Face Recognition",
      "AI Face Matching",
      "Privacy Mode (selfie-only access)",
      "High-Resolution Downloads",
    ],
    cta: "Get Studio Basic",
    href: "/login?plan=studio_basic",
    highlight: false,
  },
  {
    id: "studio_pro",
    name: "Studio Pro",
    price: "₹1,599",
    period: "/month",
    badge: "Best Value",
    desc: "For expanding studios with teams.",
    features: [
      "Unlimited Events Creation",
      "100 GB Cloud Storage",
      "Face Recognition",
      "Spotme Access (5 members)",
      "Custom Event Branding",
      "Priority AI + Support",
      "Branded Guest Galleries",
    ],
    cta: "Start Studio Pro",
    href: "/login?plan=studio_pro",
    highlight: true,
  },
  {
    id: "custom",
    name: "Custom Plan",
    price: "Custom",
    period: "",
    badge: null,
    desc: "Tailored plan for large studios and enterprise teams.",
    features: [
      "Face Recognition",
      "Custom Domain",
      "Custom Branding",
      "Access to all features",
      "API Access",
      "Dedicated Account Manager",
      "White-Label Options",
      "Invoice Billing",
    ],
    cta: "Contact Sales",
    href: "/contact",
    highlight: false,
  },
];

const FAQS = [
  {
    question: "How does AI photo matching work?",
    answer:
      "Guests scan the event QR code, upload a selfie, and Spotme's AI (InsightFace ArcFace) automatically finds all event photos featuring their face — with no manual tagging needed.",
  },
  {
    question: "What is Privacy Mode?",
    answer:
      "When Privacy Mode is on, the general gallery is hidden. Guests can only see photos of themselves after uploading their selfie — ideal for weddings and private events.",
  },
  {
    question: "Do guests need an account?",
    answer:
      "No. Guests access event photos using the event QR code and a phone number verification. Zero app download or account required.",
  },
  {
    question: "Can I upgrade or downgrade at any time?",
    answer:
      "Yes. You can change plans from your Account settings at any time. Upgrades take effect immediately.",
  },
  {
    question: "What happens to my photos if I downgrade?",
    answer:
      "Your photos remain safely stored. If your storage exceeds the new plan limit, new uploads will be paused until you free up space or upgrade again.",
  },
  {
    question: "Is there a per-event fee or per-guest fee?",
    answer:
      "No. All plans are flat monthly subscriptions — no per-event or per-guest charges. Unlimited guests on every plan.",
  },
];

const COMPARISON = [
  { feature: "Active Events", starter: "1", pro: "4", studio: "Unlimited", enterprise: "Unlimited" },
  { feature: "Cloud Storage", starter: "20 GB", pro: "60 GB (Reusable)", studio: "100 GB", enterprise: "Custom" },
  { feature: "AI Face Matching", starter: true, pro: true, studio: true, enterprise: true },
  { feature: "Guest QR Access", starter: true, pro: true, studio: true, enterprise: true },
  { feature: "Privacy Mode", starter: false, pro: true, studio: true, enterprise: true },
  { feature: "Custom Branding", starter: false, pro: true, studio: true, enterprise: true },
  { feature: "Priority AI Processing", starter: false, pro: true, studio: true, enterprise: true },
  { feature: "Team Collaboration", starter: false, pro: "3 Members", studio: "5 Members", enterprise: "Custom" },
  { feature: "Branded Galleries", starter: false, pro: false, studio: true, enterprise: true },
  { feature: "API Access", starter: false, pro: false, studio: false, enterprise: true },
  { feature: "White-Label", starter: false, pro: false, studio: false, enterprise: true },
  { feature: "Support", starter: "Email", pro: "Priority", studio: "Priority", enterprise: "Dedicated" },
];

function CheckIcon() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
      <span className="material-symbols-outlined text-[14px] text-primary">check</span>
    </span>
  );
}

function CrossIcon() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-outline-variant/20">
      <span className="material-symbols-outlined text-[14px] text-on-surface-variant/40">remove</span>
    </span>
  );
}

type Plan = {
  id: string;
  name: string;
  price: string;
  period: string;
  badge: string | null;
  desc: string;
  features: string[];
  cta: string;
  href: string;
  highlight: boolean;
};

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-300 ${
        plan.highlight
          ? "border-primary bg-primary text-on-primary shadow-xl shadow-primary/20 scale-[1.02]"
          : "border-outline-variant/15 bg-surface-container-lowest text-on-surface shadow-sm hover:shadow-md hover:-translate-y-0.5"
      }`}
    >
      {plan.badge && (
        <div
          className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-widest ${
            plan.highlight ? "bg-white text-primary" : "bg-primary text-on-primary"
          }`}
        >
          {plan.badge}
        </div>
      )}

      <h2 className={`text-lg font-bold font-sans ${plan.highlight ? "text-on-primary" : "text-on-surface"}`}>
        {plan.name}
      </h2>
      <p className={`mt-1 text-xs leading-relaxed ${plan.highlight ? "text-on-primary/75" : "text-on-surface-variant"}`}>
        {plan.desc}
      </p>

      <div className="mt-5 flex items-baseline gap-1">
        <span className={`text-4xl font-extrabold tracking-tight ${plan.highlight ? "text-on-primary" : "text-primary"}`}>
          {plan.price}
        </span>
        {plan.period && (
          <span className={`text-sm font-medium ${plan.highlight ? "text-on-primary/70" : "text-on-surface-variant"}`}>
            {plan.period}
          </span>
        )}
      </div>

      <ul className={`mt-6 space-y-2.5 flex-1 text-sm ${plan.highlight ? "text-on-primary/85" : "text-on-surface-variant"}`}>
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span
              className={`material-symbols-outlined shrink-0 text-[16px] mt-0.5 ${
                plan.highlight ? "text-white/80" : "text-primary"
              }`}
            >
              check_circle
            </span>
            {f}
          </li>
        ))}
      </ul>

      <Link
        href={plan.href}
        className={`mt-8 block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all duration-200 ${
          plan.highlight
            ? "bg-white text-primary hover:bg-white/90 shadow-sm"
            : plan.id === "custom"
            ? "border border-outline-variant/20 bg-transparent text-on-surface hover:bg-surface-container hover:border-primary/30"
            : "bg-primary text-on-primary hover:bg-primary/90"
        }`}
      >
        {plan.cta}
      </Link>
    </div>
  );
}

export default function HomeClient() {
  const [wordIndex, setWordIndex] = useState(0);
  const [tab, setTab] = useState<"personal" | "studio">("personal");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactErrors, setContactErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof contactErrors = {};
    if (!contactName.trim()) errs.name = "Please enter your name.";
    if (!contactEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) errs.email = "Please enter a valid email address.";
    if (!contactMessage.trim()) errs.message = "Please enter your message.";
    
    setContactErrors(errs);
    if (Object.keys(errs).length > 0) return;
    
    setContactSubmitting(true);
    setTimeout(() => {
      setContactSubmitting(false);
      setContactSubmitted(true);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    }, 1500);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % slideWords.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Setup Scroll Reveal Observer
    const revealOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, revealOptions);

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => revealObserver.observe(el));

    // Cleanup
    return () => {
      revealElements.forEach((el) => revealObserver.unobserve(el));
    };
  }, []);

  return (
    <div className="bg-pulse-anim text-on-surface font-sans overflow-x-hidden min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Centered Hero Section */}
        <section className="relative flex flex-col items-center justify-center overflow-hidden bg-background pt-24 pb-0">
          {/* Decorative ambient gradients */}
          <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary/5 rounded-full blur-3xl float-anim"></div>
          <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-secondary-container/10 rounded-full blur-3xl float-anim" style={{ animationDelay: "2s" }}></div>

          {/* Text and CTAs Container */}
          <div className="relative z-10 max-w-container-max mx-auto px-margin-desktop w-full flex flex-col items-center text-center">
            {/* Dynamic Rotating Title */}
            <h1 className="font-sans text-4xl md:text-6xl font-bold tracking-tight text-on-surface leading-[1.15] mb-6 stagger-in max-w-4xl">
              Your Event Photos, <br />
              Delivered Instantly for{" "}
              <span key={wordIndex} className="animate-fade-up-word inline-block bg-gradient-to-r from-primary via-primary-container to-secondary bg-clip-text text-transparent italic px-2">
                {slideWords[wordIndex]}
              </span>
            </h1>

            {/* Centered Tagline */}
            <p className="font-sans text-base md:text-lg text-on-surface-variant mb-10 stagger-in max-w-2xl leading-relaxed">
              Get your private event photos instantly with a quick QR scan and a selfie—no apps or logins required.
            </p>

            {/* CTA Buttons */}
            <div className="stagger-in flex flex-col sm:flex-row items-center gap-4 w-full justify-center px-4 max-w-md mx-auto relative z-20">
              <Link
                href="/inquire"
                className="w-full sm:w-auto bg-on-background text-background font-sans font-medium text-[15px] px-6 py-3 rounded-full hover:bg-on-background/90 active:scale-95 duration-200 transition-all text-center flex items-center justify-center gap-2"
              >
                Create Event <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/inquire"
                className="w-full sm:w-auto bg-surface-container-lowest border border-outline-variant/50 text-on-surface font-sans font-medium text-[15px] px-6 py-3 rounded-full hover:bg-surface-container-low active:scale-95 transition-all text-center flex items-center justify-center gap-2"
              >
                <Calendar className="h-4 w-4 text-primary" />
                Book a Demo
              </Link>
            </div>
          </div>

          {/* Hero Image at the bottom of hero section content (spanning end-to-end of page) */}
          <div className="stagger-in mt-2 md:-mt-28 w-full flex justify-center z-10 pointer-events-none">
            <Image
              src={groupHeroPhoto}
              alt="Spotme Event Photos Delivery"
              className="w-full h-auto object-contain hover:scale-[1.005] transition-transform duration-500"
              priority
            />
          </div>
        </section>
        {/* How Spotme Works (Wavy Timeline 🐱) */}
        <section className="py-24 bg-gradient-to-b from-background via-surface-container-low to-background overflow-hidden border-b border-outline-variant/10 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Intro Box */}
              <div className="lg:col-span-4 flex flex-col items-start text-left lg:sticky lg:top-28">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 block">
                  How It Works
                </span>
                <h2 className="font-sans text-3xl md:text-5xl text-on-surface font-bold mb-6 tracking-tight leading-tight">
                  Memories, Delivered Instantly
                </h2>
                <p className="font-sans text-base text-on-surface-variant mb-8 leading-relaxed max-w-sm">
                  We connect the photographer&apos;s camera directly to your guests&apos; phones. No app downloads, no manual photo sorting—just instant sharing.
                </p>
                <Link
                  href="/inquire"
                  className="bg-primary text-on-primary font-sans font-medium text-sm px-6 py-3 rounded-full hover:scale-[1.03] active:scale-95 duration-200 shadow-sm transition-all text-center inline-flex items-center gap-2"
                >
                  Create Event <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Right Column: Curvy Timeline */}
              <div className="lg:col-span-8 w-full relative pt-12 pb-12 lg:pb-24">
                
                {/* Desktop SVG Curvy Line (hidden on mobile) */}
                <div className="absolute inset-0 pointer-events-none hidden md:block z-0">
                  <svg className="w-full h-full" viewBox="0 0 800 400" fill="none" preserveAspectRatio="none">
                    <path
                      d="M 60 280 Q 200 320 300 200 T 560 140 T 730 80"
                      fill="none"
                      stroke="var(--color-primary)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeDasharray="8 6"
                      className="opacity-70"
                    />
                  </svg>
                </div>

                {/* Staggered Steps Container */}
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4 md:min-h-[420px] w-full">
                  {/* Step 1 */}
                  <div className="flex-1 flex flex-col items-start md:mt-64 relative group w-full">
                    {/* Curve Marker (Dot) */}
                    <div className="absolute -top-6 left-6 md:-top-16 md:left-6 flex items-center justify-center z-20">
                      <span className="w-5 h-5 rounded-full bg-surface border-4 border-primary shadow-md group-hover:scale-125 transition-transform duration-300"></span>
                    </div>

                    <div className="relative w-full pl-6 pt-4 md:pt-6">
                      {/* Gray Step Number */}
                      <span className="text-[120px] font-bold text-on-surface-variant/5 absolute -top-12 -left-6 select-none leading-none z-0">
                        1
                      </span>
                      
                      {/* Cat Image Illustration (Icon) */}
                      <div className="w-full flex justify-start mb-4 h-24 relative z-10">
                        <Image
                          src={catCameraManPointing}
                          alt="Shoot & Sync"
                          className="h-full w-auto object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <h3 className="font-sans text-xl font-bold text-on-surface mb-2 relative z-10">
                        Shoot &amp; Sync
                      </h3>
                      <p className="font-sans text-sm text-on-surface-variant leading-relaxed relative z-10">
                        The moment a photo is captured, it uploads to our cloud instantly. No manual card transfers.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex-1 flex flex-col items-start md:mt-32 relative group w-full">
                    {/* Curve Marker (Dot) */}
                    <div className="absolute -top-6 left-6 md:-top-16 md:left-6 flex items-center justify-center z-20">
                      <span className="w-5 h-5 rounded-full bg-surface border-4 border-primary shadow-md group-hover:scale-125 transition-transform duration-300"></span>
                    </div>

                    <div className="relative w-full pl-6 pt-4 md:pt-6">
                      {/* Gray Step Number */}
                      <span className="text-[120px] font-bold text-on-surface-variant/5 absolute -top-12 -left-6 select-none leading-none z-0">
                        2
                      </span>

                      {/* Cat Image Illustration (Icon) */}
                      <div className="w-full flex justify-start mb-4 h-24 relative z-10">
                        <Image
                          src={holdingPhone}
                          alt="Frictionless QR Scan"
                          className="h-full w-auto object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <h3 className="font-sans text-xl font-bold text-on-surface mb-2 relative z-10">
                        Frictionless QR Scan
                      </h3>
                      <p className="font-sans text-sm text-on-surface-variant leading-relaxed relative z-10">
                        Guests scan a custom event QR code. Works instantly in any smartphone browser with no login.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex-1 flex flex-col items-start md:mt-4 relative group w-full">
                    {/* Curve Marker (Dot) */}
                    <div className="absolute -top-6 left-6 md:-top-16 md:left-6 flex items-center justify-center z-20">
                      <span className="w-5 h-5 rounded-full bg-surface border-4 border-primary shadow-md group-hover:scale-125 transition-transform duration-300"></span>
                    </div>

                    <div className="relative w-full pl-6 pt-4 md:pt-6">
                      {/* Gray Step Number */}
                      <span className="text-[120px] font-bold text-on-surface-variant/5 absolute -top-12 -left-6 select-none leading-none z-0">
                        3
                      </span>

                      {/* Cat Image Illustration (Icon) */}
                      <div className="w-full flex justify-start mb-4 h-24 relative z-10">
                        <Image
                          src={showcasingPrivatePhotos}
                          alt="Personal AI Gallery"
                          className="h-full w-auto object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <h3 className="font-sans text-xl font-bold text-on-surface mb-2 relative z-10">
                        Personal AI Gallery
                      </h3>
                      <p className="font-sans text-sm text-on-surface-variant leading-relaxed relative z-10">
                        Take a quick secure selfie, and our AI scans the pool to deliver a private gallery of only your photos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section id="features" className="py-24 bg-surface-container-low reveal transition-all duration-1000 ease-out">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-16">
              <h2 className="font-sans text-3xl md:text-4xl text-on-surface mb-4 font-bold text-zoom-pulse">
                Crafted for Emotional Connection
              </h2>
              <p className="font-sans text-base text-on-surface-variant max-w-xl mx-auto">
                We&apos;ve removed the technical friction so you can focus on the feeling of the moment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter h-auto">
              
              {/* Feature 1: AI Matching */}
              <div className="feature-card md:col-span-8 bg-surface-container-lowest rounded-[32px] p-10 flex flex-col justify-between soft-lift overflow-hidden group">
                <div>
                  <div className="w-14 h-14 bg-primary-container/10 rounded-2xl flex items-center justify-center mb-8">
                    <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
                  </div>
                  <h3 className="font-sans text-2xl text-on-surface mb-4 font-bold text-zoom-hover">Seamless AI Matching</h3>
                  <p className="font-sans text-sm text-on-surface-variant max-w-md leading-relaxed">
                    Our private facial recognition identifies guests instantly, curating a personalized gallery for every single attendee without manual sorting.
                  </p>
                </div>
                <div className="mt-8 relative h-48 md:h-64 overflow-hidden rounded-2xl">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Spotme AI facial recognition matching a guest selfie to wedding event photos"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
                  />
                </div>
              </div>

              {/* Feature 3: Privacy */}
              <div className="feature-card md:col-span-4 bg-tertiary-fixed text-on-tertiary-fixed rounded-[32px] p-10 flex flex-col justify-between hover:bg-tertiary-fixed-dim transition-all">
                <div>
                  <div className="w-14 h-14 bg-on-tertiary-fixed/5 rounded-2xl flex items-center justify-center mb-8">
                    <span className="material-symbols-outlined text-on-tertiary-fixed text-3xl">lock</span>
                  </div>
                  <h3 className="font-sans text-2xl mb-4 font-bold text-zoom-hover">Privacy First</h3>
                  <p className="font-sans text-sm text-on-tertiary-fixed-variant leading-relaxed">
                    End-to-end encryption for your galleries. You control exactly who sees what, ensuring memories stay within the inner circle.
                  </p>
                </div>
              </div>

              {/* Feature 4: High Res */}
              <div className="feature-card md:col-span-12 bg-surface-container-highest rounded-[32px] p-10 flex flex-col md:flex-row items-center gap-8 soft-lift overflow-hidden group">
                <div className="flex-1">
                  <h3 className="font-sans text-2xl text-on-surface mb-4 font-bold text-zoom-hover">Uncompromising Quality</h3>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                    We preserve every pixel. Download original high-resolution files suitable for large-format printing and family heirlooms.
                  </p>
                </div>
                <div className="flex-1 hidden md:block overflow-hidden rounded-2xl">
                  <img
                    className="w-full h-64 object-cover rounded-2xl shadow-lg transition-transform duration-1000 group-hover:scale-105 group-hover:rotate-2"
                    alt="High-resolution wedding photos downloaded from Spotme gallery for large-format printing"
                    src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop"
                  />
                </div>
              </div>

            </div>

            {/* Sliding Image Marquee row */}
            <div className="mt-16 overflow-hidden w-full relative py-6 bg-surface-container-low rounded-[32px] border border-outline-variant/10">
              <div className="animate-marquee flex gap-6">
                {/* First set of images */}
                {carouselImages.map((img, i) => (
                  <div key={i} className="w-[320px] h-[220px] flex-shrink-0 overflow-hidden rounded-2xl group shadow-sm relative">
                    <img
                      src={img}
                      alt={`Wedding and event photos delivered instantly via Spotme AI gallery — example ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                  </div>
                ))}
                {/* Duplicate set for infinite loop */}
                {carouselImages.map((img, i) => (
                  <div key={`dup-${i}`} className="w-[320px] h-[220px] flex-shrink-0 overflow-hidden rounded-2xl group shadow-sm relative">
                    <img
                      src={img}
                      alt={`AI event photo gallery example ${i + 1} — Spotme instant photo delivery`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-24 bg-surface-container-lowest reveal transition-all duration-1000 ease-out">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
            
            {/* Header */}
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant/60 mb-3 block">
                Testimonial
              </span>
              <h2 className="font-sans text-3xl md:text-5xl text-on-surface font-bold mb-4 tracking-tight">
                Transformative Client Experiences
              </h2>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 1 */}
              <div className="relative p-8 pb-24 flex flex-col justify-between h-full min-h-[260px] text-left">
                {/* SVG Background Shape */}
                <div className="absolute inset-0 z-0">
                  <svg className="w-full h-full text-surface-container-low fill-current" viewBox="0 0 300 240" preserveAspectRatio="none">
                    <path d="M 24 0 L 276 0 A 24 24 0 0 1 300 24 L 300 216 A 24 24 0 0 1 276 240 L 144 240 A 24 24 0 0 1 120 216 L 120 204 A 24 24 0 0 0 96 180 L 24 180 A 24 24 0 0 1 0 156 L 0 24 A 24 24 0 0 1 24 0 Z" />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-on-surface-variant/20 text-5xl font-serif leading-none mb-3 select-none">“</div>
                  <p className="font-sans text-lg text-on-surface leading-relaxed font-medium">
                    Impressed by the professionalism and attention to detail.
                  </p>
                </div>
                
                {/* User Info aligned to the bottom-left corner */}
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-surface-container-high relative flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
                      alt="Guy Hawkins"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="font-sans font-bold text-sm text-on-surface leading-none">Guy Hawkins</h4>
                    <p className="font-sans text-xs text-on-surface-variant/80 mt-1">@guyhawkins</p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative p-8 pb-24 flex flex-col justify-between h-full min-h-[260px] text-left">
                {/* SVG Background Shape */}
                <div className="absolute inset-0 z-0">
                  <svg className="w-full h-full text-surface-container-low fill-current" viewBox="0 0 300 240" preserveAspectRatio="none">
                    <path d="M 24 0 L 276 0 A 24 24 0 0 1 300 24 L 300 216 A 24 24 0 0 1 276 240 L 144 240 A 24 24 0 0 1 120 216 L 120 204 A 24 24 0 0 0 96 180 L 24 180 A 24 24 0 0 1 0 156 L 0 24 A 24 24 0 0 1 24 0 Z" />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-on-surface-variant/20 text-5xl font-serif leading-none mb-3 select-none">“</div>
                  <p className="font-sans text-lg text-on-surface leading-relaxed font-medium">
                    A seamless experience from start to finish. Highly recommend!
                  </p>
                </div>
                
                {/* User Info aligned to the bottom-left corner */}
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-surface-container-high relative flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
                      alt="Karla Lynn"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="font-sans font-bold text-sm text-on-surface leading-none">Karla Lynn</h4>
                    <p className="font-sans text-xs text-on-surface-variant/80 mt-1">@karlalynn98</p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative p-8 pb-24 flex flex-col justify-between h-full min-h-[260px] text-left">
                {/* SVG Background Shape */}
                <div className="absolute inset-0 z-0">
                  <svg className="w-full h-full text-surface-container-low fill-current" viewBox="0 0 300 240" preserveAspectRatio="none">
                    <path d="M 24 0 L 276 0 A 24 24 0 0 1 300 24 L 300 216 A 24 24 0 0 1 276 240 L 144 240 A 24 24 0 0 1 120 216 L 120 204 A 24 24 0 0 0 96 180 L 24 180 A 24 24 0 0 1 0 156 L 0 24 A 24 24 0 0 1 24 0 Z" />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-on-surface-variant/20 text-5xl font-serif leading-none mb-3 select-none">“</div>
                  <p className="font-sans text-lg text-on-surface leading-relaxed font-medium">
                    Reliable and trustworthy. Made my life so much easier!
                  </p>
                </div>
                
                {/* User Info aligned to the bottom-left corner */}
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-surface-container-high relative flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
                      alt="Jane Cooper"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="font-sans font-bold text-sm text-on-surface leading-none">Jane Cooper</h4>
                    <p className="font-sans text-xs text-on-surface-variant/80 mt-1">@janecooper</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Slider Dots Indicator */}
            <div className="flex justify-center items-center gap-2 mt-12">
              <span className="w-6 h-1.5 rounded-full bg-primary/80 transition-all duration-300"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/50 hover:bg-primary/50 transition-all duration-300 cursor-pointer"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/50 hover:bg-primary/50 transition-all duration-300 cursor-pointer"></span>
            </div>

          </div>
        </section>

        {/* ── Pricing Section ── */}
        <section id="pricing" className="py-24 bg-surface-container-low border-t border-b border-outline-variant/10 reveal transition-all duration-1000 ease-out">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            
            {/* Heading */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-4 tracking-tight font-sans">
                The right plan for <span className="text-primary">every photographer</span>
              </h2>
              <p className="text-sm md:text-base text-on-surface-variant max-w-xl mx-auto">
                From solo weekend shooters to high-volume studios — choose the plan that matches your scale. Cancel anytime.
              </p>
            </div>

            {/* Segment Toggle */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex rounded-2xl border border-outline-variant/15 bg-surface-container-lowest p-1.5 gap-1 shadow-sm">
                <button
                  onClick={() => setTab("personal")}
                  className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    tab === "personal"
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  Personal
                </button>
                <button
                  onClick={() => setTab("studio")}
                  className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    tab === "studio"
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">business</span>
                  Studio
                </button>
              </div>
            </div>
            
            <p className="text-center text-xs text-on-surface-variant -mt-6 mb-8">
              {tab === "personal"
                ? "For individual photographers & freelancers"
                : "For studios, agencies & event companies"}
            </p>

            {/* Plan Cards */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center items-stretch">
                {(tab === "personal" ? PERSONAL_PLANS : STUDIO_PLANS).map((plan) => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </div>

              {/* Satisfaction note */}
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-on-surface-variant">
                {["No setup fees", "Cancel anytime", "Unlimited guests on all plans", "Indian payment methods supported"].map((note) => (
                  <span key={note} className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[13px] text-primary">verified</span>
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Full Comparison Table */}
            <div className="max-w-5xl mx-auto mb-20">
              <div className="text-center mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-on-surface mb-2 font-sans">Full Plan Comparison</h3>
                <p className="text-xs text-on-surface-variant">Every feature, every plan — no surprises.</p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-outline-variant/15 shadow-sm bg-surface-container-lowest">
                <table className="w-full text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-outline-variant/10 bg-surface-container-lowest">
                      <th className="px-5 py-4 text-left font-semibold text-on-surface w-[40%]">Feature</th>
                      <th className="px-4 py-4 text-center font-semibold text-on-surface-variant">Starter</th>
                      <th className="px-4 py-4 text-center font-bold text-primary">Personal Pro</th>
                      <th className="px-4 py-4 text-center font-semibold text-on-surface">Studio Pro</th>
                      <th className="px-4 py-4 text-center font-semibold text-on-surface-variant">Custom</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/8">
                    {COMPARISON.map((row, i) => (
                      <tr key={row.feature} className={i % 2 === 0 ? "bg-white/30" : ""}>
                        <td className="px-5 py-3.5 text-on-surface font-medium">{row.feature}</td>
                        <td className="px-4 py-3.5 text-center">
                          {typeof row.starter === "boolean" ? (
                            row.starter ? <CheckIcon /> : <CrossIcon />
                          ) : (
                            <span className="text-on-surface-variant">{row.starter}</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-center bg-primary/3">
                          {typeof row.pro === "boolean" ? (
                            row.pro ? <CheckIcon /> : <CrossIcon />
                          ) : (
                            <span className="font-medium text-primary">{row.pro}</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          {typeof row.studio === "boolean" ? (
                            row.studio ? <CheckIcon /> : <CrossIcon />
                          ) : (
                            <span className="text-on-surface">{row.studio}</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          {typeof row.enterprise === "boolean" ? (
                            row.enterprise ? <CheckIcon /> : <CrossIcon />
                          ) : (
                            <span className="text-on-surface-variant">{row.enterprise}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-on-surface font-sans mb-2">
                  Frequently Asked Questions
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Everything you need to know before getting started.
                </p>
              </div>

              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className={`rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isOpen
                          ? "border-primary/30 bg-primary/5"
                          : "border-outline-variant/15 bg-surface-container-lowest hover:border-primary/20"
                      }`}
                    >
                      <div className="flex items-center justify-between p-5">
                        <h4 className="text-sm font-semibold text-on-surface pr-4">{faq.question}</h4>
                        <span className={`material-symbols-outlined text-[20px] shrink-0 transition-transform duration-200 ${isOpen ? "text-primary rotate-180" : "text-on-surface-variant"}`}>
                          expand_more
                        </span>
                      </div>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? "max-h-[200px] pb-5 px-5 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-sm text-on-surface-variant leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* ── Contact Section (Reference Style) ── */}
        <section id="contact" className="py-24 bg-[#FAF9F6] border-t border-outline-variant/10 reveal transition-all duration-1000 ease-out">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Info & Staggered Cards */}
              <div className="lg:col-span-6 flex flex-col items-start text-left">
                <span className="text-xs font-semibold uppercase tracking-wider text-outline-variant/60 mb-3 block">
                  Contact
                </span>
                <h2 className="font-sans text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-tight tracking-tight">
                  Let&apos;s build your <br />plan together!
                </h2>
                <p className="font-sans text-sm md:text-base text-on-surface-variant mb-12 max-w-md leading-relaxed">
                  Have a question about training, nutrition, or which program fits you best? <br />
                  Reach out — we&apos;ll help you find your next step forward.
                </p>

                {/* Info Cards */}
                <div className="w-full space-y-4 max-w-md">
                  {/* Card 1: Chat */}
                  <a 
                    href="https://wa.me/918919885401" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-between p-6 bg-[#f4f4f4] hover:bg-[#eaeaea] rounded-3xl transition-all duration-300 group"
                  >
                    <div className="flex flex-col text-left gap-1">
                      <span className="material-symbols-outlined text-on-surface-variant text-2xl mb-4 select-none">
                        forum
                      </span>
                      <h4 className="font-sans font-bold text-base text-on-surface">Chat</h4>
                      <p className="font-sans text-xs text-on-surface-variant">
                        Chat directly with our team on WhatsApp
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0 group-hover:scale-115 transition-transform duration-300">
                      <ArrowRight className="h-4 w-4 text-white" />
                    </div>
                  </a>

                  {/* Card 2: Call us */}
                  <a 
                    href="tel:+918919885401" 
                    className="flex items-center justify-between p-6 bg-[#f4f4f4] hover:bg-[#eaeaea] rounded-3xl transition-all duration-300 group"
                  >
                    <div className="flex flex-col text-left gap-1">
                      <span className="material-symbols-outlined text-on-surface-variant text-2xl mb-4 select-none">
                        call
                      </span>
                      <h4 className="font-sans font-bold text-base text-on-surface">Call us</h4>
                      <p className="font-sans text-xs text-on-surface-variant">
                        +91 89198 85401 (Mon - Sat, 9:00 - 19:00 IST)
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0 group-hover:scale-115 transition-transform duration-300">
                      <ArrowRight className="h-4 w-4 text-white" />
                    </div>
                  </a>
                </div>
              </div>

              {/* Right Column: Send Message Form */}
              <div className="lg:col-span-6 bg-white p-8 md:p-12 rounded-[32px] border border-outline-variant/10 shadow-sm w-full max-w-xl lg:ml-auto">
                <h3 className="font-sans text-2xl font-bold text-on-surface mb-8 text-left">Send a Message</h3>
                
                {contactSubmitted ? (
                  <div className="text-center py-12 flex flex-col items-center justify-center animate-fade-in">
                    <span className="material-symbols-outlined text-green-600 text-5xl mb-4 select-none">check_circle</span>
                    <h4 className="text-xl font-bold text-on-surface mb-2 font-sans">Message Sent!</h4>
                    <p className="text-xs text-on-surface-variant max-w-sm leading-relaxed font-sans">
                      Thank you for reaching out. Our team will review your message and get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6 text-left" noValidate>
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="font-sans font-semibold text-xs text-on-surface-variant uppercase tracking-wider block">
                        Full name
                      </label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => { setContactName(e.target.value); if (contactErrors.name) setContactErrors(prev => ({ ...prev, name: undefined })); }}
                        placeholder="Enter your full name"
                        className="w-full bg-[#fcfcfc] border border-outline-variant/20 rounded-xl px-5 py-4 focus:border-[#f15a24] focus:ring-1 focus:ring-[#f15a24] outline-none text-sm font-sans transition-all"
                      />
                      {contactErrors.name && (
                        <p className="text-xs text-red-600 font-medium">{contactErrors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="font-sans font-semibold text-xs text-on-surface-variant uppercase tracking-wider block">
                        Email
                      </label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => { setContactEmail(e.target.value); if (contactErrors.email) setContactErrors(prev => ({ ...prev, email: undefined })); }}
                        placeholder="hello@domain.com"
                        className="w-full bg-[#fcfcfc] border border-outline-variant/20 rounded-xl px-5 py-4 focus:border-[#f15a24] focus:ring-1 focus:ring-[#f15a24] outline-none text-sm font-sans transition-all"
                      />
                      {contactErrors.email && (
                        <p className="text-xs text-red-600 font-medium">{contactErrors.email}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="font-sans font-semibold text-xs text-on-surface-variant uppercase tracking-wider block">
                        Message
                      </label>
                      <textarea
                        value={contactMessage}
                        onChange={(e) => { setContactMessage(e.target.value); if (contactErrors.message) setContactErrors(prev => ({ ...prev, message: undefined })); }}
                        placeholder="Tell me about your goals or what you'd like help with..."
                        rows={4}
                        className="w-full bg-[#fcfcfc] border border-outline-variant/20 rounded-xl px-5 py-4 focus:border-[#f15a24] focus:ring-1 focus:ring-[#f15a24] outline-none text-sm font-sans resize-none transition-all"
                      />
                      {contactErrors.message && (
                        <p className="text-xs text-red-600 font-medium">{contactErrors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={contactSubmitting}
                      className="w-full bg-[#f15a24] hover:bg-[#e04b1a] active:scale-[0.99] text-white font-sans font-semibold text-sm py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-between group disabled:opacity-50 cursor-pointer shadow-md"
                    >
                      <span>{contactSubmitting ? "Sending..." : "Send Message"}</span>
                      <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="h-4 w-4 text-white" />
                      </div>
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 reveal transition-all duration-1000 ease-out">
          <div className="max-w-container-max mx-auto px-margin-desktop text-center">
            <h2 className="font-sans text-4xl md:text-5xl text-on-surface mb-8 font-bold">
              Ready to frame your next event?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/inquire"
                className="bg-primary text-on-primary font-sans font-semibold text-sm px-12 py-5 rounded-xl scale-100 hover:scale-[1.05] active:scale-95 duration-200 soft-lift transition-all inline-block text-center"
              >
                Create Event
              </Link>
              <Link
                href="/inquire"
                className="border-2 border-primary text-primary font-sans font-semibold text-sm px-12 py-5 rounded-xl hover:bg-primary/5 transition-colors inline-block text-center"
              >
                Speak with our team
              </Link>
            </div>
            <p className="font-sans text-xs text-on-surface-variant mt-8 opacity-60 uppercase tracking-[0.2em]">
              No credit card required to start
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
