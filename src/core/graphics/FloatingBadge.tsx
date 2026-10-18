import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../theme";

interface FloatingBadgeProps {
  icon: React.ReactNode;
  label?: string;
  variant?: "cyan" | "emerald" | "rose" | "amber" | "purple";
  style?: React.CSSProperties;
}

export const FloatingBadge: React.FC<FloatingBadgeProps> = ({
  icon,
  label,
  variant = "cyan",
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gentle float oscillation
  const floatY = Math.sin(frame / 20) * 12;
  const rotateTilt = Math.sin(frame / 25) * 6;

  // Entrance spring
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const getVariantColors = () => {
    switch (variant) {
      case "emerald":
        return {
          bg: "rgba(16, 185, 129, 0.15)",
          border: THEME.colors.accentEmerald,
          glow: "0 10px 30px rgba(16, 185, 129, 0.35)",
          text: THEME.colors.goodText,
        };
      case "rose":
        return {
          bg: "rgba(244, 63, 94, 0.15)",
          border: THEME.colors.accentRose,
          glow: "0 10px 30px rgba(244, 63, 94, 0.35)",
          text: THEME.colors.badText,
        };
      case "amber":
        return {
          bg: "rgba(251, 191, 36, 0.15)",
          border: THEME.colors.accentAmber,
          glow: "0 10px 30px rgba(251, 191, 36, 0.35)",
          text: THEME.colors.accentAmber,
        };
      case "purple":
        return {
          bg: "rgba(168, 85, 247, 0.15)",
          border: THEME.colors.accentPurple,
          glow: "0 10px 30px rgba(168, 85, 247, 0.35)",
          text: "#D8B4FE",
        };
      case "cyan":
      default:
        return {
          bg: "rgba(56, 189, 248, 0.15)",
          border: THEME.colors.accentCyan,
          glow: "0 10px 30px rgba(56, 189, 248, 0.35)",
          text: THEME.colors.tipText,
        };
    }
  };

  const colors = getVariantColors();

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 18px",
        borderRadius: "16px",
        backgroundColor: colors.bg,
        border: `1.5px solid ${colors.border}`,
        boxShadow: colors.glow,
        backdropFilter: "blur(10px)",
        transform: `translateY(${floatY + (1 - entrance) * 40}px) rotate(${rotateTilt}deg) scale(${entrance})`,
        opacity: entrance,
        ...style,
      }}
    >
      {icon}
      {label && (
        <span
          style={{
            fontFamily: THEME.fonts.sans,
            fontSize: "20px",
            fontWeight: 800,
            color: colors.text,
            letterSpacing: "0.04em",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};
