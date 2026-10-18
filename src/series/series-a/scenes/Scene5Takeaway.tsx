import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lightbulb, CheckCircle2, Bell, ArrowRight } from "lucide-react";
import { THEME } from "../../../core/theme";

export const Scene5Takeaway: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Pulse animation for the CTA button
  const ctaPulse = 1 + Math.sin(frame / 4) * 0.04;
  const bellShake = Math.sin(frame * 1.2) * 12;

  const rules = [
    {
      label: "Object & Array inline",
      action: "Bọc bằng useMemo()",
      color: THEME.colors.accentCyan,
    },
    {
      label: "Function & Handlers",
      action: "Bọc bằng useCallback()",
      color: THEME.colors.accentPurple,
    },
    {
      label: "Component con nhận props",
      action: "Bọc bằng React.memo()",
      color: THEME.colors.accentEmerald,
    },
  ];

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transform: `scale(${entrance})`,
        opacity: entrance,
        gap: "36px",
      }}
    >
      {/* Golden Rules Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          borderRadius: "28px",
          border: `2px solid rgba(245, 158, 11, 0.5)`,
          padding: "32px 26px",
          boxShadow: "0 20px 60px rgba(245, 158, 11, 0.18)",
        }}
      >
        {/* Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "6px" }}>
          <Lightbulb size={36} color={THEME.colors.accentAmber} />
          <div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 950,
                color: THEME.colors.accentAmber,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              3 NGUYÊN TẮC VÀNG TỐI ƯU
            </div>
            <div style={{ fontSize: "17px", color: THEME.colors.textMuted, fontWeight: 700 }}>
              Áp dụng ngay để dẹp tan Re-render vô ích
            </div>
          </div>
        </div>

        {/* 3 Actionable Rules */}
        {rules.map((rule, idx) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 22px",
              borderRadius: "18px",
              backgroundColor: "rgba(30, 41, 59, 0.9)",
              border: "1.5px solid rgba(255, 255, 255, 0.12)",
            }}
            key={idx}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <CheckCircle2 size={26} color={rule.color} />
              <span style={{ fontSize: "22px", fontWeight: 700, color: THEME.colors.textPrimary }}>
                {rule.label}
              </span>
            </div>

            <span
              style={{
                fontSize: "20px",
                fontWeight: 900,
                fontFamily: "JetBrains Mono, monospace",
                color: rule.color,
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: "8px 16px",
                borderRadius: "10px",
              }}
            >
              {rule.action}
            </span>
          </div>
        ))}
      </div>

      {/* Follow CTA Button - Big, Vibrant, High Retention */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          transform: `scale(${ctaPulse})`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "16px",
            padding: "22px 46px",
            borderRadius: "999px",
            background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
            boxShadow: "0 0 40px rgba(239, 68, 68, 0.7)",
            border: "2px solid rgba(255, 255, 255, 0.35)",
          }}
        >
          <Bell
            size={36}
            color="#FFFFFF"
            style={{ transform: `rotate(${bellShake}deg)` }}
          />
          <span
            style={{
              fontSize: "30px",
              fontWeight: 950,
              color: "#FFFFFF",
              letterSpacing: "0.04em",
            }}
          >
            FOLLOW @laptrinhfullstack
          </span>
          <ArrowRight size={30} color="#FFFFFF" />
        </div>

        <span
          style={{
            fontSize: "22px",
            fontWeight: 800,
            color: THEME.colors.textMuted,
            letterSpacing: "0.02em",
          }}
        >
          Để lên trình Frontend & Backend mỗi ngày! 🚀
        </span>
      </div>
    </div>
  );
};
