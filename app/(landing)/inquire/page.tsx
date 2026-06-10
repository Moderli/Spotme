// Server Component wrapper — exports page-level metadata for SEO/GEO.
// All interactive form logic lives in inquire-client.tsx.
import type { Metadata } from "next";
import InquireClient from "./inquire-client";

export const metadata: Metadata = {
  title: "Book Spotme for Your Event — AI Photo Delivery Inquiry",
  description:
    "Submit an inquiry to book Spotme for your wedding, corporate event, birthday party, or celebration in India. Share your event details and we'll get back to you within 24 hours.",
  alternates: {
    canonical: "/inquire",
  },
  openGraph: {
    title: "Book Spotme for Your Event — AI Photo Delivery Inquiry",
    description:
      "Ready to have instant AI-powered photo delivery at your event? Submit an inquiry and our team will get back to you within 24 hours.",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
  keywords: [
    "book Spotme event photography India",
    "AI event photo inquiry",
    "wedding photography AI booking",
    "instant photo delivery event booking",
  ],
};

export default function InquirePage() {
  return <InquireClient />;
}
