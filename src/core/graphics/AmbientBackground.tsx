import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../theme";

export const AmbientBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();

  // Subtle floating motion for 3 glow orbs using sine/cosine
  const orb1X = Math.sin(frame / 45) * 80;
  const orb1Y = Math.cos(frame / 40) * 100;
  const orb1Scale = 1 + Math.sin(frame / 30) * 0.15;

  const orb2X = Math.cos(frame / 50) * 90;
  const orb2Y = Math.sin(frame / 35) * 110;
  const orb2Scale = 1 + Math.cos(frame / 25) * 0.12;

  const orb3X = Math.sin(frame / 30) * 60;
  const orb3Y = Math.cos(frame / 60) * 70;

  // Scanning light line that loops across the screen vertically
  const scanlineY = (frame * 6) % (height + 400) - 200;
  const scanlineOpacity = interpolate(
    scanlineY,
    [-200, height * 0.2, height * 0.8, height + 200],
    [0, 0.4, 0.4, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: THEME.colors.bg,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      {/* Subtle Matrix Dot Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px)`,
          backgroundSize: "36px 36px",
          opacity: 0.7,
        }}
      />

      {/* Glow Orb 1 - Cyan (Top Left / Center) */}
      <div
        style={{
          position: "absolute",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, transparent 70%)`,
          filter: "blur(60px)",
          top: "15%",
          left: "10%",
          transform: `translate(${orb1X}px, ${orb1Y}px) scale(${orb1Scale})`,
        }}
      />

      {/* Glow Orb 2 - Purple (Bottom Right) */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, transparent 70%)`,
          filter: "blur(70px)",
          top: "55%",
          right: "5%",
          transform: `translate(${orb2X}px, ${orb2Y}px) scale(${orb2Scale})`,
        }}
      />

      {/* Glow Orb 3 - Emerald (Center / Lower Center) */}
      <div
        style={{
          position: "absolute",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(16, 185, 129, 0.14) 0%, transparent 70%)`,
          filter: "blur(60px)",
          top: "38%",
          left: "35%",
          transform: `translate(${orb3X}px, ${orb3Y}px)`,
        }}
      />

      {/* Scanning Light Beam (Vertical Sweep) */}
      <div
        style={{
          position: "absolute",
          top: scanlineY,
          left: 0,
          width: "100%",
          height: "140px",
          background: `linear-gradient(180deg, transparent 0%, rgba(56, 189, 248, 0.08) 50%, transparent 100%)`,
          opacity: scanlineOpacity,
        }}
      />

      {/* Subtle Vignette Edge */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 140px rgba(0, 0, 0, 0.8)",
        }}
      />
    </div>
  );
};
