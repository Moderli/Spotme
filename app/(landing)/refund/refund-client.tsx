"use client";

import Header from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import MobileNav from "@/components/landing/mobile-nav";

export default function RefundClient() {
  return (
    <div className="bg-background text-on-surface font-sans selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-grow pt-28 pb-20 bg-warm-bg/30">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold font-sans mb-3 text-primary tracking-tight">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-xs font-semibold uppercase tracking-wider text-outline-variant/60 mb-12">
            Last updated: June 12, 2026
          </p>
          
          <div className="space-y-10 text-on-surface-variant leading-relaxed text-sm md:text-base">
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface font-sans">1. Overview</h2>
              <p>
                At Spotme, we strive to deliver high-quality, instant AI photo matching for events. Because we offer a digital subscription and event token service, this policy outlines the terms under which cancellations and refunds are processed.
              </p>
            </section>
            
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface font-sans">2. Subscription Cancellation</h2>
              <p>
                You can cancel your Spotme subscription (Starter, Pro, Studio, or Enterprise) at any time. 
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cancellations can be made directly through your Account Billing settings or by emailing <a href="mailto:hello@spotme.in" className="text-primary hover:underline font-semibold">hello@spotme.in</a>.</li>
                <li>Upon cancellation, your subscription will remain active until the end of your current paid billing cycle. No further recurring payments will be charged.</li>
                <li>We do not offer pro-rated refunds for unused days within a billing cycle.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface font-sans">3. Refund Eligibility</h2>
              <p>
                Refunds are assessed on a case-by-case basis. You may be eligible for a refund if:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You were charged twice due to a billing system error (duplicate transaction).</li>
                <li>The Service experienced a severe, prolonged system outage during your registered live event time, preventing photo upload or matching, and our support team could not resolve it.</li>
              </ul>
              <p className="mt-2">
                Refunds are <strong>not</strong> issued for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Change of mind or cancellation of the event after the event tokens or subscription storage has been actively consumed.</li>
                <li>Poor quality of photos uploaded by the photographer or poor guest selfies which impact matching rates.</li>
                <li>Failing to utilize the event tokens during the validity period.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface font-sans">4. Refund Processing Time</h2>
              <p>
                Approved refunds will be processed using the original payment method (via Razorpay or bank transfer). 
              </p>
              <p>
                Once processed, the funds typically appear in your account within <strong>5 to 7 working days</strong>, depending on your bank or card issuer.
              </p>
            </section>

            <section className="space-y-3 pb-8">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface font-sans">5. Contact Support & Disputes</h2>
              <p>
                If you believe you have been incorrectly charged or have questions regarding a recent payment, please submit a request containing your Transaction ID and email:
              </p>
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15 text-sm font-sans mt-3">
                <strong className="text-on-surface">Spotme Billing Support</strong><br />
                Email: <a href="mailto:hello@spotme.in" className="text-primary hover:underline font-semibold">hello@spotme.in</a><br />
                Phone: +91 89198 85401
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
