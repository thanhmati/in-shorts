import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AlertTriangle, CheckCircle2, ListFilter } from "lucide-react";
import { THEME } from "../../../../core/theme";

export const Scene5StatusCodes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 120 },
  });

  // Card 200 OK spring (around frame 10)
  const okSpring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 10, stiffness: 150 },
  });

  // Card 404 Spring (around frame 105)
  const notFoundSpring = spring({
    frame: Math.max(0, frame - 105),
    fps,
    config: { damping: 10, stiffness: 150 },
  });

  // Ambient floating
  const floatY = Math.sin(frame / 12) * 6;

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
        <ListFilter size={24} color={THEME.colors.accentCyan} />
        <span
          style={{
            fontFamily: THEME.fonts.code,
            fontSize: "26px",
            fontWeight: 800,
            color: THEME.colors.accentCyan,
            letterSpacing: "1.5px",
          }}
        >
          STATUS CODES 📊
        </span>
      </div>

      {/* Main Dual Status Arena */}
      <div
        style={{
          width: "840px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          transform: `translateY(${floatY}px)`,
        }}
      >
        {/* Card 1: 200 OK (SUCCESS) */}
        <div
          style={{
            padding: "32px 36px",
            borderRadius: "26px",
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 78, 59, 0.3))",
            border: `2px solid ${THEME.colors.accentEmerald}`,
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.8), 0 0 35px rgba(16, 185, 129, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transform: `scale(${okSpring})`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "20px",
                background: "rgba(16, 185, 129, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircle2 size={42} color={THEME.colors.accentEmerald} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontFamily: THEME.fonts.sans, fontSize: "36px", fontWeight: 900, color: "#FFFFFF" }}>
                200 OK
              </span>
              <span style={{ fontFamily: THEME.fonts.code, fontSize: "20px", color: THEME.colors.accentEmerald }}>
                REQUEST SUCCESSFUL
              </span>
            </div>
          </div>

          <div
            style={{
              padding: "10px 20px",
              borderRadius: "14px",
              background: "rgba(16, 185, 129, 0.25)",
              border: `1.5px solid ${THEME.colors.accentEmerald}`,
              fontFamily: THEME.fonts.code,
              fontSize: "18px",
              fontWeight: 800,
              color: THEME.colors.accentEmerald,
            }}
          >
            SUCCESS
          </div>
        </div>

        {/* Card 2: 404 NOT FOUND (ERROR) */}
        {frame >= 100 && (
          <div
            style={{
              padding: "32px 36px",
              borderRadius: "26px",
              background: "linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(136, 19, 55, 0.3))",
              border: `2px solid ${THEME.colors.accentRose}`,
              boxShadow: "0 15px 40px rgba(0, 0, 0, 0.8), 0 0 35px rgba(244, 63, 94, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transform: `scale(${notFoundSpring})`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "20px",
                  background: "rgba(244, 63, 94, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AlertTriangle size={42} color={THEME.colors.accentRose} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ fontFamily: THEME.fonts.sans, fontSize: "36px", fontWeight: 900, color: "#FFFFFF" }}>
                  404 NOT FOUND
                </span>
                <span style={{ fontFamily: THEME.fonts.code, fontSize: "20px", color: THEME.colors.accentRose }}>
                  RESOURCE NOT FOUND
                </span>
              </div>
            </div>

            <div
              style={{
                padding: "10px 20px",
                borderRadius: "14px",
                background: "rgba(244, 63, 94, 0.25)",
                border: `1.5px solid ${THEME.colors.accentRose}`,
                fontFamily: THEME.fonts.code,
                fontSize: "18px",
                fontWeight: 800,
                color: THEME.colors.accentRose,
              }}
            >
              CLIENT ERROR
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

