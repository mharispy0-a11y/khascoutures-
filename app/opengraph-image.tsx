import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KhasCouture — Exquisite Couture Infused In Tradition";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2C2220 0%, #3D2B1F 40%, #4A3526 70%, #2C2220 100%)",
          position: "relative",
        }}
      >
        {/* Gold border frame */}
        <div style={{ position: "absolute", top: 32, left: 32, right: 32, bottom: 32, border: "1px solid rgba(201,168,76,0.4)", display: "flex" }} />

        {/* Radial accent */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.15) 0%, transparent 60%)",
          display: "flex",
        }} />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, position: "relative" }}>
          {/* Brand name */}
          <div style={{ display: "flex", gap: 0 }}>
            <span style={{ fontSize: 80, fontWeight: 300, color: "#FAF6F0", letterSpacing: 2, lineHeight: 1 }}>Khas</span>
            <span style={{ fontSize: 80, fontWeight: 600, color: "#C9A84C", letterSpacing: 2, lineHeight: 1, fontStyle: "italic" }}>Coutures</span>
          </div>

          {/* Ornamental line */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, width: 320 }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />
            <span style={{ color: "#C9A84C", fontSize: 18 }}>✦</span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />
          </div>

          {/* Tagline */}
          <span style={{ fontSize: 22, color: "rgba(250,246,240,0.65)", letterSpacing: 6, fontStyle: "italic" }}>
            Exquisite Couture Infused In Tradition
          </span>

          {/* Location */}
          <span style={{ fontSize: 14, color: "rgba(201,168,76,0.7)", letterSpacing: 8, marginTop: 8 }}>
            RAWALPINDI · PAKISTAN
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
