"use client";

import Header from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import MobileNav from "@/components/landing/mobile-nav";

export default function PrivacyClient() {
  return (
    <div className="bg-background text-on-surface font-sans selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-grow pt-28 pb-20 bg-warm-bg/30">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold font-sans mb-3 text-primary tracking-tight">Privacy Policy</h1>
          <p className="text-xs font-semibold uppercase tracking-wider text-outline-variant/60 mb-12">
            Last updated: June 12, 2026
          </p>
          
          <div className="space-y-10 text-on-surface-variant leading-relaxed text-sm md:text-base">
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface font-sans">1. Introduction</h2>
              <p>
                Spotme ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and AI event photo delivery services (collectively, the "Service").
              </p>
            </section>
            
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface font-sans">2. Information We Collect</h2>
              <p>
                To provide our AI-powered photo delivery service, we collect the following categories of information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Event Photos:</strong> Uploaded by photographers or organizers. These photos are processed to match guest faces.</li>
                <li><strong>Selfies & Facial Data:</strong> When a guest uploads a selfie to find their photos, our system processes the image to extract facial feature vectors (biometric templates). These templates are compared against the event photos. The templates are stored temporarily and are not used for tracking outside the specific event context.</li>
                <li><strong>Contact Information:</strong> Phone numbers and email addresses provided during registration, event booking, or for receiving notifications.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with the Service, including IP address, browser type, and device info.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface font-sans">3. How We Process Biometric Data</h2>
              <p>
                Our AI-matching technology processes biometric facial templates solely to identify and deliver photos from the specific event you attended.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Facial recognition templates are computed using secure, standard open algorithms.</li>
                <li>We do not build cross-event databases or sell biometric information to third parties.</li>
                <li>Biometric templates are automatically deleted or deprecated after the event retention period (typically within 30 days to 1 year depending on the plan selected by the event organizer).</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface font-sans">4. Data Sharing & Security</h2>
              <p>
                We do not sell your personal data. We only share data with trusted cloud providers and message delivery services (such as Supabase and Twilio/WhatsApp APIs) necessary to run the Service. We implement strict administrative, technical, and physical security measures to protect your data from unauthorized access, modification, or deletion.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface font-sans">5. Your Rights</h2>
              <p>
                Depending on your location (including rights under the Indian Information Technology Act and GDPR), you may request access to, correction of, or deletion of your personal data, selfies, or event photos. To make a request, contact us at <a href="mailto:hello@spotme.in" className="text-primary hover:underline font-semibold">hello@spotme.in</a>.
              </p>
            </section>

            <section className="space-y-3 pb-8">
              <h2 className="text-xl md:text-2xl font-bold text-on-surface font-sans">6. Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15 text-sm font-sans mt-3">
                <strong className="text-on-surface">Spotme Base of Operations</strong><br />
                Bahadurpally, Hyderabad, Telangana, India<br />
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
