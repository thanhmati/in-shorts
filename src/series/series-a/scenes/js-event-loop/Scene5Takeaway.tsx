import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lightbulb, Bell, ArrowRight, Zap, Crown, Clock } from "lucide-react";
import { THEME } from "../../../../core/theme";

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
      step: "BƯỚC 1",
      icon: Zap,
      label: "Code Đồng bộ (Sync)",
      action: "Chạy ngay lập tức trong Call Stack",
      example: "console.log(1), (4)",
      color: THEME.colors.accentCyan,
      bg: "rgba(56, 189, 248, 0.12)",
      border: "rgba(56, 189, 248, 0.4)",
    },
    {
      step: "BƯỚC 2 (VIP)",
      icon: Crown,
      label: "Microtask Queue",
      action: "Vét sạch bách trước khi nhường chỗ",
      example: "Promise.then, queueMicrotask",
      color: THEME.colors.accentPurple,
      bg: "rgba(168, 85, 247, 0.14)",
      border: "rgba(168, 85, 247, 0.45)",
    },
    {
      step: "BƯỚC 3",
      icon: Clock,
      label: "Macrotask Queue",
      action: "Chờ Call Stack & Microtask rỗng",
      example: "setTimeout, setInterval",
      color: THEME.colors.accentAmber,
      bg: "rgba(245, 158, 11, 0.12)",
      border: "rgba(245, 158, 11, 0.4)",
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
        padding: "0 10px",
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
          <Lightbulb size={38} color={THEME.colors.accentAmber} />
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
              3 QUY TẮC VÀNG EVENT LOOP
            </div>
            <div style={{ fontSize: "18px", color: THEME.colors.textMuted, fontWeight: 700 }}>
              Nhớ kỹ thứ tự để không bao giờ đoán sai
            </div>
          </div>
        </div>

        {/* 3 Actionable Rules */}
        {rules.map((rule, idx) => {
          const Icon = rule.icon;
          const itemSpring = spring({
            frame: Math.max(0, frame - idx * 10),
            fps,
            config: { damping: 15, stiffness: 75 },
          });

          return (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                padding: "18px 22px",
                borderRadius: "18px",
                backgroundColor: rule.bg,
                border: `1.5px solid ${rule.border}`,
                transform: `scale(${itemSpring})`,
                opacity: itemSpring,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Icon size={24} color={rule.color} />
                  <span style={{ fontSize: "22px", fontWeight: 900, color: THEME.colors.textPrimary }}>
                    {rule.label}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 900,
                    color: rule.color,
                    padding: "4px 10px",
                    borderRadius: "6px",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {rule.step}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                <span style={{ fontSize: "17px", fontWeight: 600, color: "#CBD5E1" }}>
                  {rule.action}
                </span>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    fontFamily: "JetBrains Mono, monospace",
                    color: rule.color,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {rule.example}
                </span>
              </div>
            </div>
          );
        })}
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
          Để tự tin qua mọi vòng phỏng vấn! 🚀
        </span>
      </div>
    </div>
  );
};
