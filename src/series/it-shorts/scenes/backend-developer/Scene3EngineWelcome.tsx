import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Cpu, Database, KeyRound, ShieldAlert, Sparkles } from "lucide-react";
import { THEME } from "../../../../core/theme";

export const Scene3EngineWelcome: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Grand entrance spring
  const zoomSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  // Orbital rotation
  const rotateDeg = frame * 1.8;
  const pulseScale = 1 + Math.sin(frame / 6) * 0.04;

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
        transform: `scale(${zoomSpring})`,
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
          boxShadow: "0 0 30px rgba(168, 85, 247, 0.35)",
          marginBottom: "40px",
        }}
      >
        <Sparkles size={24} color={THEME.colors.accentPurple} />
        <span
          style={{
            fontFamily: THEME.fonts.code,
            fontSize: "26px",
            fontWeight: 800,
            color: THEME.colors.accentPurple,
            letterSpacing: "2px",
          }}
        >
          BACKEND ENGINE ⚙️
        </span>
      </div>

      {/* Central Rotating Reactor Hub */}
      <div
        style={{
          width: "750px",
          height: "750px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Outer Orbital Ring */}
        <div
          style={{
            position: "absolute",
            width: "680px",
            height: "680px",
            borderRadius: "50%",
            border: `2px dashed rgba(56, 189, 248, 0.35)`,
            transform: `rotate(${rotateDeg}deg)`,
          }}
        />

        {/* Middle Orbital Ring */}
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            border: `2px solid rgba(168, 85, 247, 0.25)`,
            transform: `rotate(${-rotateDeg * 0.8}deg)`,
          }}
        />

        {/* 4 Orbiting Component Nodes */}
        {/* Node 1: Security (Top) */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px 22px",
            borderRadius: "16px",
            background: "rgba(17, 24, 39, 0.95)",
            border: `1.5px solid ${THEME.colors.accentRose}`,
            boxShadow: "0 0 20px rgba(244, 63, 94, 0.3)",
          }}
        >
          <ShieldAlert size={22} color={THEME.colors.accentRose} />
          <span style={{ fontFamily: THEME.fonts.code, fontSize: "18px", fontWeight: 700, color: THEME.colors.accentRose }}>
            FIREWALL
          </span>
        </div>

        {/* Node 2: Database (Right) */}
        <div
          style={{
            position: "absolute",
            right: "10px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px 22px",
            borderRadius: "16px",
            background: "rgba(17, 24, 39, 0.95)",
            border: `1.5px solid ${THEME.colors.accentCyan}`,
            boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)",
          }}
        >
          <Database size={22} color={THEME.colors.accentCyan} />
          <span style={{ fontFamily: THEME.fonts.code, fontSize: "18px", fontWeight: 700, color: THEME.colors.accentCyan }}>
            DATABASE
          </span>
        </div>

        {/* Node 3: Hashing / Crypto (Bottom) */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px 22px",
            borderRadius: "16px",
            background: "rgba(17, 24, 39, 0.95)",
            border: `1.5px solid ${THEME.colors.accentAmber}`,
            boxShadow: "0 0 20px rgba(251, 191, 36, 0.3)",
          }}
        >
          <KeyRound size={22} color={THEME.colors.accentAmber} />
          <span style={{ fontFamily: THEME.fonts.code, fontSize: "18px", fontWeight: 700, color: THEME.colors.accentAmber }}>
            ENCRYPTION
          </span>
        </div>

        {/* Node 4: Logic / Microservices (Left) */}
        <div
          style={{
            position: "absolute",
            left: "10px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px 22px",
            borderRadius: "16px",
            background: "rgba(17, 24, 39, 0.95)",
            border: `1.5px solid ${THEME.colors.accentEmerald}`,
            boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
          }}
        >
          <Cpu size={22} color={THEME.colors.accentEmerald} />
          <span style={{ fontFamily: THEME.fonts.code, fontSize: "18px", fontWeight: 700, color: THEME.colors.accentEmerald }}>
            LOGIC ENGINE
          </span>
        </div>

        {/* Center Reactor Core */}
        <div
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(168, 85, 247, 0.4), rgba(11, 15, 25, 0.95))`,
            border: `3px solid ${THEME.colors.accentPurple}`,
            boxShadow: "0 0 60px rgba(168, 85, 247, 0.5), inset 0 0 40px rgba(168, 85, 247, 0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${pulseScale})`,
            zIndex: 10,
          }}
        >
          <Cpu size={68} color={THEME.colors.textPrimary} strokeWidth={1.8} />
          <span
            style={{
              fontFamily: THEME.fonts.sans,
              fontSize: "30px",
              fontWeight: 800,
              color: THEME.colors.textPrimary,
              marginTop: "12px",
            }}
          >
            SERVER CORE
          </span>
          <span
            style={{
              fontFamily: THEME.fonts.code,
              fontSize: "16px",
              color: THEME.colors.accentCyan,
              letterSpacing: "1px",
              marginTop: "4px",
            }}
          >
            ACTIVE (ONLINE)
          </span>
        </div>
      </div>
    </div>
  );
};

