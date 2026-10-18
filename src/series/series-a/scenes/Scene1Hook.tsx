import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AlertTriangle, Flame } from "lucide-react";
import { THEME } from "../../../core/theme";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  // Dramatic alarm pulse
  const alarmPulse = 1 + Math.sin(frame / 4) * 0.08;
  const glowPulse = 0.5 + 0.5 * Math.sin(frame / 4);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        transform: `scale(${entrance})`,
        opacity: entrance,
        padding: "0 20px",
      }}
    >
      {/* Warning Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 28px",
          borderRadius: "999px",
          backgroundColor: "rgba(244, 63, 94, 0.18)",
          border: `2px solid ${THEME.colors.accentRose}`,
          boxShadow: `0 0 ${20 * glowPulse}px rgba(244, 63, 94, 0.6)`,
          marginBottom: "36px",
          transform: `scale(${alarmPulse})`,
        }}
      >
        <Flame size={32} color={THEME.colors.accentRose} />
        <span
          style={{
            color: THEME.colors.accentRose,
            fontWeight: 900,
            fontSize: "26px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          CẢNH BÁO HIỆU NĂNG REACT
        </span>
      </div>

      {/* Massive Hook Headline 1 */}
      <h1
        style={{
          fontSize: "66px",
          fontWeight: 950,
          lineHeight: 1.15,
          color: THEME.colors.textPrimary,
          margin: 0,
          letterSpacing: "-0.03em",
          textShadow: "0 8px 30px rgba(0, 0, 0, 0.9)",
        }}
      >
        90% LẬP TRÌNH VIÊN
      </h1>

      {/* Massive Hook Headline 2 with Neon Glow */}
      <h2
        style={{
          fontSize: "58px",
          fontWeight: 950,
          lineHeight: 1.2,
          color: THEME.colors.accentRose,
          margin: "18px 0 0 0",
          letterSpacing: "-0.02em",
          textShadow: `0 0 30px rgba(244, 63, 94, 0.7)`,
        }}
      >
        DÍNH PHẢI LỖI NÀY! ❌
      </h2>

      {/* Explainer Subtitle */}
      <div
        style={{
          marginTop: "44px",
          display: "inline-flex",
          alignItems: "center",
          gap: "14px",
          padding: "16px 30px",
          borderRadius: "18px",
          backgroundColor: "rgba(17, 24, 39, 0.9)",
          border: "1.5px solid rgba(255, 255, 255, 0.15)",
        }}
      >
        <AlertTriangle size={32} color={THEME.colors.accentAmber} />
        <span
          style={{
            fontSize: "26px",
            fontWeight: 800,
            color: THEME.colors.textPrimary,
            letterSpacing: "0.01em",
          }}
        >
          Khiến Toàn Bộ Ứng Dụng Chạy Chậm
        </span>
      </div>
    </div>
  );
};
