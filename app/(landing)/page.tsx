// Server Component — exports page-level metadata for SEO/GEO.
// All interactive UI lives in home-client.tsx (a "use client" component).
// This split is required by Next.js App Router: metadata can only be exported
// from Server Components, not from "use client" files.

import type { Metadata } from "next";
import HomeClient from "./home-client";

export const metadata: Metadata = {
  title: "Spotme — AI Event Photo Delivery for Weddings & Events in India",
  description:
    "Spotme uses AI facial recognition to instantly match & deliver event photos to every guest via a QR code selfie. No app downloads. Works for weddings, corporate events, birthdays & parties across India.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Spotme — AI Event Photo Delivery for Weddings & Events in India",
    description:
      "Guests scan a QR code, take a selfie, and instantly get their private high-res event photos. No app required. Powered by AI face recognition. Based in Hyderabad, India.",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
  keywords: [
    "AI event photo delivery India",
    "instant wedding photo sharing",
    "QR code event gallery",
    "AI face recognition event photography",
    "event photographer tools India",
    "private photo sharing wedding",
    "selfie photo matching event",
  ],
};

// FAQ JSON-LD for Google Featured Snippets and GEO (AI engine citations).
// Must live in a Server Component so it renders in the initial HTML.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does Spotme deliver event photos instantly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Spotme uses AI facial recognition (ArcFace / InsightFace). Guests scan a QR code at the event, upload a quick selfie, and our AI instantly matches them to photos in the event gallery. They receive a private, high-resolution photo gallery within seconds — no app download required.",
      },
    },
    {
      "@type": "Question",
      name: "Do guests need to download an app to use Spotme?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Spotme is entirely web-based. Guests simply scan a QR code with their phone camera and upload a selfie — no app download, no login, no friction. It works on any modern smartphone browser.",
      },
    },
    {
      "@type": "Question",
      name: "Is Spotme safe and private for event guests?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Each guest only receives access to photos they appear in. Event galleries are private and end-to-end encrypted. No photo is shared without AI confirmation of a face match.",
      },
    },
    {
      "@type": "Question",
      name: "What events does Spotme work for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Spotme works for any event with a professional photographer including weddings, corporate events, birthday parties, concerts, award ceremonies, family reunions, and parties. It is especially popular for large Indian weddings with hundreds of guests.",
      },
    },
    {
      "@type": "Question",
      name: "How does AI face recognition work for event photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Spotme uses InsightFace ArcFace — the same state-of-the-art deep learning model used in professional identity systems. When a guest uploads a selfie, the AI generates a facial embedding (a mathematical fingerprint of their face) and compares it to all photos in the event gallery, returning only the photos where the guest appears.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      {/* FAQ structured data — rendered in SSR HTML for Google & AI engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HomeClient />
    </>
  );
}
