// Server Component wrapper — exports page-level metadata for SEO/GEO.
// All interactive form logic lives in contact-client.tsx.
import type { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Spotme — Book AI Event Photography in India",
  description:
    "Get in touch with the Spotme team to book AI-powered event photo delivery for your wedding, corporate event, birthday, or private celebration in India. Based in Hyderabad.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Spotme — Book AI Event Photography in India",
    description:
      "Contact the Spotme team to book instant AI photo delivery for your next event. No app needed. Serving weddings, corporate events & birthdays across India.",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
  keywords: [
    "contact Spotme India",
    "book AI event photographer Hyderabad",
    "wedding photo delivery booking",
    "event photography inquiry India",
  ],
};

export default function ContactPage() {
  return <ContactClient />;
}
