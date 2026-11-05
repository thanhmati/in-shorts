import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Cpu, Layout, Zap } from "lucide-react";
import { THEME } from "../../../../core/theme";

export const Scene8FaceVsBrain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Left card spring
  const leftSpring = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 130 },
  });

  // Right card spring (slightly delayed)
  const rightSpring = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 11, stiffness: 130 },
  });

  // Ambient floating
  const floatY = Math.sin(frame / 12) * 6;

  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {/* Visual Focal Badge (Max 3-5 words) */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 24px",
          borderRadius: "9999px",
          background: "rgba(168, 85, 247, 0.15)",
          border: `1.5px solid ${THEME.colors.accentPurple}`,
          boxShadow: "0 0 25px rgba(168, 85, 247, 0.3)",
          marginBottom: "35px",
        }}
      >
        <Zap size={24} color={THEME.colors.accentAmber} />
        <span
          style={{
            fontFamily: THEME.fonts.code,
            fontSize: "26px",
            fontWeight: 800,
            color: THEME.colors.textPrimary,
            letterSpacing: "1.5px",
          }}
        >
          FRONTEND vs BACKEND ⚡
        </span>
      </div>

      {/* Dual Cards Container (Side by Side) */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          width: "860px",
          justifyContent: "center",
          alignItems: "stretch",
          transform: `translateY(${floatY}px)`,
        }}
      >
        {/* Left Card: FRONTEND (FACE) */}
        <div
          style={{
            flex: 1,
            padding: "36px 30px",
            borderRadius: "26px",
            background: "rgba(17, 24, 39, 0.8)",
            border: `2px solid ${THEME.colors.accentCyan}`,
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.8), 0 0 35px rgba(56, 189, 248, 0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            transform: `scale(${leftSpring})`,
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "22px",
              background: "rgba(56, 189, 248, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 25px rgba(56, 189, 248, 0.3)",
            }}
          >
            <Layout size={44} color={THEME.colors.accentCyan} strokeWidth={2} />
          </div>

          <span
            style={{
              fontFamily: THEME.fonts.sans,
              fontSize: "30px",
              fontWeight: 800,
              color: THEME.colors.textPrimary,
            }}
          >
            FRONTEND
          </span>

          <div
            style={{
              padding: "6px 18px",
              borderRadius: "12px",
              background: "rgba(56, 189, 248, 0.15)",
              border: `1px solid ${THEME.colors.accentCyan}`,
              fontFamily: THEME.fonts.code,
              fontSize: "18px",
              color: THEME.colors.accentCyan,
              fontWeight: 700,
            }}
          >
            THE FACE (GIAO DIỆN)
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "10px",
              width: "100%",
            }}
          >
            <span style={{ fontFamily: THEME.fonts.code, fontSize: "16px", color: THEME.colors.textSecondary }}>
              • Giao diện & Animation
            </span>
            <span style={{ fontFamily: THEME.fonts.code, fontSize: "16px", color: THEME.colors.textSecondary }}>
              • Trải nghiệm người dùng
            </span>
            <span style={{ fontFamily: THEME.fonts.code, fontSize: "16px", color: THEME.colors.textSecondary }}>
              • Thu nhận tương tác
            </span>
          </div>
        </div>

        {/* Right Card: BACKEND (BRAIN & POWER) */}
        <div
          style={{
            flex: 1,
            padding: "36px 30px",
            borderRadius: "26px",
            background: "rgba(17, 24, 39, 0.8)",
            border: `2px solid ${THEME.colors.accentPurple}`,
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.8), 0 0 35px rgba(168, 85, 247, 0.25)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            transform: `scale(${rightSpring})`,
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "22px",
              background: "rgba(168, 85, 247, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 25px rgba(168, 85, 247, 0.35)",
            }}
          >
            <Cpu size={44} color={THEME.colors.accentPurple} strokeWidth={2} />
          </div>

          <span
            style={{
              fontFamily: THEME.fonts.sans,
              fontSize: "30px",
              fontWeight: 800,
              color: THEME.colors.textPrimary,
            }}
          >
            BACKEND
          </span>

          <div
            style={{
              padding: "6px 18px",
              borderRadius: "12px",
              background: "rgba(168, 85, 247, 0.15)",
              border: `1px solid ${THEME.colors.accentPurple}`,
              fontFamily: THEME.fonts.code,
              fontSize: "18px",
              color: THEME.colors.accentPurple,
              fontWeight: 700,
            }}
          >
            THE BRAIN (BỘ NÃO)
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "10px",
              width: "100%",
            }}
          >
            <span style={{ fontFamily: THEME.fonts.code, fontSize: "16px", color: THEME.colors.textSecondary }}>
              • Xử lý Logic & Bảo mật
            </span>
            <span style={{ fontFamily: THEME.fonts.code, fontSize: "16px", color: THEME.colors.textSecondary }}>
              • Quản lý Cơ sở dữ liệu
            </span>
            <span style={{ fontFamily: THEME.fonts.code, fontSize: "16px", color: THEME.colors.textSecondary }}>
              • Chịu tải hàng triệu req
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
