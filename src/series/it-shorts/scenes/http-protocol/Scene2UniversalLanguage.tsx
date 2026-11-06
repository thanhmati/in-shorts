import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ArrowLeftRight, BookOpen, Laptop, Server, Zap } from "lucide-react";
import { THEME } from "../../../../core/theme";

export const Scene2UniversalLanguage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 120 },
  });

  // Center rulebook spring
  const rulebookSpring = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 10, stiffness: 140 },
  });

  // Client and Server nodes entrance spring (Frame 95+)
  const nodesSpring = spring({
    frame: Math.max(0, frame - 95),
    fps,
    config: { damping: 10, stiffness: 140 },
  });

  // Bidirectional communication light wave
  const waveProgress = interpolate(
    Math.sin(frame / 6),
    [-1, 1],
    [-220, 220]
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
        transform: `scale(${enterSpring})`,
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
        <BookOpen size={24} color={THEME.colors.accentPurple} />
        <span
          style={{
            fontFamily: THEME.fonts.code,
            fontSize: "26px",
            fontWeight: 800,
            color: THEME.colors.accentPurple,
            letterSpacing: "1.5px",
          }}
        >
          COMMON LANGUAGE 📜
        </span>
      </div>

      {/* Main Bridge Stage */}
      <div
        style={{
          width: "840px",
          height: "640px",
          background: "rgba(17, 24, 39, 0.85)",
          border: `2px solid ${THEME.colors.cardBorder}`,
          borderRadius: "28px",
          padding: "36px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: THEME.shadows.windowGlow,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Horizontal Communication Pipeline Beam */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "90px",
            right: "90px",
            height: "6px",
            background: "rgba(31, 41, 55, 0.9)",
            borderRadius: "4px",
            boxShadow: "0 0 20px rgba(56, 189, 248, 0.4)",
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
        >
          {/* Moving Laser Pulse */}
          <div
            style={{
              position: "absolute",
              top: "-5px",
              left: "50%",
              transform: `translateX(${waveProgress}px)`,
              width: "48px",
              height: "16px",
              borderRadius: "8px",
              background: `linear-gradient(90deg, ${THEME.colors.accentCyan}, ${THEME.colors.accentPurple})`,
              boxShadow: "0 0 25px #38BDF8, 0 0 50px #A855F7",
            }}
          />
        </div>

        {/* Top Header Label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            zIndex: 10,
          }}
        >
          <ArrowLeftRight size={26} color={THEME.colors.accentCyan} />
          <span
            style={{
              fontFamily: THEME.fonts.sans,
              fontSize: "26px",
              fontWeight: 800,
              color: THEME.colors.textPrimary,
            }}
          >
            CLIENT ⟷ SERVER PROTOCOL
          </span>
        </div>

        {/* Center Floating Digital Rulebook Card */}
        <div
          style={{
            width: "500px",
            padding: "24px 30px",
            borderRadius: "22px",
            background: "rgba(11, 15, 25, 0.95)",
            border: `2px solid ${THEME.colors.accentAmber}`,
            boxShadow: "0 0 40px rgba(251, 191, 36, 0.35)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            transform: `scale(${rulebookSpring})`,
            zIndex: 10,
          }}
        >
          <Zap size={36} color={THEME.colors.accentAmber} />
          <span
            style={{
              fontFamily: THEME.fonts.sans,
              fontSize: "26px",
              fontWeight: 800,
              color: THEME.colors.textPrimary,
            }}
          >
            HTTP SPECIFICATION
          </span>
          <div
            style={{
              padding: "6px 16px",
              borderRadius: "10px",
              background: "rgba(251, 191, 36, 0.15)",
              border: `1px solid ${THEME.colors.accentAmber}`,
              fontFamily: THEME.fonts.code,
              fontSize: "16px",
              color: THEME.colors.accentAmber,
              fontWeight: 700,
            }}
          >
            STANDARD WEB RULES
          </div>
        </div>

        {/* Bottom Two Nodes: Client & Server */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            zIndex: 10,
            transform: `scale(${nodesSpring})`,
            opacity: nodesSpring,
          }}
        >
          {/* Client Node */}
          <div
            style={{
              width: "290px",
              padding: "18px 24px",
              borderRadius: "20px",
              background: "rgba(11, 15, 25, 0.95)",
              border: `2px solid ${THEME.colors.accentCyan}`,
              boxShadow: "0 10px 30px rgba(56, 189, 248, 0.25)",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                background: "rgba(56, 189, 248, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Laptop size={30} color={THEME.colors.accentCyan} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: THEME.fonts.sans, fontSize: "22px", fontWeight: 800, color: THEME.colors.textPrimary }}>
                CLIENT
              </span>
              <span style={{ fontFamily: THEME.fonts.code, fontSize: "15px", color: THEME.colors.accentCyan }}>
                Browser / Mobile
              </span>
            </div>
          </div>

          {/* Server Node */}
          <div
            style={{
              width: "290px",
              padding: "18px 24px",
              borderRadius: "20px",
              background: "rgba(11, 15, 25, 0.95)",
              border: `2px solid ${THEME.colors.accentPurple}`,
              boxShadow: "0 10px 30px rgba(168, 85, 247, 0.25)",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                background: "rgba(168, 85, 247, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Server size={30} color={THEME.colors.accentPurple} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: THEME.fonts.sans, fontSize: "22px", fontWeight: 800, color: THEME.colors.textPrimary }}>
                SERVER
              </span>
              <span style={{ fontFamily: THEME.fonts.code, fontSize: "15px", color: THEME.colors.accentPurple }}>
                Backend Service
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

