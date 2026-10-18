import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AlertTriangle, Flame } from "lucide-react";
import { THEME } from "../../../../core/theme";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 120 },
  });

  const warningPulse = 1 + Math.sin(frame / 4) * 0.05;
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
          backgroundColor: "rgba(244, 63, 94, 0.15)",
          border: `2px solid ${THEME.colors.accentRose}`,
          boxShadow: `0 0 ${25 * glowPulse}px rgba(244, 63, 94, 0.5)`,
          marginBottom: "36px",
          transform: `scale(${warningPulse})`,
        }}
      >
        <AlertTriangle size={30} color={THEME.colors.accentRose} />
        <span
          style={{
            color: THEME.colors.accentRose,
            fontWeight: 950,
            fontSize: "24px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          JAVASCRIPT PITFALL #03
        </span>
      </div>

      {/* Main Massive Headline */}
      <h1
        style={{
          fontSize: "66px",
          fontWeight: 950,
          lineHeight: 1.15,
          color: "#FFFFFF",
          margin: "0 0 24px 0",
          textShadow: "0 8px 32px rgba(0,0,0,0.8)",
          letterSpacing: "-0.02em",
        }}
      >
        ĐỪNG DÙNG{" "}
        <span
          style={{
            color: THEME.colors.accentRose,
            textShadow: `0 0 35px rgba(244, 63, 94, 0.75)`,
          }}
        >
          ASYNC / AWAIT
        </span>
        <br />
        BÊN TRONG FOREACH!
      </h1>

      {/* Subtitle hook description */}
      <p
        style={{
          fontSize: "34px",
          fontWeight: 700,
          color: "#94A3B8",
          maxWidth: "880px",
          lineHeight: 1.45,
          margin: "0 0 44px 0",
        }}
      >
        Lỗi ngầm nguy hiểm khiến{" "}
        <span style={{ color: "#FBBF24", fontWeight: 800 }}>API sập</span> và{" "}
        <span style={{ color: "#F43F5E", fontWeight: 800 }}>dữ liệu bị thất thoát</span> trong âm thầm.
      </p>

      {/* Mini Code Window Teaser */}
      <div
        style={{
          width: "820px",
          backgroundColor: "rgba(17, 24, 39, 0.9)",
          border: `2px solid rgba(244, 63, 94, 0.6)`,
          borderRadius: "20px",
          padding: "24px 30px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          textAlign: "left",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#EF4444" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#10B981" }} />
          <span style={{ marginLeft: "10px", fontSize: "20px", color: "#64748B", fontFamily: "JetBrains Mono" }}>
            silent-bug.js
          </span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
            <Flame size={20} color="#F43F5E" />
            <span style={{ fontSize: "18px", color: "#F43F5E", fontWeight: 800 }}>90% DEV TỪNG DÍNH</span>
          </div>
        </div>

        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "26px",
            lineHeight: 1.6,
            color: "#E2E8F0",
          }}
        >
          <div>
            <span style={{ color: "#C084FC" }}>users</span>
            <span style={{ color: "#94A3B8" }}>.</span>
            <span style={{ color: "#F43F5E", fontWeight: 800, textDecoration: "underline" }}>forEach</span>
            <span style={{ color: "#94A3B8" }}>(</span>
            <span style={{ color: "#38BDF8" }}>async </span>
            <span style={{ color: "#94A3B8" }}>(user) =&gt; &#123;</span>
          </div>
          <div style={{ paddingLeft: "32px", color: "#EF4444", fontWeight: 700 }}>
            <span>await </span>
            <span style={{ color: "#FBBF24" }}>saveToDatabase</span>
            <span style={{ color: "#E2E8F0" }}>(user); </span>
            <span style={{ color: "#64748B", fontStyle: "italic" }}>// ❌ KHÔNG HỀ ĐỢI!</span>
          </div>
          <div>
            <span style={{ color: "#94A3B8" }}>&#125;);</span>
          </div>
          <div style={{ color: "#34D399", fontWeight: 700 }}>
            <span style={{ color: "#FDE047" }}>console</span>
            <span style={{ color: "#94A3B8" }}>.</span>
            <span style={{ color: "#38BDF8" }}>log</span>
            <span style={{ color: "#94A3B8" }}>(</span>
            <span style={{ color: "#34D399" }}>&quot;ĐÃ XONG! 🚀&quot;</span>
            <span style={{ color: "#94A3B8" }}>); </span>
            <span style={{ color: "#F43F5E", fontSize: "22px" }}>&lt;-- CHẠY TRƯỚC! ⚠️</span>
          </div>
        </div>
      </div>
    </div>
  );
};
