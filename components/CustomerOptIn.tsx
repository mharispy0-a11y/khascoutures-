"use client";

import { useState, useEffect } from "react";

const COOKIE_KEY = "kc_optin_shown";

export default function CustomerOptIn() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  useEffect(() => {
    if (document.cookie.includes(COOKIE_KEY)) return;
    const t = setTimeout(() => setShow(true), 30000);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    document.cookie = `${COOKIE_KEY}=1; path=/; max-age=${60 * 60 * 24 * 30}`;
    setShow(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email && !form.phone) return;
    setStatus("submitting");

    const utmSource = localStorage.getItem("utm_source") ?? "direct";
    const utmCampaign = localStorage.getItem("utm_campaign") ?? undefined;

    await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, source: utmSource, utm_campaign: utmCampaign }),
    });

    setStatus("done");
    document.cookie = `${COOKIE_KEY}=1; path=/; max-age=${60 * 60 * 24 * 30}`;
    setTimeout(dismiss, 2500);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[min(360px,calc(100vw-2rem))] shadow-2xl">
      <div className="bg-charcoal border border-gold/30 rounded-sm">
        <div className="flex items-start justify-between px-5 pt-5 pb-3">
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-body">Stay Connected</p>
            <p className="text-ivory font-display text-lg font-light mt-0.5" style={{ fontFamily: "var(--font-cormorant)" }}>
              New Collections & Exclusives
            </p>
          </div>
          <button onClick={dismiss} className="text-ivory/40 hover:text-ivory ml-3 mt-0.5 text-lg leading-none">×</button>
        </div>

        {status === "done" ? (
          <div className="px-5 pb-5 text-center">
            <p className="text-ivory/70 font-body text-sm py-4">Thank you! We&apos;ll be in touch. ✦</p>
          </div>
        ) : (
          <form onSubmit={submit} className="px-5 pb-5 space-y-3">
            <p className="text-ivory/50 font-body text-xs leading-relaxed">
              Share your details and we'll reach out about new collections and exclusive pieces.
            </p>
            <input
              type="text"
              placeholder="Your name (optional)"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="w-full bg-charcoal/50 border border-ivory/20 text-ivory placeholder-ivory/30 px-3 py-2 text-xs focus:outline-none focus:border-gold"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              className="w-full bg-charcoal/50 border border-ivory/20 text-ivory placeholder-ivory/30 px-3 py-2 text-xs focus:outline-none focus:border-gold"
            />
            <input
              type="tel"
              placeholder="Phone / WhatsApp"
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              className="w-full bg-charcoal/50 border border-ivory/20 text-ivory placeholder-ivory/30 px-3 py-2 text-xs focus:outline-none focus:border-gold"
            />
            <select
              value={form.interest}
              onChange={(e) => setForm((p) => ({ ...p, interest: e.target.value }))}
              className="w-full bg-charcoal/50 border border-ivory/20 text-ivory/70 px-3 py-2 text-xs focus:outline-none focus:border-gold"
            >
              <option value="">Interest (optional)</option>
              <option value="bridal">Bridal</option>
              <option value="party">Party Wear</option>
              <option value="pret">Pret & Casual</option>
              <option value="general">Just browsing</option>
            </select>
            <button
              type="submit"
              disabled={status === "submitting" || (!form.email && !form.phone)}
              className="w-full bg-gold hover:bg-gold-dark text-ivory py-2.5 text-xs tracking-[0.25em] uppercase font-body transition-colors disabled:opacity-50"
            >
              {status === "submitting" ? "…" : "Stay Connected"}
            </button>
            <button type="button" onClick={dismiss} className="w-full text-ivory/30 hover:text-ivory/50 text-xs font-body text-center transition-colors">
              No thanks
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
