import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | KhasCoutures",
  description: "How KhasCoutures collects, uses, and protects your personal information.",
};

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "owner@khascoutures.pk";

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24">
      <div className="bg-charcoal py-16 px-6 text-center relative overflow-hidden">
        <p className="text-gold text-xs tracking-[0.4em] uppercase font-body mb-3 relative z-10">Legal</p>
        <h1
          className="font-display text-4xl md:text-5xl text-ivory font-light relative z-10"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Privacy Policy
        </h1>
      </div>

      <div className="bg-ivory py-16 px-6">
        <div className="max-w-3xl mx-auto prose prose-sm font-body text-charcoal/75 space-y-8">
          <p className="text-charcoal/50 text-xs">Last updated: {new Date().getFullYear()}</p>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-charcoal font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
              What Data We Collect
            </h2>
            <p>When you submit an appointment request through our website, we collect:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Your name</li>
              <li>Your phone number</li>
              <li>Your email address (optional)</li>
              <li>The occasion type you selected</li>
              <li>Any message you choose to include</li>
            </ul>
            <p>We also automatically record your IP address and browser type for security and spam prevention purposes only.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-charcoal font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
              How We Use Your Data
            </h2>
            <p>Your information is used <strong>only</strong> to:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Process and respond to your appointment request</li>
              <li>Contact you about your enquiry via phone, WhatsApp, or email</li>
              <li>Send you a confirmation email (if you provided an email address)</li>
            </ul>
            <p>We do not use your data for marketing, advertising, or any other purpose.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-charcoal font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
              Data Sharing
            </h2>
            <p>We do <strong>not</strong> sell, rent, or share your personal data with any third parties, except:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Our email service provider (Resend), solely to deliver your confirmation email</li>
              <li>Our database provider (Supabase), where your appointment data is stored securely</li>
            </ul>
            <p>Both providers are bound by their own privacy policies and applicable data protection law.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-charcoal font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
              Data Retention
            </h2>
            <p>Appointment records are retained for up to 12 months for business record-keeping purposes, after which they are deleted.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-charcoal font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
              Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Request a copy of your data</li>
              <li>Request that your data be corrected or deleted</li>
            </ul>
            <p>
              To exercise these rights, contact us at{" "}
              <a href={`mailto:${ADMIN_EMAIL}`} className="text-gold hover:underline">{ADMIN_EMAIL}</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-charcoal font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
              Cookies
            </h2>
            <p>This website does not use tracking cookies. We use a session cookie only for the admin area (login persistence) and a Cloudflare security challenge for our contact form. Neither is used for advertising.</p>
          </section>

          <div className="pt-4 border-t border-gold/20">
            <Link href="/contact" className="text-gold text-sm hover:underline font-body">
              ← Return to Contact page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
