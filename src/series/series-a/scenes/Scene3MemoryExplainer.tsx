import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Cpu, Zap, XCircle, AlertTriangle, ArrowDown, Database, Radio } from "lucide-react";
import { THEME } from "../../../core/theme";

export const Scene3MemoryExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Chips entrance
  const chipsEntrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Phase 2: Comparator stamp slam (frame 45+)
  const stampEntrance = spring({
    frame: frame - 45,
    fps,
    config: { damping: 10, stiffness: 160 },
  });

  // Phase 3: Impact on child component (frame 95+)
  const impactEntrance = spring({
    frame: frame - 95,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Laser scanner sweep across memory chips
  const laserX = interpolate(frame % 50, [0, 50], [-100, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Child component shake when re-render triggers (from frame 105)
  const shake = frame > 105 ? Math.sin((frame - 105) * 2.2) * 8 : 0;
  const pulseAlarm = 0.5 + 0.5 * Math.sin(frame / 3.5);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "16px 8px",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* 1. Header: Concept Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 28px",
          borderRadius: "999px",
          backgroundColor: "rgba(56, 189, 248, 0.15)",
          border: `2px solid ${THEME.colors.accentCyan}`,
          boxShadow: "0 0 30px rgba(56, 189, 248, 0.35)",
        }}
      >
        <Cpu size={28} color={THEME.colors.accentCyan} />
        <span
          style={{
            fontSize: "24px",
            fontWeight: 950,
            color: THEME.colors.accentCyan,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          CƠ CHẾ SO SÁNH OBJECT.IS CỦA REACT
        </span>
      </div>

      {/* 2. Interactive Graphic: Dual RAM Memory Modules (Substantial, Tall & Sleek) */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "18px",
          opacity: chipsEntrance,
          transform: `scale(${chipsEntrance})`,
        }}
      >
        {/* Memory Module A (Render 1) */}
        <div
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "26px 20px",
            borderRadius: "24px",
            background: "linear-gradient(180deg, #1E293B 0%, #0B132B 100%)",
            border: `2px solid ${THEME.colors.accentCyan}`,
            boxShadow: "0 15px 40px rgba(56, 189, 248, 0.25)",
            overflow: "hidden",
          }}
        >
          {/* Laser Scanner beam overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${50 + laserX}%`,
              width: "4px",
              background: `linear-gradient(180deg, transparent, ${THEME.colors.accentCyan}, transparent)`,
              boxShadow: `0 0 18px ${THEME.colors.accentCyan}`,
            }}
          />

          {/* Top Chip Pins Graphic */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  width: "8px",
                  height: "12px",
                  backgroundColor: THEME.colors.accentCyan,
                  borderRadius: "2px",
                  opacity: 0.8,
                }}
              />
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <Database size={18} color={THEME.colors.accentCyan} />
            <span
              style={{
                fontSize: "17px",
                fontWeight: 800,
                color: THEME.colors.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              LẦN RENDER 1
            </span>
          </div>

          <div
            style={{
              fontSize: "36px",
              fontWeight: 950,
              fontFamily: "JetBrains Mono, monospace",
              color: THEME.colors.accentCyan,
              backgroundColor: "rgba(56, 189, 248, 0.14)",
              padding: "8px 20px",
              borderRadius: "14px",
              border: `1.5px solid ${THEME.colors.accentCyan}`,
              boxShadow: "0 0 20px rgba(56, 189, 248, 0.2)",
              marginBottom: "16px",
            }}
          >
            0x1A4F
          </div>

          <div
            style={{
              fontSize: "20px",
              fontFamily: "JetBrains Mono, monospace",
              color: THEME.colors.textPrimary,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              padding: "10px 16px",
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              textAlign: "center",
              width: "100%",
            }}
          >
            {`{ role: "admin" }`}
          </div>

          <span
            style={{
              marginTop: "14px",
              fontSize: "16px",
              fontWeight: 800,
              color: THEME.colors.accentCyan,
              letterSpacing: "0.02em",
            }}
          >
            Ô NHỚ CŨ (RAM #1)
          </span>
        </div>

        {/* Center Comparison Evaluator VS Symbol */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "999px",
              backgroundColor: "rgba(244, 63, 94, 0.2)",
              border: `2px solid ${THEME.colors.accentRose}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 ${25 * pulseAlarm}px rgba(244, 63, 94, 0.6)`,
            }}
          >
            <Zap size={30} color={THEME.colors.accentRose} />
          </div>
          <span
            style={{
              fontSize: "15px",
              fontWeight: 900,
              color: THEME.colors.textMuted,
              letterSpacing: "0.06em",
            }}
          >
            SO SÁNH
          </span>
        </div>

        {/* Memory Module B (Render 2 - New Allocation) */}
        <div
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "26px 20px",
            borderRadius: "24px",
            background: "linear-gradient(180deg, #3B1219 0%, #17090C 100%)",
            border: `2px solid ${THEME.colors.accentRose}`,
            boxShadow: `0 15px 40px rgba(244, 63, 94, ${0.25 + pulseAlarm * 0.25})`,
            overflow: "hidden",
          }}
        >
          {/* Laser Scanner beam overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${50 - laserX}%`,
              width: "4px",
              background: `linear-gradient(180deg, transparent, ${THEME.colors.accentRose}, transparent)`,
              boxShadow: `0 0 18px ${THEME.colors.accentRose}`,
            }}
          />

          {/* Top Chip Pins Graphic */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  width: "8px",
                  height: "12px",
                  backgroundColor: THEME.colors.accentRose,
                  borderRadius: "2px",
                  opacity: 0.8,
                }}
              />
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <Database size={18} color={THEME.colors.accentRose} />
            <span
              style={{
                fontSize: "17px",
                fontWeight: 800,
                color: THEME.colors.accentRose,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              LẦN RENDER 2
            </span>
          </div>

          <div
            style={{
              fontSize: "36px",
              fontWeight: 950,
              fontFamily: "JetBrains Mono, monospace",
              color: THEME.colors.accentRose,
              backgroundColor: "rgba(244, 63, 94, 0.18)",
              padding: "8px 20px",
              borderRadius: "14px",
              border: `1.5px solid ${THEME.colors.accentRose}`,
              boxShadow: "0 0 20px rgba(244, 63, 94, 0.25)",
              marginBottom: "16px",
            }}
          >
            0x89C2
          </div>

          <div
            style={{
              fontSize: "20px",
              fontFamily: "JetBrains Mono, monospace",
              color: THEME.colors.textPrimary,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              padding: "10px 16px",
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              textAlign: "center",
              width: "100%",
            }}
          >
            {`{ role: "admin" }`}
          </div>

          <span
            style={{
              marginTop: "14px",
              fontSize: "16px",
              fontWeight: 800,
              color: THEME.colors.accentRose,
              letterSpacing: "0.02em",
            }}
          >
            Ô NHỚ MỚI (RAM #2) ❌
          </span>
        </div>
      </div>

      {/* 3. Comparator Verdict Stamp (Object.is Mismatch Result) */}
      <div
        style={{
          transform: frame >= 45 ? `scale(${stampEntrance})` : "scale(0.8)",
          opacity: frame >= 45 ? stampEntrance : 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "18px",
            padding: "20px 32px",
            borderRadius: "22px",
            backgroundColor: "rgba(244, 63, 94, 0.25)",
            border: `2px solid ${THEME.colors.accentRose}`,
            boxShadow: "0 0 40px rgba(244, 63, 94, 0.7)",
            width: "100%",
          }}
        >
          <XCircle size={38} color={THEME.colors.accentRose} style={{ flexShrink: 0 }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span
              style={{
                fontSize: "32px",
                fontWeight: 950,
                fontFamily: "JetBrains Mono, monospace",
                color: "#FFFFFF",
                letterSpacing: "0.04em",
              }}
            >
              0x1A4F !== 0x89C2
            </span>
            <span
              style={{
                fontSize: "20px",
                fontWeight: 900,
                color: THEME.colors.accentRose,
                marginTop: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.02em",
              }}
            >
              Object.is() BÁO FALSE ➔ KHÁC THAM CHIẾU!
            </span>
          </div>
        </div>
      </div>

      {/* 4. Impact Trigger: Animated Down Arrow into Child Component */}
      <div
        style={{
          transform:
            frame >= 95
              ? `scale(${impactEntrance}) translateY(${shake}px)`
              : "scale(0.8)",
          opacity: frame >= 95 ? impactEntrance : 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <ArrowDown size={36} color={THEME.colors.accentRose} />

        {/* Child Component Suffering Unnecessary Re-render */}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            padding: "24px 28px",
            borderRadius: "24px",
            background: "linear-gradient(135deg, rgba(244, 63, 94, 0.28) 0%, rgba(15, 23, 42, 0.95) 100%)",
            border: `2px solid ${THEME.colors.accentRose}`,
            boxShadow: `0 0 35px rgba(244, 63, 94, 0.5)`,
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "18px",
              backgroundColor: "rgba(244, 63, 94, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <AlertTriangle size={40} color={THEME.colors.accentRose} />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Radio size={22} color={THEME.colors.accentCyan} />
              <span
                style={{
                  fontSize: "26px",
                  fontWeight: 950,
                  fontFamily: "JetBrains Mono, monospace",
                  color: THEME.colors.textPrimary,
                }}
              >
                &lt;UserCard /&gt; (Component con)
              </span>
            </div>
            <span
              style={{
                fontSize: "20px",
                fontWeight: 900,
                color: THEME.colors.accentRose,
                marginTop: "6px",
              }}
            >
              BỊ ÉP RE-RENDER LẠI TOÀN BỘ DOM VÔ ÍCH! 💥
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
