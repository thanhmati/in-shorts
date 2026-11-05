import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ShieldCheck, XCircle, CheckCircle2 } from "lucide-react";
import { THEME } from "../../../../core/theme";

export const Scene4SecurityRateLimit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const shieldSpring = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 120 },
  });

  // Laser scanner sweep across the screen
  const scanY = interpolate(
    Math.sin(frame / 6),
    [-1, 1],
    [-180, 180]
  );

  // Red spam packets deflected away (frames 15 -> 65)
  const spam1Progress = interpolate(frame, [10, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const spam1X = interpolate(spam1Progress, [0, 0.6, 1], [-280, -90, -320]);
  const spam1Y = interpolate(spam1Progress, [0, 0.6, 1], [-120, -60, -200]);
  const spam1Opacity = interpolate(spam1Progress, [0, 0.8, 1], [1, 1, 0]);

  // Green valid packet moving safely through the center
  const validProgress = interpolate(frame, [25, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const validX = interpolate(validProgress, [0, 1], [-260, 220]);

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
          background: "rgba(16, 185, 129, 0.12)",
          border: `1.5px solid ${THEME.colors.accentEmerald}`,
          boxShadow: "0 0 25px rgba(16, 185, 129, 0.3)",
          marginBottom: "40px",
          transform: `scale(${shieldSpring})`,
        }}
      >
        <ShieldCheck size={26} color={THEME.colors.accentEmerald} />
        <span
          style={{
            fontFamily: THEME.fonts.code,
            fontSize: "26px",
            fontWeight: 800,
            color: THEME.colors.accentEmerald,
            letterSpacing: "1.5px",
          }}
        >
          RATE LIMIT: OK 🛡️
        </span>
      </div>

      {/* Main Firewall Arena */}
      <div
        style={{
          width: "820px",
          height: "650px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(17, 24, 39, 0.65)",
          border: `2px solid ${THEME.colors.cardBorder}`,
          borderRadius: "28px",
          overflow: "hidden",
          boxShadow: THEME.shadows.windowGlow,
        }}
      >
        {/* Central Vertical Energy Shield Barrier */}
        <div
          style={{
            position: "absolute",
            width: "8px",
            height: "500px",
            background: `linear-gradient(180deg, transparent, ${THEME.colors.accentEmerald}, transparent)`,
            boxShadow: "0 0 30px rgba(16, 185, 129, 0.8)",
            borderRadius: "4px",
            zIndex: 10,
          }}
        />

        {/* Laser Scanner Bar */}
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "4px",
            background: `linear-gradient(90deg, transparent, ${THEME.colors.accentCyan}, transparent)`,
            boxShadow: "0 0 20px rgba(56, 189, 248, 0.9)",
            transform: `translateY(${scanY}px)`,
            zIndex: 12,
            opacity: 0.8,
          }}
        />

        {/* Central Shield Icon Badge */}
        <div
          style={{
            position: "absolute",
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            background: "rgba(11, 15, 25, 0.9)",
            border: `3px solid ${THEME.colors.accentEmerald}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 40px rgba(16, 185, 129, 0.5)",
            zIndex: 15,
            transform: `scale(${shieldSpring})`,
          }}
        >
          <ShieldCheck size={72} color={THEME.colors.accentEmerald} strokeWidth={2.2} />
        </div>

        {/* Deflected Malicious Spam Packet */}
        <div
          style={{
            position: "absolute",
            transform: `translate(${spam1X}px, ${spam1Y}px)`,
            opacity: spam1Opacity,
            padding: "12px 20px",
            borderRadius: "14px",
            background: "rgba(244, 63, 94, 0.2)",
            border: `1.5px solid ${THEME.colors.accentRose}`,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 0 25px rgba(244, 63, 94, 0.4)",
            zIndex: 20,
          }}
        >
          <XCircle size={22} color={THEME.colors.accentRose} />
          <span style={{ fontFamily: THEME.fonts.code, fontSize: "18px", fontWeight: 700, color: THEME.colors.accentRose }}>
            429 SPAM BLOCKED
          </span>
        </div>

        {/* Legitimate User Packet Passing Safely */}
        <div
          style={{
            position: "absolute",
            transform: `translate(${validX}px, 60px)`,
            padding: "14px 24px",
            borderRadius: "16px",
            background: "rgba(16, 185, 129, 0.25)",
            border: `2px solid ${THEME.colors.accentEmerald}`,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            boxShadow: "0 0 35px rgba(16, 185, 129, 0.5)",
            zIndex: 25,
          }}
        >
          <CheckCircle2 size={24} color={THEME.colors.accentEmerald} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: THEME.fonts.code, fontSize: "19px", fontWeight: 800, color: "#FFFFFF" }}>
              USER REQUEST
            </span>
            <span style={{ fontFamily: THEME.fonts.code, fontSize: "15px", color: THEME.colors.accentEmerald }}>
              Pass: 1/100 req
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

