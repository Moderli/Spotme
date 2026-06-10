// This is a Server Component wrapper. It exports page-level metadata
// for SEO (title, description, canonical URL, OpenGraph) while delegating
// the interactive UI to the PricingClient component below.
// Next.js App Router resolves metadata from the nearest server component.

import type { Metadata } from "next";
import PricingClient from "./pricing-client";

export const metadata: Metadata = {
  title: "Pricing — Plans for Every Event Photographer in India",
  description:
    "Simple, transparent pricing for Spotme's AI event photo delivery platform. Free plan available. Plans for solo photographers (₹499/mo), studios (₹699–₹1,599/mo), and enterprise. No per-guest fees. Cancel anytime.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Spotme Pricing — Plans for Every Event Photographer",
    description:
      "AI event photo delivery starting at ₹0. Free plan, Personal Pro (₹999/mo), Studio Pro (₹1,599/mo). Unlimited guests on all plans. Cancel anytime.",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
  keywords: [
    "event photo software pricing India",
    "AI photo gallery plans",
    "wedding photographer software price",
    "Spotme pricing",
    "affordable event photography tools",
  ],
};

// Pricing JSON-LD — helps Google show rich results with pricing info
const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does Spotme's AI photo matching work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Guests scan the event QR code, upload a selfie, and Spotme's AI (InsightFace ArcFace) automatically finds all event photos featuring their face — with no manual tagging needed. Results are delivered within seconds.",
      },
    },
    {
      "@type": "Question",
      name: "Do guests need an account or app to use Spotme?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Guests access event photos using the event QR code and a phone number verification. Zero app download or account required.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a per-event fee or per-guest fee?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All Spotme plans are flat monthly subscriptions — no per-event or per-guest charges. All plans include unlimited guests.",
      },
    },
    {
      "@type": "Question",
      name: "What is Privacy Mode on Spotme?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When Privacy Mode is on, the general event gallery is hidden. Guests can only see photos of themselves after uploading their selfie — ideal for weddings and private events.",
      },
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricingJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PricingClient />
    </>
  );
}
