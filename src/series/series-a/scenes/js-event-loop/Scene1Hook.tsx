import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HelpCircle, Terminal } from "lucide-react";
import { THEME } from "../../../../core/theme";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 120 },
  });

  const questionPulse = 1 + Math.sin(frame / 4) * 0.06;
  const glowPulse = 0.5 + 0.5 * Math.sin(frame / 3.5);

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
        padding: "0 10px",
      }}
    >
      {/* Category Pill */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 28px",
          borderRadius: "999px",
          backgroundColor: "rgba(251, 191, 36, 0.15)",
          border: `2px solid ${THEME.colors.accentAmber}`,
          boxShadow: `0 0 ${25 * glowPulse}px rgba(251, 191, 36, 0.5)`,
          marginBottom: "36px",
          transform: `scale(${questionPulse})`,
        }}
      >
        <HelpCircle size={30} color={THEME.colors.accentAmber} />
        <span
          style={{
            color: THEME.colors.accentAmber,
            fontWeight: 950,
            fontSize: "24px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          CÂU ĐỐ PHỎNG VẤN JAVASCRIPT
        </span>
      </div>

      {/* Massive Headline 1 */}
      <h1
        style={{
          fontSize: "68px",
          fontWeight: 950,
          lineHeight: 1.15,
          color: THEME.colors.textPrimary,
          margin: 0,
          letterSpacing: "-0.03em",
          textShadow: "0 8px 30px rgba(0, 0, 0, 0.9)",
        }}
      >
        ĐOẠN CODE NÀY
      </h1>

      {/* Massive Headline 2 with Cyan Glow */}
      <h2
        style={{
          fontSize: "62px",
          fontWeight: 950,
          lineHeight: 1.2,
          color: THEME.colors.accentCyan,
          margin: "18px 0 0 0",
          letterSpacing: "-0.02em",
          textShadow: `0 0 35px rgba(56, 189, 248, 0.75)`,
        }}
      >
        IN RA SỐ NÀO TRƯỚC? ❓
      </h2>

      {/* Explainer Subtitle */}
      <div
        style={{
          marginTop: "44px",
          display: "inline-flex",
          alignItems: "center",
          gap: "14px",
          padding: "16px 32px",
          borderRadius: "20px",
          backgroundColor: "rgba(17, 24, 39, 0.92)",
          border: "1.5px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.7)",
        }}
      >
        <Terminal size={30} color={THEME.colors.accentRose} />
        <span
          style={{
            fontSize: "26px",
            fontWeight: 800,
            color: THEME.colors.textPrimary,
          }}
        >
          90% Lập Trình Viên Trả Lời Sai! ❌
        </span>
      </div>
    </div>
  );
};
