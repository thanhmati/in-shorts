import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CheckCircle2, HelpCircle, Cpu } from "lucide-react";
import { THEME } from "../../../../core/theme";

export const Scene3Verdict: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gentle entrance with calm educational pacing
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 75 },
  });

  const questionSpring = spring({
    frame: Math.max(0, frame - 135),
    fps,
    config: { damping: 15, stiffness: 75 },
  });

  const teaserSpring = spring({
    frame: Math.max(0, frame - 180),
    fps,
    config: { damping: 15, stiffness: 75 },
  });

  const questionPulse = 1 + Math.sin(frame / 4) * 0.03;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        transform: `scale(${entrance})`,
        opacity: entrance,
        gap: "28px",
        padding: "0 8px",
      }}
    >
      {/* Top Banner */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 24px",
          borderRadius: "999px",
          backgroundColor: "rgba(16, 185, 129, 0.15)",
          border: `2px solid ${THEME.colors.accentEmerald}`,
          color: THEME.colors.accentEmerald,
          fontSize: "22px",
          fontWeight: 900,
        }}
      >
        <CheckCircle2 size={26} />
        <span>KẾT QUẢ THỰC TẾ CHÍNH XÁC</span>
      </div>

      {/* Hero Output Result Card */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "18px",
          padding: "26px 40px",
          borderRadius: "28px",
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          border: `3px solid ${THEME.colors.accentEmerald}`,
          boxShadow: "0 0 50px rgba(16, 185, 129, 0.4)",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {[
          { num: "1", type: "sync", label: "Đồng bộ" },
          { num: "4", type: "sync", label: "Đồng bộ" },
          { num: "3", type: "promise", label: "Promise" },
          { num: "2", type: "timeout", label: "setTimeout" },
        ].map((item, idx) => (
          <React.Fragment key={idx}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "20px",
                  backgroundColor:
                    item.type === "promise"
                      ? "rgba(56, 189, 248, 0.25)"
                      : item.type === "timeout"
                      ? "rgba(244, 63, 94, 0.2)"
                      : "rgba(16, 185, 129, 0.25)",
                  border: `2.5px solid ${
                    item.type === "promise"
                      ? THEME.colors.accentCyan
                      : item.type === "timeout"
                      ? THEME.colors.accentRose
                      : THEME.colors.accentEmerald
                  }`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "38px",
                  fontWeight: 950,
                  fontFamily: "JetBrains Mono, monospace",
                  color:
                    item.type === "promise"
                      ? THEME.colors.accentCyan
                      : item.type === "timeout"
                      ? THEME.colors.accentRose
                      : THEME.colors.accentEmerald,
                  boxShadow: `0 0 25px ${
                    item.type === "promise"
                      ? "rgba(56, 189, 248, 0.4)"
                      : "rgba(16, 185, 129, 0.4)"
                  }`,
                }}
              >
                {item.num}
              </div>
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: 800,
                  color: THEME.colors.textMuted,
                  marginTop: "8px",
                }}
              >
                {item.label}
              </span>
            </div>

            {idx < 3 && (
              <span
                style={{
                  fontSize: "30px",
                  fontWeight: 950,
                  color: THEME.colors.accentEmerald,
                  marginBottom: "24px",
                }}
              >
                ➔
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* The Big Mystery Box */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          padding: "24px 28px",
          borderRadius: "22px",
          backgroundColor: "rgba(251, 191, 36, 0.12)",
          border: `2px solid ${THEME.colors.accentAmber}`,
          transform: `scale(${questionSpring * questionPulse})`,
          opacity: questionSpring,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <HelpCircle size={32} color={THEME.colors.accentAmber} />
          <span
            style={{
              fontSize: "26px",
              fontWeight: 950,
              color: THEME.colors.accentAmber,
            }}
          >
            TẠI SAO SỐ 3 LẠI VƯỢT MẶT SỐ 2?
          </span>
        </div>
        <span
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: THEME.colors.textPrimary,
          }}
        >
          Dù setTimeout được gọi trước và độ trễ chỉ 0 mili-giây!
        </span>
      </div>

      {/* Answer Teaser Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px 32px",
          borderRadius: "20px",
          backgroundColor: "rgba(56, 189, 248, 0.18)",
          border: `2px solid ${THEME.colors.accentCyan}`,
          boxShadow: "0 0 30px rgba(56, 189, 248, 0.4)",
          transform: `scale(${teaserSpring})`,
          opacity: teaserSpring,
        }}
      >
        <Cpu size={30} color={THEME.colors.accentCyan} />
        <span
          style={{
            fontSize: "24px",
            fontWeight: 950,
            color: THEME.colors.accentCyan,
            letterSpacing: "0.04em",
          }}
        >
          BÍ MẬT NẰM Ở: EVENT LOOP ⚡
        </span>
      </div>
    </div>
  );
};
