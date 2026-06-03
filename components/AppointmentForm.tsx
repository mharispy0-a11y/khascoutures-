"use client";

import { useState, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

type FieldErrors = Partial<Record<string, string[]>>;

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";

const inputClass =
  "w-full border border-gold/20 bg-ivory px-4 py-3 text-sm font-body text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-gold transition-colors aria-[invalid=true]:border-red-400";
const labelClass =
  "block text-charcoal/60 text-xs tracking-wider uppercase font-body mb-1.5";

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-red-500 text-xs font-body">{errors[0]}</p>;
}

export default function AppointmentForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [token, setToken] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) {
      setApiError("Please complete the bot verification.");
      return;
    }
    setLoading(true);
    setApiError("");
    setFieldErrors({});

    const fd = new FormData(e.currentTarget);
    const body = {
      name: fd.get("name") as string,
      phone: fd.get("phone") as string,
      email: fd.get("email") as string,
      occasion: fd.get("occasion") as string,
      message: fd.get("message") as string,
      honey: fd.get("_honey") as string,
      token,
    };

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as {
        success?: boolean;
        error?: string;
        details?: FieldErrors;
      };

      if (res.ok && data.success) {
        setSuccess(true);
        formRef.current?.reset();
        setToken("");
      } else if (res.status === 400 && data.details) {
        setFieldErrors(data.details);
      } else {
        setApiError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="border border-gold/20 p-8 bg-warm-white text-center space-y-3">
        <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto">
          <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h4
          className="font-display text-xl text-charcoal font-light"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Request Received
        </h4>
        <p className="text-charcoal/60 font-body text-sm leading-relaxed">
          Thank you! We&apos;ll be in touch within 24 hours.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-gold text-xs font-body tracking-wider uppercase hover:underline mt-2"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div className="border border-gold/20 p-6 bg-warm-white">
      <h3
        className="font-display text-2xl text-charcoal font-light mb-1"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Request Appointment
      </h3>
      <p className="text-charcoal/50 font-body text-xs mb-5">
        Your details are only used to process your appointment request and will not be shared with third parties.
      </p>

      {apiError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm font-body rounded">
          {apiError}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot — hidden from real users */}
        <input
          type="text"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ display: "none" }}
        />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="appt-name" className={labelClass}>
              Name <span className="text-red-400">*</span>
            </label>
            <input
              id="appt-name"
              type="text"
              name="name"
              required
              aria-required="true"
              aria-invalid={!!fieldErrors.name}
              autoComplete="name"
              className={inputClass}
              placeholder="Your name"
            />
            <FieldError errors={fieldErrors.name} />
          </div>
          <div>
            <label htmlFor="appt-phone" className={labelClass}>
              Phone <span className="text-red-400">*</span>
            </label>
            <input
              id="appt-phone"
              type="tel"
              name="phone"
              required
              aria-required="true"
              aria-invalid={!!fieldErrors.phone}
              autoComplete="tel"
              className={inputClass}
              placeholder="+92 300 XXXXXXX"
            />
            <FieldError errors={fieldErrors.phone} />
          </div>
        </div>

        <div>
          <label htmlFor="appt-email" className={labelClass}>
            Email <span className="text-charcoal/30 normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="appt-email"
            type="email"
            name="email"
            aria-invalid={!!fieldErrors.email}
            autoComplete="email"
            className={inputClass}
            placeholder="For confirmation email"
          />
          <FieldError errors={fieldErrors.email} />
        </div>

        <div>
          <label htmlFor="appt-occasion" className={labelClass}>
            Occasion <span className="text-red-400">*</span>
          </label>
          <select
            id="appt-occasion"
            name="occasion"
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.occasion}
            className={inputClass}
          >
            <option value="">Select occasion</option>
            <option value="bridal">Bridal Wear</option>
            <option value="party">Party / Formal Wear</option>
            <option value="pret">Pret / Casual</option>
            <option value="custom">Custom Order</option>
          </select>
          <FieldError errors={fieldErrors.occasion} />
        </div>

        <div>
          <label htmlFor="appt-message" className={labelClass}>
            Message
          </label>
          <textarea
            id="appt-message"
            name="message"
            rows={3}
            aria-invalid={!!fieldErrors.message}
            className={inputClass}
            placeholder="Tell us about your requirements..."
          />
          <FieldError errors={fieldErrors.message} />
        </div>

        <div>
          <Turnstile
            siteKey={SITE_KEY}
            onSuccess={(t) => setToken(t)}
            onError={() => setApiError("Bot protection failed. Please refresh the page.")}
            onExpire={() => setToken("")}
            options={{ theme: "light", size: "normal" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !token}
          className="w-full bg-gold hover:bg-gold-dark disabled:opacity-60 disabled:cursor-not-allowed text-ivory py-4 text-xs tracking-[0.3em] uppercase font-body font-medium transition-all duration-300 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Sending…
            </>
          ) : (
            "Send Request"
          )}
        </button>
      </form>
    </div>
  );
}
