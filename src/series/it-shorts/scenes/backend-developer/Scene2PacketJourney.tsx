import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Globe, Laptop, Server, Send } from "lucide-react";
import { THEME } from "../../../../core/theme";

export const Scene2PacketJourney: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Packet transit progress along highway (0 -> 1 across frames 20 to 140)
  const packetProgress = interpolate(frame, [20, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const packetY = interpolate(packetProgress, [0, 1], [-260, 240]);
  const packetScale = interpolate(
    Math.sin(frame / 6),
    [-1, 1],
    [0.96, 1.04]
  );

  // Optical line glow pulse
  const streamPulse = Math.sin(frame / 4) * 8;

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
          background: "rgba(56, 189, 248, 0.12)",
          border: `1.5px solid ${THEME.colors.accentCyan}`,
          boxShadow: "0 0 25px rgba(56, 189, 248, 0.25)",
          marginBottom: "30px",
        }}
      >
        <Send size={24} color={THEME.colors.accentCyan} />
        <span
          style={{
            fontFamily: THEME.fonts.code,
            fontSize: "24px",
            fontWeight: 800,
            color: THEME.colors.accentCyan,
            letterSpacing: "1.5px",
          }}
        >
          POST /api/login 🚀
        </span>
      </div>

      {/* Main Highway Canvas */}
      <div
        style={{
          width: "820px",
          height: "820px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "40px 0",
        }}
      >
        {/* Top Node: CLIENT (Browser / Frontend) */}
        <div
          style={{
            width: "380px",
            padding: "20px 28px",
            borderRadius: "22px",
            background: "rgba(17, 24, 39, 0.9)",
            border: `2px solid ${THEME.colors.accentCyan}`,
            boxShadow: "0 10px 30px rgba(56, 189, 248, 0.25)",
            display: "flex",
            alignItems: "center",
            gap: "18px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "rgba(56, 189, 248, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Laptop size={32} color={THEME.colors.accentCyan} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: THEME.fonts.sans,
                fontSize: "28px",
                fontWeight: 800,
                color: THEME.colors.textPrimary,
              }}
            >
              CLIENT (UI)
            </span>
            <span
              style={{
                fontFamily: THEME.fonts.code,
                fontSize: "18px",
                color: THEME.colors.accentCyan,
              }}
            >
              Browser / React
            </span>
          </div>
        </div>

        {/* Central Vertical Optical Highway Track */}
        <div
          style={{
            position: "absolute",
            top: "140px",
            bottom: "140px",
            width: "6px",
            background: "rgba(31, 41, 55, 0.8)",
            borderRadius: "4px",
            boxShadow: `0 0 ${20 + streamPulse}px rgba(56, 189, 248, 0.4)`,
          }}
        >
          {/* Animated Glowing Light Conduit */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "100%",
              background: `linear-gradient(180deg, transparent, ${THEME.colors.accentCyan}, ${THEME.colors.accentPurple}, transparent)`,
              opacity: 0.85,
            }}
          />
        </div>

        {/* Floating Internet Gateway Chip in the middle */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            padding: "8px 20px",
            borderRadius: "9999px",
            background: "rgba(11, 15, 25, 0.95)",
            border: `1.5px solid ${THEME.colors.cardBorder}`,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            zIndex: 5,
          }}
        >
          <Globe size={20} color={THEME.colors.accentAmber} />
          <span
            style={{
              fontFamily: THEME.fonts.code,
              fontSize: "18px",
              color: THEME.colors.accentAmber,
              fontWeight: 700,
            }}
          >
            INTERNET
          </span>
        </div>

        {/* The Animated Travelling Packet */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: `translateY(${packetY}px) scale(${packetScale})`,
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 26px",
            borderRadius: "18px",
            background: `linear-gradient(135deg, ${THEME.colors.accentCyan}, ${THEME.colors.accentPurple})`,
            boxShadow: "0 0 45px rgba(56, 189, 248, 0.75), 0 10px 25px rgba(0,0,0,0.8)",
          }}
        >
          <Send size={24} color="#FFFFFF" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: THEME.fonts.code,
                fontSize: "20px",
                fontWeight: 800,
                color: "#FFFFFF",
              }}
            >
              HTTP PAYLOAD
            </span>
            <span
              style={{
                fontFamily: THEME.fonts.code,
                fontSize: "16px",
                color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              {"{ email, pass }"}
            </span>
          </div>
        </div>

        {/* Bottom Node: SERVER GATEWAY (Backend Entrance) */}
        <div
          style={{
            width: "380px",
            padding: "20px 28px",
            borderRadius: "22px",
            background: "rgba(17, 24, 39, 0.9)",
            border: `2px solid ${packetProgress > 0.85 ? THEME.colors.accentEmerald : THEME.colors.accentPurple}`,
            boxShadow: packetProgress > 0.85
              ? "0 10px 40px rgba(16, 185, 129, 0.4)"
              : "0 10px 30px rgba(168, 85, 247, 0.25)",
            display: "flex",
            alignItems: "center",
            gap: "18px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "rgba(168, 85, 247, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Server size={32} color={packetProgress > 0.85 ? THEME.colors.accentEmerald : THEME.colors.accentPurple} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontFamily: THEME.fonts.sans,
                fontSize: "28px",
                fontWeight: 800,
                color: THEME.colors.textPrimary,
              }}
            >
              SERVER GATE
            </span>
            <span
              style={{
                fontFamily: THEME.fonts.code,
                fontSize: "18px",
                color: packetProgress > 0.85 ? THEME.colors.accentEmerald : THEME.colors.accentPurple,
              }}
            >
              {packetProgress > 0.85 ? "PACKET RECEIVED ⚡" : "Awaiting..."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

