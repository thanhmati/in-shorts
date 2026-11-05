import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Database, Search, CheckCircle2, UserCheck } from "lucide-react";
import { THEME } from "../../../../core/theme";

export const Scene5DatabaseQuery: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const dbSpring = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 120 },
  });

  // Record reveal spring at frame 40
  const recordSpring = spring({
    frame: Math.max(0, frame - 38),
    fps,
    config: { damping: 10, stiffness: 160 },
  });

  // Scan light sweeping through database disks
  const scanDiskY = interpolate(
    Math.sin(frame / 5),
    [-1, 1],
    [-70, 70]
  );

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
          background: "rgba(56, 189, 248, 0.12)",
          border: `1.5px solid ${THEME.colors.accentCyan}`,
          boxShadow: "0 0 25px rgba(56, 189, 248, 0.25)",
          marginBottom: "35px",
          transform: `scale(${dbSpring})`,
        }}
      >
        <Search size={24} color={THEME.colors.accentCyan} />
        <span
          style={{
            fontFamily: THEME.fonts.code,
            fontSize: "26px",
            fontWeight: 800,
            color: THEME.colors.accentCyan,
            letterSpacing: "1.5px",
          }}
        >
          QUERY DATABASE 🗄️
        </span>
      </div>

      {/* Main Database Stage */}
      <div
        style={{
          width: "820px",
          height: "680px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(17, 24, 39, 0.75)",
          border: `2px solid ${THEME.colors.cardBorder}`,
          borderRadius: "28px",
          padding: "30px",
          position: "relative",
          boxShadow: THEME.shadows.windowGlow,
        }}
      >
        {/* Top Query Code Chip */}
        <div
          style={{
            padding: "10px 22px",
            borderRadius: "14px",
            background: "rgba(11, 15, 25, 0.9)",
            border: `1px solid ${THEME.colors.accentCyan}`,
            fontFamily: THEME.fonts.code,
            fontSize: "20px",
            color: THEME.colors.accentCyan,
            marginBottom: "30px",
            boxShadow: "0 0 15px rgba(56, 189, 248, 0.2)",
          }}
        >
          SELECT * FROM users WHERE email = ?
        </div>

        {/* 3D Database Disks Stack */}
        <div
          style={{
            position: "relative",
            width: "360px",
            height: "240px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Scan laser sweeping across disk stack */}
          <div
            style={{
              position: "absolute",
              width: "420px",
              height: "4px",
              background: `linear-gradient(90deg, transparent, ${THEME.colors.accentCyan}, transparent)`,
              boxShadow: "0 0 25px rgba(56, 189, 248, 1)",
              top: "50%",
              transform: `translateY(${scanDiskY}px)`,
              zIndex: 10,
            }}
          />

          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: "340px",
                height: "64px",
                borderRadius: "32px",
                background: "linear-gradient(180deg, #1E293B, #0F172A)",
                border: `2px solid ${THEME.colors.accentCyan}`,
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 28px",
              }}
            >
              <Database size={26} color={THEME.colors.accentCyan} />
              <div style={{ display: "flex", gap: "8px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: THEME.colors.accentEmerald, boxShadow: "0 0 8px #10B981" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: THEME.colors.accentCyan, boxShadow: "0 0 8px #38BDF8" }} />
              </div>
            </div>
          ))}
        </div>

        {/* User Record Found Card (Springs in from bottom) */}
        <div
          style={{
            marginTop: "35px",
            width: "560px",
            padding: "20px 28px",
            borderRadius: "20px",
            background: "rgba(16, 185, 129, 0.15)",
            border: `2px solid ${THEME.colors.accentEmerald}`,
            boxShadow: "0 0 35px rgba(16, 185, 129, 0.35)",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            transform: `scale(${recordSpring})`,
            opacity: recordSpring,
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "rgba(16, 185, 129, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UserCheck size={36} color={THEME.colors.accentEmerald} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontFamily: THEME.fonts.sans, fontSize: "24px", fontWeight: 800, color: THEME.colors.textPrimary }}>
                USER FOUND: #1042
              </span>
              <CheckCircle2 size={20} color={THEME.colors.accentEmerald} />
            </div>
            <span style={{ fontFamily: THEME.fonts.code, fontSize: "18px", color: THEME.colors.accentCyan }}>
              dev@laptrinh.vn
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

