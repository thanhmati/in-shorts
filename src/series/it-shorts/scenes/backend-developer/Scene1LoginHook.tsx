import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Lock, Mail, MousePointer2, Sparkles } from "lucide-react";
import { THEME } from "../../../../core/theme";

export const Scene1LoginHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance card spring
  const cardSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Cursor movement: glides from bottom-right to button center at frame 15 -> 42
  const cursorProgress = interpolate(frame, [10, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorX = interpolate(cursorProgress, [0, 1], [300, 0]);
  const cursorY = interpolate(cursorProgress, [0, 1], [350, 0]);

  // Click trigger happens at frame 45
  const clickSpring = spring({
    frame: Math.max(0, frame - 45),
    fps,
    config: { damping: 8, stiffness: 220 },
  });
  const isClicked = frame >= 45;
  const buttonScale = isClicked
    ? interpolate(clickSpring, [0, 0.4, 1], [0.92, 1.06, 1])
    : 1;

  // Expanding shockwave ripple rings after click
  const ripple1 = interpolate(frame, [45, 95], [0, 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ripple1Opacity = interpolate(frame, [45, 95], [0.8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ripple2 = interpolate(frame, [52, 100], [0, 500], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ripple2Opacity = interpolate(frame, [52, 100], [0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ambient floating animation
  const floatY = Math.sin(frame / 14) * 6;

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
      {/* Visual Focal Badge (Rule: max 3-5 words) */}
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
          marginBottom: "40px",
          transform: `scale(${cardSpring})`,
        }}
      >
        <Sparkles size={26} color={THEME.colors.accentCyan} />
        <span
          style={{
            fontFamily: THEME.fonts.code,
            fontSize: "26px",
            fontWeight: 800,
            color: THEME.colors.accentCyan,
            letterSpacing: "2px",
          }}
        >
          CLICK LOGIN ⚡
        </span>
      </div>

      {/* Modern Login Window Card */}
      <div
        style={{
          width: "820px",
          background: "rgba(17, 24, 39, 0.85)",
          backdropFilter: "blur(20px)",
          border: `2px solid ${isClicked ? THEME.colors.accentCyan : THEME.colors.cardBorder}`,
          borderRadius: "28px",
          padding: "44px 48px",
          boxShadow: isClicked
            ? "0 25px 60px rgba(0, 0, 0, 0.9), 0 0 50px rgba(56, 189, 248, 0.35)"
            : THEME.shadows.windowGlow,
          display: "flex",
          flexDirection: "column",
          gap: "28px",
          transform: `translateY(${floatY}px) scale(${cardSpring})`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Shockwave Rings on click */}
        {isClicked && (
          <>
            <div
              style={{
                position: "absolute",
                bottom: "55px",
                left: "50%",
                width: `${ripple1}px`,
                height: `${ripple1}px`,
                borderRadius: "50%",
                border: `3px solid ${THEME.colors.accentCyan}`,
                transform: "translate(-50%, 50%)",
                opacity: ripple1Opacity,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "55px",
                left: "50%",
                width: `${ripple2}px`,
                height: `${ripple2}px`,
                borderRadius: "50%",
                border: `2px solid ${THEME.colors.accentPurple}`,
                transform: "translate(-50%, 50%)",
                opacity: ripple2Opacity,
                pointerEvents: "none",
              }}
            />
          </>
        )}

        {/* Card Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#EF4444" }} />
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#F59E0B" }} />
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#10B981" }} />
          </div>
          <span
            style={{
              fontFamily: THEME.fonts.code,
              fontSize: "20px",
              color: THEME.colors.textMuted,
            }}
          >
            auth-client.tsx
          </span>
        </div>

        {/* Email Input Field */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            background: "rgba(11, 15, 25, 0.9)",
            border: `1.5px solid ${THEME.colors.cardBorder}`,
            borderRadius: "18px",
            padding: "20px 24px",
          }}
        >
          <Mail size={28} color={THEME.colors.accentCyan} />
          <span
            style={{
              fontFamily: THEME.fonts.code,
              fontSize: "26px",
              color: THEME.colors.textPrimary,
              fontWeight: 500,
            }}
          >
            dev@laptrinh.vn
          </span>
        </div>

        {/* Password Input Field */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            background: "rgba(11, 15, 25, 0.9)",
            border: `1.5px solid ${THEME.colors.cardBorder}`,
            borderRadius: "18px",
            padding: "20px 24px",
          }}
        >
          <Lock size={28} color={THEME.colors.accentPurple} />
          <span
            style={{
              fontFamily: THEME.fonts.code,
              fontSize: "30px",
              letterSpacing: "6px",
              color: THEME.colors.textSecondary,
            }}
          >
            ••••••••••••
          </span>
        </div>

        {/* Action Button: Sign In / Login */}
        <div
          style={{
            marginTop: "10px",
            padding: "24px 32px",
            borderRadius: "20px",
            background: isClicked
              ? `linear-gradient(135deg, ${THEME.colors.accentCyan}, ${THEME.colors.accentPurple})`
              : "linear-gradient(135deg, #0284C7, #2563EB)",
            boxShadow: isClicked
              ? "0 0 45px rgba(56, 189, 248, 0.6)"
              : "0 10px 25px rgba(2, 132, 199, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${buttonScale})`,
            position: "relative",
          }}
        >
          <span
            style={{
              fontFamily: THEME.fonts.sans,
              fontSize: "32px",
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "1px",
            }}
          >
            {isClicked ? "SENDING REQUEST..." : "SIGN IN"}
          </span>

          {/* Mouse Cursor */}
          <div
            style={{
              position: "absolute",
              right: "40%",
              top: "50%",
              transform: `translate(${cursorX}px, ${cursorY}px) scale(${isClicked ? 0.9 : 1})`,
              filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.5))",
              pointerEvents: "none",
            }}
          >
            <MousePointer2 size={44} color="#FFFFFF" fill={THEME.colors.accentCyan} strokeWidth={2.2} />
          </div>
        </div>
      </div>
    </div>
  );
};

