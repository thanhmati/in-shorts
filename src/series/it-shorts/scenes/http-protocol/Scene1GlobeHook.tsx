import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Globe, Laptop, Server, Smartphone, Sparkles } from "lucide-react";
import { THEME } from "../../../../core/theme";

export const Scene1GlobeHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 120 },
  });

  // Second question beat spring (at frame 110)
  const question2Spring = spring({
    frame: Math.max(0, frame - 110),
    fps,
    config: { damping: 10, stiffness: 140 },
  });

  // Orbital rotation (slower, more cinematic drift)
  const rotateDeg = frame * 1.5;
  const pulseScale = 1 + Math.sin(frame / 8) * 0.04;

  // Packet fly along circular orbits
  const packetOrbit1 = (frame * 2.8) % 360;
  const packetOrbit2 = (frame * 2.8 + 180) % 360;

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
      {/* Visual Focal Badge (Rule: max 3-5 words) */}
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
          marginBottom: "30px",
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
          HTTP PROTOCOL 🌐
        </span>
      </div>

      {/* Main Holographic Web Orbit Arena */}
      <div
        style={{
          width: "780px",
          height: "720px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Outer Orbit Line */}
        <div
          style={{
            position: "absolute",
            width: "660px",
            height: "660px",
            borderRadius: "50%",
            border: `2px dashed rgba(56, 189, 248, 0.35)`,
            transform: `rotate(${rotateDeg}deg)`,
          }}
        />

        {/* Inner Orbit Line */}
        <div
          style={{
            position: "absolute",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            border: `2px solid rgba(168, 85, 247, 0.25)`,
            transform: `rotate(${-rotateDeg * 0.7}deg)`,
          }}
        />

        {/* Orbiting Device 1: Browser Laptop (Top-Left) */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "60px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "14px 22px",
            borderRadius: "18px",
            background: "rgba(17, 24, 39, 0.9)",
            border: `1.5px solid ${THEME.colors.accentCyan}`,
            boxShadow: "0 0 20px rgba(56, 189, 248, 0.25)",
          }}
        >
          <Laptop size={28} color={THEME.colors.accentCyan} />
          <span style={{ fontFamily: THEME.fonts.code, fontSize: "18px", fontWeight: 700, color: THEME.colors.textPrimary }}>
            CLIENT
          </span>
        </div>

        {/* Orbiting Device 2: Mobile App (Bottom-Left) */}
        <div
          style={{
            position: "absolute",
            bottom: "50px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "14px 22px",
            borderRadius: "18px",
            background: "rgba(17, 24, 39, 0.9)",
            border: `1.5px solid ${THEME.colors.accentEmerald}`,
            boxShadow: "0 0 20px rgba(16, 185, 129, 0.25)",
          }}
        >
          <Smartphone size={28} color={THEME.colors.accentEmerald} />
          <span style={{ fontFamily: THEME.fonts.code, fontSize: "18px", fontWeight: 700, color: THEME.colors.textPrimary }}>
            MOBILE
          </span>
        </div>

        {/* Orbiting Device 3: Cloud Datacenter (Right) */}
        <div
          style={{
            position: "absolute",
            right: "30px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "14px 22px",
            borderRadius: "18px",
            background: "rgba(17, 24, 39, 0.9)",
            border: `1.5px solid ${THEME.colors.accentPurple}`,
            boxShadow: "0 0 20px rgba(168, 85, 247, 0.25)",
          }}
        >
          <Server size={28} color={THEME.colors.accentPurple} />
          <span style={{ fontFamily: THEME.fonts.code, fontSize: "18px", fontWeight: 700, color: THEME.colors.textPrimary }}>
            SERVER
          </span>
        </div>

        {/* Glowing Central Web Globe Hub */}
        <div
          style={{
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.35), rgba(11, 15, 25, 0.95))",
            border: `3px solid ${THEME.colors.accentCyan}`,
            boxShadow: "0 0 60px rgba(56, 189, 248, 0.5), inset 0 0 40px rgba(56, 189, 248, 0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${pulseScale})`,
            zIndex: 10,
          }}
        >
          <Globe size={80} color={THEME.colors.accentCyan} strokeWidth={1.8} />
          <span
            style={{
              fontFamily: THEME.fonts.sans,
              fontSize: "30px",
              fontWeight: 800,
              color: THEME.colors.textPrimary,
              marginTop: "12px",
            }}
          >
            WORLD WIDE WEB
          </span>
          <span
            style={{
              fontFamily: THEME.fonts.code,
              fontSize: "16px",
              color: THEME.colors.accentEmerald,
              marginTop: "4px",
            }}
          >
            INTERCONNECTED
          </span>
        </div>

        {/* Secondary Question Pill (Reveals at frame 110) */}
        {frame >= 110 && (
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              padding: "10px 24px",
              borderRadius: "16px",
              background: "rgba(11, 15, 25, 0.95)",
              border: `1.5px solid ${THEME.colors.accentAmber}`,
              boxShadow: "0 0 25px rgba(251, 191, 36, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              transform: `scale(${question2Spring})`,
              zIndex: 20,
            }}
          >
            <span
              style={{
                fontFamily: THEME.fonts.code,
                fontSize: "19px",
                fontWeight: 800,
                color: THEME.colors.accentAmber,
              }}
            >
              CLIENT ⟷ CLOUD SERVERS
            </span>
          </div>
        )}

        {/* Orbiting Photon Light Packets */}
        <div
          style={{
            position: "absolute",
            width: "660px",
            height: "660px",
            borderRadius: "50%",
            transform: `rotate(${packetOrbit1}deg)`,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: THEME.colors.accentCyan,
              boxShadow: "0 0 20px #38BDF8, 0 0 40px #38BDF8",
              position: "absolute",
              top: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            transform: `rotate(${packetOrbit2}deg)`,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: THEME.colors.accentPurple,
              boxShadow: "0 0 20px #A855F7, 0 0 40px #A855F7",
              position: "absolute",
              top: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
