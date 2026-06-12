import type { Metadata } from "next";
import RefundClient from "./refund-client";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Spotme",
  description: "Read the refund, cancellation, and transaction policy for subscriptions and event credits on Spotme.",
  alternates: {
    canonical: "/refund",
  },
};

export default function RefundPage() {
  return <RefundClient />;
}
