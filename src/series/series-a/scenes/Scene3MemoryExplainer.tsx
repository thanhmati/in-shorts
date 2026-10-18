import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Cpu, Zap, XCircle, AlertTriangle, User, RefreshCw, HardDrive } from "lucide-react";
import { THEME } from "../../../core/theme";

export const Scene3MemoryExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Chips entrance (frames 0 - 25)
  const chipsEntrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 110 },
  });

  // Phase 2: Comparator stamp slam (frames 45+)
  const stampEntrance = spring({
    frame: frame - 45,
    fps,
    config: { damping: 10, stiffness: 160 },
  });

  // Phase 3: Impact on child component (frames 90+)
  const impactEntrance = spring({
    frame: frame - 90,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Laser scanner sweep across memory chips
  const laserX = interpolate(frame % 45, [0, 45], [-100, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Electric pulse and alarm flicker
  const pulseAlarm = 0.5 + 0.5 * Math.sin(frame / 3.5);
  const shake = frame > 100 ? Math.sin((frame - 100) * 2.5) * 6 : 0;
  const spinAngle = (frame * 6) % 360;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: "0 6px",
        gap: "22px",
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

      {/* 2. Interactive Graphic: Dual RAM Memory Modules */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "space-between",
          gap: "16px",
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
            padding: "24px 18px",
            borderRadius: "24px",
            background: "linear-gradient(180deg, #1E293B 0%, #0B132B 100%)",
            border: `2.5px solid ${THEME.colors.accentCyan}`,
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
              boxShadow: `0 0 20px ${THEME.colors.accentCyan}`,
            }}
          />

          {/* Top Chip Contacts */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  width: "10px",
                  height: "14px",
                  backgroundColor: THEME.colors.accentCyan,
                  borderRadius: "2px",
                  opacity: 0.85,
                }}
              />
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <HardDrive size={20} color={THEME.colors.accentCyan} />
            <span
              style={{
                fontSize: "17px",
                fontWeight: 800,
                color: THEME.colors.textMuted,
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
              backgroundColor: "rgba(56, 189, 248, 0.16)",
              padding: "8px 22px",
              borderRadius: "14px",
              border: `1.5px solid ${THEME.colors.accentCyan}`,
              boxShadow: "0 0 25px rgba(56, 189, 248, 0.3)",
              marginBottom: "14px",
            }}
          >
            0x1A4F
          </div>

          <div
            style={{
              fontSize: "19px",
              fontFamily: "JetBrains Mono, monospace",
              color: THEME.colors.textPrimary,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
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
              marginTop: "12px",
              fontSize: "15px",
              fontWeight: 800,
              color: THEME.colors.accentCyan,
            }}
          >
            Ô NHỚ RAM #1
          </span>
        </div>

        {/* Center Scanner Beam / Comparison VS Symbol */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "999px",
              backgroundColor: "rgba(244, 63, 94, 0.2)",
              border: `2px solid ${THEME.colors.accentRose}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 ${30 * pulseAlarm}px rgba(244, 63, 94, 0.7)`,
            }}
          >
            <Zap size={32} color={THEME.colors.accentRose} />
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
            padding: "24px 18px",
            borderRadius: "24px",
            background: "linear-gradient(180deg, #3B1219 0%, #17090C 100%)",
            border: `2.5px solid ${THEME.colors.accentRose}`,
            boxShadow: `0 15px 40px rgba(244, 63, 94, ${0.3 + pulseAlarm * 0.3})`,
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
              boxShadow: `0 0 20px ${THEME.colors.accentRose}`,
            }}
          />

          {/* Top Chip Contacts */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  width: "10px",
                  height: "14px",
                  backgroundColor: THEME.colors.accentRose,
                  borderRadius: "2px",
                  opacity: 0.85,
                }}
              />
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <HardDrive size={20} color={THEME.colors.accentRose} />
            <span
              style={{
                fontSize: "17px",
                fontWeight: 800,
                color: THEME.colors.accentRose,
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
              backgroundColor: "rgba(244, 63, 94, 0.2)",
              padding: "8px 22px",
              borderRadius: "14px",
              border: `1.5px solid ${THEME.colors.accentRose}`,
              boxShadow: "0 0 25px rgba(244, 63, 94, 0.3)",
              marginBottom: "14px",
            }}
          >
            0x89C2
          </div>

          <div
            style={{
              fontSize: "19px",
              fontFamily: "JetBrains Mono, monospace",
              color: THEME.colors.textPrimary,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
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
              marginTop: "12px",
              fontSize: "15px",
              fontWeight: 800,
              color: THEME.colors.accentRose,
            }}
          >
            Ô NHỚ MỚI #2 ❌
          </span>
        </div>
      </div>

      {/* 3. Comparator Verdict Stamp: 0x1A4F !== 0x89C2 */}
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
            boxShadow: "0 0 45px rgba(244, 63, 94, 0.75)",
            width: "100%",
          }}
        >
          <XCircle size={40} color={THEME.colors.accentRose} style={{ flexShrink: 0 }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span
              style={{
                fontSize: "34px",
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
                letterSpacing: "0.02em",
                textTransform: "uppercase",
              }}
            >
              Object.is() BÁO FALSE ➔ KHÁC THAM CHIẾU!
            </span>
          </div>
        </div>
      </div>

      {/* 4. Target Child Component Simulated UI Preview */}
      <div
        style={{
          transform:
            frame >= 90
              ? `scale(${impactEntrance}) translateY(${shake}px)`
              : "scale(0.85)",
          opacity: frame >= 90 ? impactEntrance : 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {/* Animated UI Card of <UserCard /> */}
        <div
          style={{
            width: "100%",
            borderRadius: "26px",
            background: "linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)",
            border: `2.5px solid ${frame > 100 ? THEME.colors.accentRose : "rgba(255, 255, 255, 0.15)"}`,
            boxShadow: frame > 100 ? `0 0 40px rgba(244, 63, 94, 0.6)` : "0 20px 50px rgba(0,0,0,0.5)",
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          {/* Card Header with Component Tag */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: 950,
                  fontFamily: "JetBrains Mono, monospace",
                  color: THEME.colors.accentCyan,
                }}
              >
                &lt;UserCard /&gt;
              </span>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: THEME.colors.textMuted,
                }}
              >
                (Component con)
              </span>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "999px",
                backgroundColor: frame > 100 ? "rgba(244, 63, 94, 0.25)" : "rgba(255, 255, 255, 0.1)",
                border: `1.5px solid ${frame > 100 ? THEME.colors.accentRose : "rgba(255, 255, 255, 0.2)"}`,
                color: frame > 100 ? THEME.colors.accentRose : THEME.colors.textMuted,
                fontSize: "16px",
                fontWeight: 900,
              }}
            >
              <RefreshCw
                size={18}
                style={{ transform: frame > 100 ? `rotate(${spinAngle}deg)` : "none" }}
              />
              <span>{frame > 100 ? "ĐANG RE-RENDER!" : "Chờ render..."}</span>
            </div>
          </div>

          {/* Child Component Simulated Content: User Profile Item */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              borderRadius: "18px",
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, #38BDF8 0%, #1D4ED8 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <User size={26} color="#FFFFFF" />
              </div>
              <div>
                <div style={{ fontSize: "20px", fontWeight: 800, color: THEME.colors.textPrimary }}>
                  Admin User
                </div>
                <div style={{ fontSize: "15px", color: THEME.colors.textMuted, fontWeight: 600 }}>
                  Role: admin • Theme: dark
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: "16px",
                fontWeight: 800,
                color: THEME.colors.accentEmerald,
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                padding: "6px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(16, 185, 129, 0.3)",
              }}
            >
              Dữ liệu không đổi
            </div>
          </div>

          {/* Alarm Banner at bottom of UserCard */}
          {frame > 100 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 18px",
                borderRadius: "14px",
                backgroundColor: "rgba(244, 63, 94, 0.2)",
                border: `1.5px solid ${THEME.colors.accentRose}`,
              }}
            >
              <AlertTriangle size={26} color={THEME.colors.accentRose} style={{ flexShrink: 0 }} />
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 900,
                  color: THEME.colors.accentRose,
                  letterSpacing: "0.01em",
                }}
              >
                Props đổi tham chiếu (0x89C2) ➔ Buộc phải re-render lại toàn bộ DOM!
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
