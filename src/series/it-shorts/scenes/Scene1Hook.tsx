import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HelpCircle, Layers, RefreshCw, ShieldCheck } from "lucide-react";
import { THEME } from "../../../core/theme";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for main title
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  // Entrance springs for the 3 visual pillars matching voiceover
  const middlewareSpring = spring({
    frame: Math.max(0, frame - 3),
    fps,
    config: { damping: 10, stiffness: 150 },
  });

  const guardSpring = spring({
    frame: Math.max(0, frame - 32),
    fps,
    config: { damping: 10, stiffness: 150 },
  });

  const interceptorSpring = spring({
    frame: Math.max(0, frame - 46),
    fps,
    config: { damping: 10, stiffness: 150 },
  });

  // Hook question transition at frame 135
  const vsSpring = spring({
    frame: Math.max(0, frame - 135),
    fps,
    config: { damping: 9, stiffness: 180 },
  });

  // Motion physics
  const floatOrb = Math.sin(frame / 12) * 10;
  const pulseRadar = 1 + Math.sin(frame / 6) * 0.05;
  const rotateIcon = frame * 1.5;

  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* 1. Punchy Minimal Headline */}
      <div
        style={{
          textAlign: "center",
          transform: `scale(${titleSpring})`,
          opacity: titleSpring,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 24px",
            borderRadius: "999px",
            backgroundColor: "rgba(244, 63, 94, 0.15)",
            border: "2px solid #F43F5E",
            color: "#F43F5E",
            fontSize: "22px",
            fontWeight: 900,
            letterSpacing: "0.08em",
            marginBottom: "16px",
          }}
        >
          NESTJS ARCHITECTURE
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: "64px",
            fontWeight: 950,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          XỬ LÝ REQUEST
        </h1>
      </div>

      {/* 2. Visual Motion Graphics Stage: 3 Glowing Architecture Spheres / Blocks */}
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          padding: "20px 0",
        }}
      >
        {/* Animated Connecting Energy Beam */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "10%",
            right: "10%",
            height: "4px",
            background:
              "linear-gradient(90deg, #38BDF8, #10B981, #C084FC)",
            boxShadow: "0 0 20px #38BDF8, 0 0 30px #C084FC",
            transform: "translateY(-50%)",
            zIndex: 1,
            opacity: 0.8,
          }}
        />

        {/* PILLAR 1: MIDDLEWARE */}
        <div
          style={{
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "18px",
            transform: `scale(${middlewareSpring}) translateY(${floatOrb}px)`,
            opacity: middlewareSpring,
          }}
        >
          <div
            style={{
              width: "220px",
              height: "220px",
              borderRadius: "40px",
              background:
                "linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(15, 23, 42, 0.95))",
              border: `3px solid ${THEME.colors.accentCyan}`,
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.8), 0 0 45px rgba(56, 189, 248, 0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "12px",
                borderRadius: "28px",
                border: "1.5px dashed rgba(56, 189, 248, 0.4)",
              }}
            />
            <Layers size={90} color="#38BDF8" />
          </div>
          <span
            style={{
              fontSize: "34px",
              fontWeight: 950,
              color: "#38BDF8",
              letterSpacing: "0.04em",
              textShadow: "0 0 25px rgba(56, 189, 248, 0.6)",
            }}
          >
            MIDDLEWARE
          </span>
        </div>

        {/* PILLAR 2: GUARD */}
        <div
          style={{
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "18px",
            transform: `scale(${guardSpring}) translateY(${-floatOrb}px)`,
            opacity: guardSpring,
          }}
        >
          <div
            style={{
              width: "220px",
              height: "220px",
              borderRadius: "40px",
              background:
                "linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(15, 23, 42, 0.95))",
              border: `3px solid ${THEME.colors.accentEmerald}`,
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.8), 0 0 45px rgba(16, 185, 129, 0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "12px",
                borderRadius: "28px",
                border: "1.5px dashed rgba(16, 185, 129, 0.4)",
              }}
            />
            <ShieldCheck size={90} color="#10B981" />
          </div>
          <span
            style={{
              fontSize: "34px",
              fontWeight: 950,
              color: "#10B981",
              letterSpacing: "0.04em",
              textShadow: "0 0 25px rgba(16, 185, 129, 0.6)",
            }}
          >
            GUARD
          </span>
        </div>

        {/* PILLAR 3: INTERCEPTOR */}
        <div
          style={{
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "18px",
            transform: `scale(${interceptorSpring}) translateY(${floatOrb}px)`,
            opacity: interceptorSpring,
          }}
        >
          <div
            style={{
              width: "220px",
              height: "220px",
              borderRadius: "40px",
              background:
                "linear-gradient(135deg, rgba(192, 132, 252, 0.25), rgba(15, 23, 42, 0.95))",
              border: "3px solid #C084FC",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.8), 0 0 45px rgba(192, 132, 252, 0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "12px",
                borderRadius: "28px",
                border: "1.5px dashed rgba(192, 132, 252, 0.4)",
              }}
            />
            <div style={{ transform: `rotate(${rotateIcon}deg)` }}>
              <RefreshCw size={86} color="#C084FC" />
            </div>
          </div>
          <span
            style={{
              fontSize: "34px",
              fontWeight: 950,
              color: "#C084FC",
              letterSpacing: "0.04em",
              textShadow: "0 0 25px rgba(192, 132, 252, 0.6)",
            }}
          >
            INTERCEPTOR
          </span>
        </div>
      </div>

      {/* 3. The Hook Punch Visual (Giant Glowing "KHÁC NHAU Ở ĐÂU?" Badge) */}
      {frame >= 125 && (
        <div
          style={{
            transform: `scale(${vsSpring * pulseRadar})`,
            opacity: vsSpring,
            padding: "24px 44px",
            borderRadius: "32px",
            background:
              "linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(244, 63, 94, 0.35))",
            border: "3px solid #F59E0B",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.8), 0 0 50px rgba(245, 158, 11, 0.5)",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <HelpCircle size={52} color="#FDE047" />
          <span
            style={{
              fontSize: "44px",
              fontWeight: 950,
              color: "#FFFFFF",
              letterSpacing: "0.02em",
              textShadow: "0 0 30px rgba(251, 191, 36, 0.8)",
            }}
          >
            KHÁC NHAU Ở ĐÂU?
          </span>
        </div>
      )}
    </div>
  );
};
