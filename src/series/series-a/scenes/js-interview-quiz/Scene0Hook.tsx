import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CheckCircle2, Clock, Trophy, Zap } from "lucide-react";
import { THEME } from "../../../../core/theme";

export const Scene0Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const pulse = 1 + Math.sin(frame / 4) * 0.04;
  const glow = 0.5 + 0.5 * Math.sin(frame / 3.5);

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
        gap: "32px",
        width: "100%",
      }}
    >
      {/* Quiz Pill */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "14px",
          padding: "16px 36px",
          borderRadius: "999px",
          backgroundColor: "rgba(251, 191, 36, 0.15)",
          border: `2px solid ${THEME.colors.accentAmber}`,
          boxShadow: `0 0 ${30 * glow}px rgba(251, 191, 36, 0.5)`,
          transform: `scale(${pulse})`,
        }}
      >
        <Zap size={36} color={THEME.colors.accentAmber} />
        <span
          style={{
            color: THEME.colors.accentAmber,
            fontWeight: 950,
            fontSize: "28px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          JS INTERVIEW CHALLENGE ⚡
        </span>
      </div>

      {/* Main Punchline */}
      <h1
        style={{
          fontSize: "76px",
          fontWeight: 950,
          lineHeight: 1.15,
          color: "#FFFFFF",
          margin: 0,
          letterSpacing: "-0.02em",
          textShadow: "0 10px 35px rgba(0, 0, 0, 0.9)",
        }}
      >
        THỬ THÁCH 5 CÂU
        <br />
        <span
          style={{
            background: "linear-gradient(135deg, #38BDF8 0%, #C084FC 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
            fontSize: "86px",
            filter: "drop-shadow(0 0 30px rgba(56, 189, 248, 0.45))",
          }}
        >
          PHỎNG VẤN JS
        </span>
      </h1>

      {/* Senior Benchmark Card */}
      <div
        style={{
          width: "100%",
          backgroundColor: "rgba(17, 24, 39, 0.9)",
          border: `2.5px solid ${THEME.colors.accentEmerald}`,
          borderRadius: "28px",
          padding: "32px 36px",
          boxShadow:
            "0 25px 50px rgba(0, 0, 0, 0.7), 0 0 40px rgba(16, 185, 129, 0.25)",
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "22px",
            backgroundColor: "rgba(16, 185, 129, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            border: `1.5px solid ${THEME.colors.accentEmerald}`,
          }}
        >
          <Trophy size={44} color={THEME.colors.accentEmerald} />
        </div>
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              fontSize: "24px",
              color: THEME.colors.textSecondary,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "4px",
            }}
          >
            TIÊU CHUẨN ĐẠT
          </div>
          <div
            style={{
              fontSize: "36px",
              color: THEME.colors.goodText,
              fontWeight: 950,
              lineHeight: 1.25,
            }}
          >
            Đúng 4/5 câu ➔ Nhận lương Senior! 🚀
          </div>
        </div>
      </div>

      {/* Rules Pill Grid */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "16px 20px",
            borderRadius: "18px",
            backgroundColor: "rgba(17, 24, 39, 0.8)",
            border: "1.5px solid rgba(255, 255, 255, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            color: THEME.colors.accentCyan,
            fontSize: "22px",
            fontWeight: 800,
          }}
        >
          <Clock size={24} color={THEME.colors.accentCyan} />
          <span>2 Giây / Câu</span>
        </div>
        <div
          style={{
            flex: 1,
            padding: "16px 20px",
            borderRadius: "18px",
            backgroundColor: "rgba(17, 24, 39, 0.8)",
            border: "1.5px solid rgba(255, 255, 255, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            color: THEME.colors.goodText,
            fontSize: "22px",
            fontWeight: 800,
          }}
        >
          <CheckCircle2 size={24} color={THEME.colors.accentEmerald} />
          <span>Bẫy Ép Kiểu & Scope</span>
        </div>
      </div>
    </div>
  );
};
