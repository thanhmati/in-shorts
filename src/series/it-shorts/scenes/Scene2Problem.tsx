import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  AlertOctagon,
  AlertTriangle,
  Bug,
  Shuffle,
  Unlink,
  ZapOff,
} from "lucide-react";

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  // Chaos alert shake & glitch oscillation
  const shakeX = Math.sin(frame * 0.9) * Math.max(0, 6 - frame * 0.05);
  const shakeY = Math.cos(frame * 1.1) * Math.max(0, 4 - frame * 0.05);
  const pulseAlert = 1 + Math.sin(frame / 4) * 0.05;

  // Staggered springs for floating warning badges
  const badge1Spring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 9, stiffness: 160 },
  });

  const badge2Spring = spring({
    frame: Math.max(0, frame - 25),
    fps,
    config: { damping: 9, stiffness: 160 },
  });

  const badge3Spring = spring({
    frame: Math.max(0, frame - 40),
    fps,
    config: { damping: 9, stiffness: 160 },
  });

  // Particle explosion / floating hazard orbs
  const hazardOrb1Y = Math.sin(frame / 8) * 15;
  const hazardOrb2Y = Math.cos(frame / 9) * 18;

  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "36px",
        boxSizing: "border-box",
        transform: `scale(${entrance}) translate(${shakeX}px, ${shakeY}px)`,
        opacity: entrance,
        position: "relative",
      }}
    >
      {/* 1. Header Alert Pill */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "12px",
          padding: "10px 30px",
          borderRadius: "999px",
          backgroundColor: "rgba(244, 63, 94, 0.2)",
          border: "2.5px solid #F43F5E",
          boxShadow: "0 0 35px rgba(244, 63, 94, 0.5)",
        }}
      >
        <AlertTriangle size={28} color="#F43F5E" />
        <span
          style={{
            color: "#F43F5E",
            fontSize: "24px",
            fontWeight: 950,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          ANTI-PATTERN
        </span>
      </div>

      {/* 2. Main High-Impact Title */}
      <div style={{ textAlign: "center" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "56px",
            fontWeight: 950,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          DÙNG SAI VỊ TRÍ ={" "}
          <span
            style={{
              color: "#F43F5E",
              textShadow: "0 0 30px rgba(244, 63, 94, 0.8)",
            }}
          >
            MẤT KIỂM SOÁT!
          </span>
        </h2>
      </div>

      {/* 3. Central Motion Graphic: The Fractured Request Pipeline */}
      <div
        style={{
          width: "100%",
          maxWidth: "920px",
          height: "440px",
          borderRadius: "32px",
          backgroundColor: "rgba(17, 24, 39, 0.94)",
          border: "3px solid rgba(244, 63, 94, 0.5)",
          boxShadow:
            "0 25px 60px rgba(0,0,0,0.85), inset 0 0 40px rgba(244, 63, 94, 0.25)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Animated Tangled Laser Paths (SVG) */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {/* Jagged / broken path 1 */}
          <path
            d="M 80 220 L 280 120 L 450 320 L 680 160 L 840 220"
            fill="none"
            stroke="#F43F5E"
            strokeWidth="4"
            strokeDasharray="12 8"
            opacity="0.6"
          />
          {/* Loop of confusion */}
          <circle
            cx="450"
            cy="220"
            r="80"
            fill="none"
            stroke="rgba(245, 158, 11, 0.5)"
            strokeWidth="3"
            strokeDasharray="8 6"
          />
        </svg>

        {/* Central Glitching Hazard Core */}
        <div
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "999px",
            backgroundColor: "rgba(244, 63, 94, 0.25)",
            border: "3px solid #F43F5E",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 50px rgba(244, 63, 94, 0.7)",
            transform: `scale(${pulseAlert})`,
            zIndex: 10,
          }}
        >
          <Shuffle size={64} color="#F43F5E" />
        </div>

        {/* Floating Warning Badge 1 (Top-Left) */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "50px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 24px",
            borderRadius: "16px",
            backgroundColor: "rgba(244, 63, 94, 0.25)",
            border: "2px solid #F43F5E",
            boxShadow: "0 10px 25px rgba(244, 63, 94, 0.4)",
            transform: `scale(${badge1Spring}) translateY(${hazardOrb1Y}px)`,
            opacity: badge1Spring,
            zIndex: 20,
          }}
        >
          <Unlink size={26} color="#F43F5E" />
          <span style={{ fontSize: "24px", fontWeight: 950, color: "#FFFFFF" }}>
            MẤT DI CONTEXT ❌
          </span>
        </div>

        {/* Floating Warning Badge 2 (Bottom-Left) */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "70px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 24px",
            borderRadius: "16px",
            backgroundColor: "rgba(245, 158, 11, 0.25)",
            border: "2px solid #F59E0B",
            boxShadow: "0 10px 25px rgba(245, 158, 11, 0.4)",
            transform: `scale(${badge2Spring}) translateY(${hazardOrb2Y}px)`,
            opacity: badge2Spring,
            zIndex: 20,
          }}
        >
          <Bug size={26} color="#F59E0B" />
          <span style={{ fontSize: "24px", fontWeight: 950, color: "#FFFFFF" }}>
            KHÓ DEBUG & MAINTAIN 🐛
          </span>
        </div>

        {/* Floating Warning Badge 3 (Right) */}
        <div
          style={{
            position: "absolute",
            top: "140px",
            right: "50px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 24px",
            borderRadius: "16px",
            backgroundColor: "rgba(239, 68, 68, 0.25)",
            border: "2px solid #EF4444",
            boxShadow: "0 10px 25px rgba(239, 68, 68, 0.4)",
            transform: `scale(${badge3Spring}) translateY(${-hazardOrb1Y}px)`,
            opacity: badge3Spring,
            zIndex: 20,
          }}
        >
          <ZapOff size={26} color="#EF4444" />
          <span style={{ fontSize: "24px", fontWeight: 950, color: "#FFFFFF" }}>
            LỌT LỖI BẢO MẬT ⚠️
          </span>
        </div>
      </div>

      {/* 4. Bottom Dramatic Callout */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          padding: "16px 36px",
          borderRadius: "999px",
          backgroundColor: "rgba(244, 63, 94, 0.15)",
          border: "2px solid rgba(244, 63, 94, 0.4)",
          transform: `scale(${pulseAlert})`,
        }}
      >
        <AlertOctagon size={32} color="#F43F5E" />
        <span
          style={{
            fontSize: "28px",
            fontWeight: 950,
            color: "#FFFFFF",
            letterSpacing: "0.02em",
          }}
        >
          XEM THỨ TỰ CHUẨN NGAY DƯỚI ĐÂY 👇
        </span>
      </div>
    </div>
  );
};
