import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { appointmentSchema } from "@/lib/validations";
import { getServerClient } from "@/lib/supabase";

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // skip in dev if not configured
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      }
    );
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "0.0.0.0";
  const userAgent = req.headers.get("user-agent") ?? "";

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot check — silent pass for bots
  const raw = body as Record<string, unknown>;
  if (raw.honey) {
    return NextResponse.json(
      { success: true, message: "We'll contact you within 24 hours." },
      { status: 200 }
    );
  }

  const parsed = appointmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, phone, email, occasion, message, token } = parsed.data;

  const turnstileOk = await verifyTurnstile(token, ip);
  if (!turnstileOk) {
    return NextResponse.json(
      { error: "Bot verification failed. Please refresh and try again." },
      { status: 400 }
    );
  }

  let db;
  try {
    db = getServerClient();
  } catch {
    // DB not configured — log and fall through to email-only
    console.error("[appointments] Supabase not configured");
    db = null;
  }

  if (db) {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await db
      .from("appointments")
      .select("id", { count: "exact", head: true })
      .eq("ip_address", ip)
      .gte("created_at", oneHourAgo);

    if ((count ?? 0) >= 3) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const { error: insertErr } = await db.from("appointments").insert({
      name,
      phone,
      email: email || null,
      occasion,
      message: message || null,
      ip_address: ip,
      user_agent: userAgent,
    });

    if (insertErr) {
      console.error("[appointments] insert error:", insertErr.message);
      return NextResponse.json(
        { error: "Something went wrong. Please try WhatsApp or call us directly." },
        { status: 500 }
      );
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const resend = new Resend(resendKey);
    const adminEmail = process.env.ADMIN_EMAIL ?? "owner@khascoutures.pk";
    const occasionLabels: Record<string, string> = {
      bridal: "Bridal Wear",
      party: "Party / Formal Wear",
      pret: "Pret / Casual",
      custom: "Custom Order",
    };

    // Admin notification
    await resend.emails.send({
      from: "KhasCoutures <noreply@khascoutures.pk>",
      to: adminEmail,
      subject: `New Appointment Request — ${name} (${occasionLabels[occasion]})`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #C9A84C;">
          <h2 style="color:#2C2C2C;border-bottom:1px solid #C9A84C;padding-bottom:8px;">New Appointment Request</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#666;width:120px;">Name</td><td style="padding:8px 0;color:#2C2C2C;font-weight:bold;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#666;">Phone</td><td style="padding:8px 0;color:#2C2C2C;">${phone}</td></tr>
            ${email ? `<tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;color:#2C2C2C;">${email}</td></tr>` : ""}
            <tr><td style="padding:8px 0;color:#666;">Occasion</td><td style="padding:8px 0;color:#C9A84C;font-weight:bold;">${occasionLabels[occasion]}</td></tr>
            ${message ? `<tr><td style="padding:8px 0;color:#666;vertical-align:top;">Message</td><td style="padding:8px 0;color:#2C2C2C;">${message}</td></tr>` : ""}
          </table>
          <div style="margin-top:16px;">
            <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923001234567"}" style="background:#25D366;color:white;padding:10px 20px;text-decoration:none;display:inline-block;margin-right:8px;">Reply on WhatsApp</a>
            <a href="${process.env.NEXTAUTH_URL ?? ""}/admin/appointments" style="background:#C9A84C;color:white;padding:10px 20px;text-decoration:none;display:inline-block;">View in Admin</a>
          </div>
        </div>
      `,
    }).catch((e: Error) => console.error("[appointments] admin email error:", e.message));

    // Client confirmation (if email provided)
    if (email) {
      await resend.emails.send({
        from: "KhasCoutures <noreply@khascoutures.pk>",
        to: email,
        subject: "We received your appointment request — KhasCoutures",
        html: `
          <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #C9A84C;">
            <h2 style="color:#C9A84C;">Thank you, ${name}!</h2>
            <p style="color:#2C2C2C;line-height:1.6;">We have received your appointment request for <strong>${occasionLabels[occasion]}</strong> and will contact you within 24 hours.</p>
            <p style="color:#666;font-size:14px;">For urgent enquiries, please WhatsApp us directly.</p>
            <p style="color:#2C2C2C;font-style:italic;margin-top:24px;">KhasCoutures — Exquisite Couture Infused In Tradition</p>
          </div>
        `,
      }).catch((e: Error) => console.error("[appointments] client email error:", e.message));
    }
  }

  return NextResponse.json(
    { success: true, message: "We'll contact you within 24 hours." },
    { status: 200 }
  );
}
