"use client";

import Header from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import MobileNav from "@/components/landing/mobile-nav";

export default function TermsClient() {
  return (
    <div className="bg-background text-on-surface font-sans selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-grow pt-28 pb-20 bg-warm-bg/30">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold font-sans mb-3 text-primary tracking-tight">Terms of Service</h1>
          <p className="text-xs font-semibold uppercase tracking-wider text-outline-variant/60 mb-12">
            Last updated: June 12, 2026
          </p>
          
          <div className="space-y-10 text-on-surface-variant leading-relaxed text-sm md:text-base">
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface font-sans">1. Acceptance of Terms</h2>
              <p>
                By creating an account, booking an event, or accessing event photo galleries via Spotme ("Service," "we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
              </p>
            </section>
            
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface font-sans">2. Description of Service</h2>
              <p>
                Spotme provides an AI-powered SaaS application for photographers and event organizers to distribute photos to guests using facial recognition. Guests scan a custom QR code and upload a selfie to access event photos matching their face.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface font-sans">3. Accounts & Security</h2>
              <p>
                Photographers and event hosts must create an account to access the control panel, manage event tokens, and view billing details. You are responsible for safeguarding your account details and password. You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface font-sans">4. Uploaded Content & Media License</h2>
              <p>
                As a photographer or event organizer:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You assert that you possess the necessary permissions, copyrights, or model releases for all photos uploaded to the Service.</li>
                <li>You grant Spotme a non-exclusive, worldwide, royalty-free license to store, process, resize, and display photos solely to execute the AI photo-matching and delivery flow for your event.</li>
                <li>We do not claim ownership of uploaded photos, and we do not use your event photos for marketing or training purposes without your explicit consent.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface font-sans">5. Guest Selfie Upload & Privacy</h2>
              <p>
                Guests uploading selfies to match with event photos agree that the uploaded selfie will be processed temporarily to extract unique facial markers. Selfie data is processed securely and is subject to our Privacy Policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface font-sans">6. Acceptable Use Policy</h2>
              <p>
                You agree not to use the Service to upload, share, or process content that is unlawful, obscene, defamatory, harassing, or infringes on any intellectual property or privacy rights. Spotme reserves the right to terminate accounts or suspend events that violate this policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface font-sans">7. Payment, Billing, & Subscriptions</h2>
              <p>
                Subscriptions are billed on a recurring monthly basis. Standard transaction and processing fees are handled via our payment aggregator (e.g., Razorpay). Prices are subject to change, but we will notify you in advance of any rate changes.
              </p>
            </section>

            <section className="space-y-3 pb-8">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface font-sans">8. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Spotme shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill resulting from your use or inability to use the Service.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
