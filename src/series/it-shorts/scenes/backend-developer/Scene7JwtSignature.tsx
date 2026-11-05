import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CheckCircle2, FileKey2, Send, Sparkles } from "lucide-react";
import { THEME } from "../../../../core/theme";

export const Scene7JwtSignature: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 120 },
  });

  // Stamp impact at frame 35
  const stampSpring = spring({
    frame: Math.max(0, frame - 35),
    fps,
    config: { damping: 8, stiffness: 220 },
  });
  const isStamped = frame >= 35;

  // Packet return blast at frame 85 -> 150
  const returnProgress = interpolate(frame, [85, 155], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const packetReturnY = interpolate(returnProgress, [0, 1], [0, -320]);
  const packetReturnOpacity = interpolate(returnProgress, [0, 0.8, 1], [1, 1, 0]);

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
          background: "rgba(56, 189, 248, 0.15)",
          border: `1.5px solid ${THEME.colors.accentCyan}`,
          boxShadow: "0 0 25px rgba(56, 189, 248, 0.3)",
          marginBottom: "35px",
        }}
      >
        <Sparkles size={24} color={THEME.colors.accentCyan} />
        <span
          style={{
            fontFamily: THEME.fonts.code,
            fontSize: "26px",
            fontWeight: 800,
            color: THEME.colors.accentCyan,
            letterSpacing: "1.5px",
          }}
        >
          JWT CREATED (200 OK) 🔑
        </span>
      </div>

      {/* Main JWT Token Card Container */}
      <div
        style={{
          width: "820px",
          background: "rgba(17, 24, 39, 0.85)",
          border: `2px solid ${isStamped ? THEME.colors.accentCyan : THEME.colors.cardBorder}`,
          borderRadius: "28px",
          padding: "36px 40px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          boxShadow: isStamped
            ? "0 25px 60px rgba(0, 0, 0, 0.9), 0 0 50px rgba(56, 189, 248, 0.35)"
            : THEME.shadows.windowGlow,
          position: "relative",
        }}
      >
        {/* JWT Structure 3 Pills: Header . Payload . Signature */}
        <div style={{ display: "flex", gap: "12px", width: "100%" }}>
          {/* 1. Header (Rose) */}
          <div
            style={{
              flex: 1,
              padding: "16px 20px",
              borderRadius: "16px",
              background: "rgba(244, 63, 94, 0.15)",
              border: `1.5px solid ${THEME.colors.accentRose}`,
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <span style={{ fontFamily: THEME.fonts.code, fontSize: "16px", fontWeight: 700, color: THEME.colors.accentRose }}>
              HEADER
            </span>
            <span style={{ fontFamily: THEME.fonts.code, fontSize: "15px", color: THEME.colors.textSecondary }}>
              {"{ alg: 'HS256' }"}
            </span>
          </div>

          {/* 2. Payload (Purple) */}
          <div
            style={{
              flex: 1.2,
              padding: "16px 20px",
              borderRadius: "16px",
              background: "rgba(168, 85, 247, 0.15)",
              border: `1.5px solid ${THEME.colors.accentPurple}`,
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <span style={{ fontFamily: THEME.fonts.code, fontSize: "16px", fontWeight: 700, color: THEME.colors.accentPurple }}>
              PAYLOAD
            </span>
            <span style={{ fontFamily: THEME.fonts.code, fontSize: "15px", color: THEME.colors.textSecondary }}>
              {"{ sub: 1042, role: 'dev' }"}
            </span>
          </div>

          {/* 3. Signature (Cyan) */}
          <div
            style={{
              flex: 1.2,
              padding: "16px 20px",
              borderRadius: "16px",
              background: "rgba(56, 189, 248, 0.15)",
              border: `1.5px solid ${THEME.colors.accentCyan}`,
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <span style={{ fontFamily: THEME.fonts.code, fontSize: "16px", fontWeight: 700, color: THEME.colors.accentCyan }}>
              SIGNATURE
            </span>
            <span style={{ fontFamily: THEME.fonts.code, fontSize: "15px", color: THEME.colors.textSecondary }}>
              HMACSHA256(secret)
            </span>
          </div>
        </div>

        {/* Server Stamp of Approval */}
        <div
          style={{
            padding: "24px 32px",
            borderRadius: "20px",
            background: isStamped
              ? "linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(16, 185, 129, 0.25))"
              : "rgba(31, 41, 55, 0.3)",
            border: `2px solid ${isStamped ? THEME.colors.accentCyan : THEME.colors.cardBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transform: `scale(${isStamped ? stampSpring : 1})`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <FileKey2 size={36} color={THEME.colors.accentCyan} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: THEME.fonts.sans, fontSize: "24px", fontWeight: 800, color: THEME.colors.textPrimary }}>
                AUTH TOKEN ISSUED
              </span>
              <span style={{ fontFamily: THEME.fonts.code, fontSize: "17px", color: THEME.colors.accentEmerald }}>
                Status: 200 OK (Authorized)
              </span>
            </div>
          </div>
          <CheckCircle2 size={32} color={THEME.colors.accentEmerald} />
        </div>

        {/* The Response Packet Shooting Back to Client */}
        {frame >= 85 && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, ${packetReturnY}px)`,
              opacity: packetReturnOpacity,
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 28px",
              borderRadius: "20px",
              background: `linear-gradient(135deg, ${THEME.colors.accentEmerald}, ${THEME.colors.accentCyan})`,
              boxShadow: "0 0 50px rgba(16, 185, 129, 0.8)",
              zIndex: 30,
            }}
          >
            <Send size={24} color="#FFFFFF" style={{ transform: "rotate(-90deg)" }} />
            <span style={{ fontFamily: THEME.fonts.code, fontSize: "20px", fontWeight: 800, color: "#FFFFFF" }}>
              200 OK ➔ RETURNING TO CLIENT
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

