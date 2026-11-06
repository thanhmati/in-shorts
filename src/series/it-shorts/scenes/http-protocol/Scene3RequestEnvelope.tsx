import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Code, FileText, Send, Sparkles, Tag } from "lucide-react";
import { THEME } from "../../../../core/theme";

export const Scene3RequestEnvelope: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 120 },
  });

  // Layer 1: Method Spring (around frame 160)
  const methodSpring = spring({
    frame: Math.max(0, frame - 160),
    fps,
    config: { damping: 10, stiffness: 150 },
  });

  // Layer 2: Headers Spring (around frame 315)
  const headersSpring = spring({
    frame: Math.max(0, frame - 315),
    fps,
    config: { damping: 10, stiffness: 150 },
  });

  // Layer 3: Body Spring (around frame 420)
  const bodySpring = spring({
    frame: Math.max(0, frame - 420),
    fps,
    config: { damping: 10, stiffness: 150 },
  });

  // Method switch animation from GET to POST around frame 262 (when voiceover says POST)
  const isPost = frame >= 262;

  // Envelope Launch stream (frames 475 to 503)
  const launchProgress = interpolate(frame, [475, 502], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const launchY = interpolate(launchProgress, [0, 1], [0, -320]);
  const launchOpacity = interpolate(launchProgress, [0, 0.8, 1], [1, 1, 0.2]);

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
          HTTP REQUEST ✉️
        </span>
      </div>

      {/* Main Digital Envelope Container */}
      <div
        style={{
          width: "820px",
          background: "rgba(17, 24, 39, 0.85)",
          border: `2px solid ${THEME.colors.cardBorder}`,
          borderRadius: "28px",
          padding: "36px 40px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          boxShadow: THEME.shadows.windowGlow,
          transform: `translateY(${launchY}px)`,
          opacity: launchOpacity,
          position: "relative",
        }}
      >
        {/* Envelope Top Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: THEME.fonts.code, fontSize: "18px", color: THEME.colors.textMuted }}>
            HTTP / 1.1 OR HTTP / 2
          </span>
          <span
            style={{
              fontFamily: THEME.fonts.code,
              fontSize: "18px",
              color: THEME.colors.accentCyan,
              fontWeight: 700,
            }}
          >
            OUTBOUND PAYLOAD
          </span>
        </div>

        {/* Envelope Overview Stage (Before Method pops or as outer envelope) */}
        {frame < 160 && (
          <div
            style={{
              padding: "24px",
              borderRadius: "18px",
              background: "rgba(11, 15, 25, 0.6)",
              border: `1.5px dashed ${THEME.colors.accentCyan}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
            }}
          >
            <Send size={28} color={THEME.colors.accentCyan} />
            <span style={{ fontFamily: THEME.fonts.sans, fontSize: "22px", fontWeight: 700, color: THEME.colors.textPrimary }}>
              DIGITAL ENVELOPE (REQUEST)
            </span>
          </div>
        )}

        {/* Layer 1: HTTP Method Pill */}
        {frame >= 155 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 24px",
              borderRadius: "18px",
              background: "rgba(11, 15, 25, 0.9)",
              border: `1.5px solid ${isPost ? THEME.colors.accentAmber : THEME.colors.accentEmerald}`,
              boxShadow: isPost
                ? "0 0 25px rgba(251, 191, 36, 0.3)"
                : "0 0 25px rgba(16, 185, 129, 0.3)",
              transform: `scale(${methodSpring})`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <Tag size={26} color={isPost ? THEME.colors.accentAmber : THEME.colors.accentEmerald} />
              <span style={{ fontFamily: THEME.fonts.sans, fontSize: "22px", fontWeight: 800, color: THEME.colors.textPrimary }}>
                1. METHOD
              </span>
            </div>

            <div
              style={{
                padding: "8px 20px",
                borderRadius: "12px",
                background: isPost ? "rgba(251, 191, 36, 0.2)" : "rgba(16, 185, 129, 0.2)",
                border: `1.5px solid ${isPost ? THEME.colors.accentAmber : THEME.colors.accentEmerald}`,
                fontFamily: THEME.fonts.code,
                fontSize: "22px",
                fontWeight: 800,
                color: isPost ? THEME.colors.accentAmber : THEME.colors.accentEmerald,
              }}
            >
              {isPost ? "POST /api/send" : "GET /users"}
            </div>
          </div>
        )}

        {/* Layer 2: Headers Pill */}
        {frame >= 310 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              padding: "18px 24px",
              borderRadius: "18px",
              background: "rgba(11, 15, 25, 0.9)",
              border: `1.5px solid ${THEME.colors.accentCyan}`,
              boxShadow: "0 0 20px rgba(56, 189, 248, 0.2)",
              transform: `scale(${headersSpring})`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <FileText size={24} color={THEME.colors.accentCyan} />
              <span style={{ fontFamily: THEME.fonts.sans, fontSize: "20px", fontWeight: 800, color: THEME.colors.textPrimary }}>
                2. HEADERS (METADATA)
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: THEME.fonts.code, fontSize: "16px", color: THEME.colors.accentCyan }}>
              <span>Content-Type: application/json</span>
              <span>Authorization: Bearer ***</span>
            </div>
          </div>
        )}

        {/* Layer 3: Body Payload Pill */}
        {frame >= 415 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              padding: "18px 24px",
              borderRadius: "18px",
              background: "rgba(11, 15, 25, 0.9)",
              border: `1.5px solid ${THEME.colors.accentPurple}`,
              boxShadow: "0 0 20px rgba(168, 85, 247, 0.25)",
              transform: `scale(${bodySpring})`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Code size={24} color={THEME.colors.accentPurple} />
              <span style={{ fontFamily: THEME.fonts.sans, fontSize: "20px", fontWeight: 800, color: THEME.colors.textPrimary }}>
                3. BODY (PAYLOAD)
              </span>
            </div>
            <span style={{ fontFamily: THEME.fonts.code, fontSize: "18px", color: THEME.colors.textSecondary }}>
              {'{"user": "tanthanh", "message": "hello"}'}
            </span>
          </div>
        )}

        {/* Dispatch Arrow Beat */}
        {frame >= 465 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              padding: "14px 24px",
              borderRadius: "16px",
              background: `linear-gradient(135deg, ${THEME.colors.accentCyan}, ${THEME.colors.accentPurple})`,
              boxShadow: "0 0 35px rgba(56, 189, 248, 0.6)",
            }}
          >
            <Send size={24} color="#FFFFFF" />
            <span style={{ fontFamily: THEME.fonts.sans, fontSize: "22px", fontWeight: 800, color: "#FFFFFF" }}>
              DISPATCHING TO SERVER 🚀
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

