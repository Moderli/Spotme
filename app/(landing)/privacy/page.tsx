import type { Metadata } from "next";
import PrivacyClient from "./privacy-client";

export const metadata: Metadata = {
  title: "Privacy Policy | Spotme",
  description: "Learn about how Spotme collects, uses, and protects your personal data and event photos.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
