import Image from "next/image";

export function KhasLogo({ size = 40 }: { size?: number }) {
  const border = Math.max(1.5, Math.round(size * 0.04));

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "transparent",
        border: `${border}px solid rgba(201,168,76,0.65)`,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <Image
        src="/logo2.jpg"
        alt="KhasCouture"
        width={size}
        height={size}
        style={{ objectFit: "cover", width: "100%", height: "100%", mixBlendMode: "screen" }}
      />
    </div>
  );
}
