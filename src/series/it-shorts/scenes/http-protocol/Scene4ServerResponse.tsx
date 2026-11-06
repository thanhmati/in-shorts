import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Cpu, Send, Server, Zap } from "lucide-react";
import { THEME } from "../../../../core/theme";

export const Scene4ServerResponse: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 120 },
  });

  // Processing pulse
  const pulseScale = 1 + Math.sin(frame / 5) * 0.05;

  // Response Packet Blast Back (around frame 75 to 145)
  const blastProgress = interpolate(frame, [75, 145], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const packetX = interpolate(blastProgress, [0, 1], [0, -320]);
  const packetOpacity = interpolate(blastProgress, [0, 0.8, 1], [1, 1, 0.6]);

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
          background: "rgba(16, 185, 129, 0.15)",
          border: `1.5px solid ${THEME.colors.accentEmerald}`,
          boxShadow: "0 0 25px rgba(16, 185, 129, 0.3)",
          marginBottom: "35px",
        }}
      >
        <Zap size={24} color={THEME.colors.accentEmerald} />
        <span
          style={{
            fontFamily: THEME.fonts.code,
            fontSize: "26px",
            fontWeight: 800,
            color: THEME.colors.accentEmerald,
            letterSpacing: "1.5px",
          }}
        >
          HTTP RESPONSE ⚡
        </span>
      </div>

      {/* Main Server Processing Stage */}
      <div
        style={{
          width: "820px",
          height: "640px",
          background: "rgba(17, 24, 39, 0.85)",
          border: `2px solid ${THEME.colors.accentPurple}`,
          borderRadius: "28px",
          padding: "36px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9), 0 0 45px rgba(168, 85, 247, 0.25)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Central Server Core Unit */}
        <div
          style={{
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.4), rgba(11, 15, 25, 0.95))",
            border: `3px solid ${THEME.colors.accentPurple}`,
            boxShadow: "0 0 60px rgba(168, 85, 247, 0.5)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${pulseScale})`,
            zIndex: 10,
          }}
        >
          <Server size={72} color={THEME.colors.accentPurple} strokeWidth={1.8} />
          <span
            style={{
              fontFamily: THEME.fonts.sans,
              fontSize: "28px",
              fontWeight: 800,
              color: THEME.colors.textPrimary,
              marginTop: "12px",
            }}
          >
            SERVER ENGINE
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "8px",
            }}
          >
            <Cpu size={18} color={frame >= 70 ? THEME.colors.accentEmerald : THEME.colors.accentAmber} />
            <span
              style={{
                fontFamily: THEME.fonts.code,
                fontSize: "16px",
                color: frame >= 70 ? THEME.colors.accentEmerald : THEME.colors.accentAmber,
                fontWeight: 700,
              }}
            >
              {frame >= 70 ? "RESPONSE DISPATCHED" : "PROCESSING LOGIC..."}
            </span>
          </div>
        </div>

        {/* Fired Response Packet Shooting Towards Client */}
        {frame >= 70 && (
          <div
            style={{
              position: "absolute",
              bottom: "45px",
              left: "50%",
              transform: `translate(${packetX}px, 0)`,
              opacity: packetOpacity,
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px 26px",
              borderRadius: "20px",
              background: `linear-gradient(135deg, ${THEME.colors.accentEmerald}, ${THEME.colors.accentCyan})`,
              boxShadow: "0 0 45px rgba(16, 185, 129, 0.75)",
              zIndex: 25,
            }}
          >
            <Send size={26} color="#FFFFFF" style={{ transform: "rotate(180deg)" }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: THEME.fonts.sans, fontSize: "20px", fontWeight: 800, color: "#FFFFFF" }}>
                HTTP RESPONSE ⚡
              </span>
              <span style={{ fontFamily: THEME.fonts.code, fontSize: "15px", color: "rgba(255, 255, 255, 0.9)" }}>
                RETURN TO CLIENT
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

