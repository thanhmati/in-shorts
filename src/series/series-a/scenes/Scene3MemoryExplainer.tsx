import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Cpu, Zap, XCircle, AlertTriangle, ArrowDown, Layers } from "lucide-react";
import { THEME } from "../../../core/theme";

export const Scene3MemoryExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Chips entrance (frames 0 - 30)
  const chipsEntrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 110 },
  });

  // Phase 2: Comparator stamp slam (frames 70 - 110)
  const stampEntrance = spring({
    frame: frame - 70,
    fps,
    config: { damping: 10, stiffness: 180 },
  });

  // Phase 3: Impact on child component (frames 130+)
  const impactEntrance = spring({
    frame: frame - 130,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Laser scanner sweep across memory chips (continuous)
  const laserX = interpolate(frame % 60, [0, 60], [-100, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Child component shake when re-render triggers (from frame 140)
  const shake = frame > 140 ? Math.sin((frame - 140) * 1.8) * 6 : 0;
  const pulseAlarm = 0.5 + 0.5 * Math.sin(frame / 4);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: "0 10px",
        gap: "20px",
      }}
    >
      {/* 1. Header: Concept Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 24px",
          borderRadius: "999px",
          backgroundColor: "rgba(56, 189, 248, 0.15)",
          border: `2px solid ${THEME.colors.accentCyan}`,
          boxShadow: "0 0 25px rgba(56, 189, 248, 0.3)",
        }}
      >
        <Cpu size={26} color={THEME.colors.accentCyan} />
        <span
          style={{
            fontSize: "22px",
            fontWeight: 900,
            color: THEME.colors.accentCyan,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          CƠ CHẾ SO SÁNH OBJECT.IS CỦA REACT
        </span>
      </div>

      {/* 2. Interactive Graphic: Dual RAM Memory Modules */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          opacity: chipsEntrance,
          transform: `scale(${chipsEntrance})`,
        }}
      >
        {/* Memory Slot A (Render 1) */}
        <div
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px 16px",
            borderRadius: "20px",
            background: "linear-gradient(180deg, #1E293B 0%, #0F172A 100%)",
            border: `2px solid ${THEME.colors.accentCyan}`,
            boxShadow: "0 10px 30px rgba(56, 189, 248, 0.25)",
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
              boxShadow: `0 0 15px ${THEME.colors.accentCyan}`,
            }}
          />

          <span
            style={{
              fontSize: "15px",
              fontWeight: 800,
              color: THEME.colors.textMuted,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "6px",
            }}
          >
            LẦN RENDER 1
          </span>

          <div
            style={{
              fontSize: "28px",
              fontWeight: 950,
              fontFamily: "JetBrains Mono, monospace",
              color: THEME.colors.accentCyan,
              backgroundColor: "rgba(56, 189, 248, 0.12)",
              padding: "6px 14px",
              borderRadius: "10px",
              border: `1px solid ${THEME.colors.accentCyan}`,
              marginBottom: "12px",
            }}
          >
            0x1A4F
          </div>

          <div
            style={{
              fontSize: "17px",
              fontFamily: "JetBrains Mono, monospace",
              color: THEME.colors.textPrimary,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              textAlign: "center",
              width: "100%",
            }}
          >
            {`{ role: "admin" }`}
          </div>

          <span
            style={{
              marginTop: "10px",
              fontSize: "14px",
              fontWeight: 700,
              color: THEME.colors.accentCyan,
            }}
          >
            Ô nhớ RAM #1
          </span>
        </div>

        {/* Center Scanner Beam / Comparison VS Symbol */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "999px",
              backgroundColor: "rgba(244, 63, 94, 0.2)",
              border: `2px solid ${THEME.colors.accentRose}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 ${20 * pulseAlarm}px rgba(244, 63, 94, 0.5)`,
            }}
          >
            <Zap size={26} color={THEME.colors.accentRose} />
          </div>
          <span
            style={{
              fontSize: "14px",
              fontWeight: 900,
              color: THEME.colors.textMuted,
            }}
          >
            SO SÁNH
          </span>
        </div>

        {/* Memory Slot B (Render 2 - New Allocation) */}
        <div
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px 16px",
            borderRadius: "20px",
            background: "linear-gradient(180deg, #2D151D 0%, #0F172A 100%)",
            border: `2px solid ${THEME.colors.accentRose}`,
            boxShadow: `0 10px 30px rgba(244, 63, 94, ${0.2 + pulseAlarm * 0.2})`,
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
              boxShadow: `0 0 15px ${THEME.colors.accentRose}`,
            }}
          />

          <span
            style={{
              fontSize: "15px",
              fontWeight: 800,
              color: THEME.colors.accentRose,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "6px",
            }}
          >
            LẦN RENDER 2
          </span>

          <div
            style={{
              fontSize: "28px",
              fontWeight: 950,
              fontFamily: "JetBrains Mono, monospace",
              color: THEME.colors.accentRose,
              backgroundColor: "rgba(244, 63, 94, 0.15)",
              padding: "6px 14px",
              borderRadius: "10px",
              border: `1px solid ${THEME.colors.accentRose}`,
              marginBottom: "12px",
            }}
          >
            0x89C2
          </div>

          <div
            style={{
              fontSize: "17px",
              fontFamily: "JetBrains Mono, monospace",
              color: THEME.colors.textPrimary,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              textAlign: "center",
              width: "100%",
            }}
          >
            {`{ role: "admin" }`}
          </div>

          <span
            style={{
              marginTop: "10px",
              fontSize: "14px",
              fontWeight: 700,
              color: THEME.colors.accentRose,
            }}
          >
            Ô nhớ MỚI #2 ❌
          </span>
        </div>
      </div>

      {/* 3. Comparator Verdict Stamp (Object.is Mismatch Result) */}
      {frame >= 70 && (
        <div
          style={{
            transform: `scale(${stampEntrance})`,
            opacity: stampEntrance,
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
              gap: "14px",
              padding: "16px 28px",
              borderRadius: "18px",
              backgroundColor: "rgba(244, 63, 94, 0.25)",
              border: `2px solid ${THEME.colors.accentRose}`,
              boxShadow: "0 0 35px rgba(244, 63, 94, 0.6)",
              width: "100%",
            }}
          >
            <XCircle size={32} color={THEME.colors.accentRose} style={{ flexShrink: 0 }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span
                style={{
                  fontSize: "26px",
                  fontWeight: 950,
                  fontFamily: "JetBrains Mono, monospace",
                  color: "#FFFFFF",
                  letterSpacing: "0.02em",
                }}
              >
                0x1A4F !== 0x89C2
              </span>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: THEME.colors.accentRose,
                  marginTop: "2px",
                }}
              >
                Object.is() BÁO FALSE ➔ KHÁC THAM CHIẾU!
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Impact Trigger: Animated Down Arrow into Child Component */}
      {frame >= 120 && (
        <div
          style={{
            transform: `scale(${impactEntrance}) translateY(${shake}px)`,
            opacity: impactEntrance,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <ArrowDown size={32} color={THEME.colors.accentRose} />

          {/* Child Component Suffering Unnecessary Re-render */}
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "20px 24px",
              borderRadius: "22px",
              background: "linear-gradient(135deg, rgba(244, 63, 94, 0.22) 0%, rgba(15, 23, 42, 0.9) 100%)",
              border: `2px solid ${THEME.colors.accentRose}`,
              boxShadow: `0 0 30px rgba(244, 63, 94, 0.4)`,
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                backgroundColor: "rgba(244, 63, 94, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <AlertTriangle size={34} color={THEME.colors.accentRose} />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Layers size={20} color={THEME.colors.accentCyan} />
                <span
                  style={{
                    fontSize: "22px",
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
                  fontSize: "18px",
                  fontWeight: 800,
                  color: THEME.colors.accentRose,
                  marginTop: "4px",
                }}
              >
                BỊ ÉP RE-RENDER LẠI TOÀN BỘ DOM VÔ ÍCH! ❌
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
