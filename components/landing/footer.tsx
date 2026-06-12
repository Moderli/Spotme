import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      setTime(new Date().toLocaleTimeString("en-US", options));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const polaroids = [
    { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=150&auto=format&fit=crop", rot: "-rotate-6", offset: "translate-y-2" },
    { src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=150&auto=format&fit=crop", rot: "rotate-3", offset: "-translate-y-1" },
    { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=150&auto=format&fit=crop", rot: "-rotate-3", offset: "translate-y-4" },
    { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=150&auto=format&fit=crop", rot: "rotate-6", offset: "-translate-y-2" },
    { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=150&auto=format&fit=crop", rot: "-rotate-2", offset: "translate-y-1" },
    { src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=150&auto=format&fit=crop", rot: "rotate-3", offset: "translate-y-3" },
  ];

  return (
    <footer className="bg-[#0b0a08] text-white pt-24 pb-12 overflow-hidden relative border-t border-outline-variant/10">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Upper Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Left: Heading & Location */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-outline-variant/60 flex items-center gap-2 mb-6 select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
              HYDERABAD, IN {time ? `• ${time}` : ""}
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-white max-w-xl leading-tight">
              Ready to deliver magic at your next event?
            </h2>
          </div>

          {/* Right: Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8 text-left">
            {/* Explore column */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-outline-variant/50 mb-6 block">
                (EXPLORE)
              </span>
              <ul className="space-y-4 font-sans text-sm font-medium">
                <li>
                  <Link href="/" className="text-white/70 hover:text-white transition-colors">
                    HOME
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="text-white/70 hover:text-white transition-colors">
                    PRICING
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-white/70 hover:text-white transition-colors">
                    CONTACT
                  </Link>
                </li>
                <li>
                  <Link href="/inquire" className="text-white/70 hover:text-white transition-colors">
                    INQUIRE
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal column */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-outline-variant/50 mb-6 block">
                (LEGAL)
              </span>
              <ul className="space-y-4 font-sans text-sm font-medium">
                <li>
                  <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
                    PRIVACY
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
                    TERMS
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="text-white/70 hover:text-white transition-colors">
                    REFUND
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact column */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-outline-variant/50 mb-6 block">
                (CONTACT)
              </span>
              <ul className="space-y-4 font-sans text-sm font-medium">
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1">
                    LINKEDIN <span className="text-[10px]">↗</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@spotme.in" className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1">
                    EMAIL <span className="text-[10px]">↗</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Polaroid Scattered Gallery (Bottom) */}
        <div className="relative w-full h-44 flex items-center justify-center gap-4 sm:gap-6 md:gap-8 overflow-visible mt-12 mb-16 select-none opacity-90">
          {polaroids.map((card, i) => (
            <div
              key={i}
              className={`flex-shrink-0 w-24 sm:w-28 bg-white p-1.5 pb-4 rounded-sm shadow-xl transition-transform duration-500 hover:scale-110 hover:-translate-y-4 z-10 ${card.rot} ${card.offset} border border-black/5`}
            >
              <div className="aspect-square w-full overflow-hidden bg-surface-container-high relative">
                <img
                  src={card.src}
                  alt={`Memory ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Copy & Footer Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-xs text-outline-variant/40">
          <p>&copy; {new Date().getFullYear()} Spotme. All rights reserved.</p>
          <p className="hover:text-white/60 transition-colors cursor-pointer select-none">
            Designed for Emotional Connection
          </p>
        </div>

      </div>
    </footer>
  );
}
