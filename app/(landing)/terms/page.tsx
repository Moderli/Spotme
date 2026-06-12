import type { Metadata } from "next";
import TermsClient from "./terms-client";

export const metadata: Metadata = {
  title: "Terms of Service | Spotme",
  description: "Read the terms and conditions for using Spotme's AI event photography software and services.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
