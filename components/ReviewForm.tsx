"use client";

import { useState } from "react";

export default function ReviewForm() {
  const [form, setForm] = useState({ name: "", role: "", content: "", rating: 5 });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function set(k: string, v: string | number) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.content.trim()) return;
    setStatus("submitting");
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div className="max-w-xl mx-auto text-center py-10">
        <div className="text-gold text-3xl mb-4">✦</div>
        <p className="text-charcoal font-display text-xl italic" style={{ fontFamily: "var(--font-cormorant)" }}>
          Thank you for your kind words.
        </p>
        <p className="text-charcoal/50 font-body text-sm mt-2">
          Your review has been submitted and will appear after approval.
        </p>
      </div>
    );
  }

  return (
    <section className="py-20 px-6 bg-ivory border-t border-gold/10">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-body mb-3">Share Your Experience</p>
          <h2
            className="font-display text-3xl text-charcoal font-light"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Leave a Review
          </h2>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-charcoal/60 font-body uppercase tracking-wider mb-1.5">Your Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className="w-full border border-gold/30 bg-warm-white px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold"
                placeholder="Ayesha Khan"
              />
            </div>
            <div>
              <label className="block text-xs text-charcoal/60 font-body uppercase tracking-wider mb-1.5">Occasion (optional)</label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => set("role", e.target.value)}
                className="w-full border border-gold/30 bg-warm-white px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold"
                placeholder="Bride, January 2025"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-charcoal/60 font-body uppercase tracking-wider mb-1.5">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => set("rating", n)}
                  className={`text-2xl transition-colors ${n <= form.rating ? "text-gold" : "text-gold/20"}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-charcoal/60 font-body uppercase tracking-wider mb-1.5">Your Review *</label>
            <textarea
              required
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              rows={4}
              maxLength={1000}
              className="w-full border border-gold/30 bg-warm-white px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold resize-none"
              placeholder="Share your experience with KhasCouture…"
            />
            <p className="text-xs text-charcoal/30 mt-1 text-right">{form.content.length}/1000</p>
          </div>

          {status === "error" && (
            <p className="text-red-500 text-xs font-body">Something went wrong. Please try again.</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-charcoal hover:bg-charcoal/90 text-ivory py-3 text-xs tracking-[0.3em] uppercase font-body transition-colors disabled:opacity-60"
          >
            {status === "submitting" ? "Submitting…" : "Submit Review"}
          </button>
        </form>
      </div>
    </section>
  );
}
