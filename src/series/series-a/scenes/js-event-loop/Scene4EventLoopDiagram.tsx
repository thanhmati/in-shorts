import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  Layers,
  Crown,
  Clock,
  Zap,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { THEME } from "../../../../core/theme";

export const Scene4EventLoopDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gentle Entrance Spring for the whole scene (educational calm pace)
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 75 },
  });

  // -------------------------------------------------------------
  // 3 FOCUSED TIMELINE PHASES WITH SMOOTH, GENTLE CROSSFADES
  // Phase 1: Call Stack Sync Execution & Empty (0 - 175 frames / 5.8s)
  // Phase 2: Dual Queue Deep Dive - VIP vs Normal (160 - 430 frames / 9.0s)
  // Phase 3: Golden Iron Rule & Final Execution Order (415 - 595 frames / 6.0s)
  // -------------------------------------------------------------
  const showPhase1 = frame < 175;
  const showPhase2 = frame >= 160 && frame < 430;
  const showPhase3 = frame >= 415;

  // Phase 1 smooth transitions & holds
  const sync1Done = frame >= 50;
  const sync4Done = frame >= 95;
  const stackEmptySpring = spring({
    frame: Math.max(0, frame - 110),
    fps,
    config: { damping: 14, stiffness: 80 },
  });
  const phase1Opacity = interpolate(frame, [145, 175], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase1Y = interpolate(frame, [145, 175], [0, -25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2 smooth transitions & holds (relative to 160)
  const phase2Opacity = interpolate(frame, [160, 195, 395, 430], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase2Y = interpolate(frame, [160, 195], [25, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const microtaskSpring = spring({
    frame: Math.max(0, frame - 165),
    fps,
    config: { damping: 15, stiffness: 75 },
  });
  // setTimeout mentioned at global frame 914 -> local frame 329
  const macrotaskSpring = spring({
    frame: Math.max(0, frame - 320),
    fps,
    config: { damping: 15, stiffness: 75 },
  });

  // Phase 3 smooth transitions & holds (relative to 415)
  const phase3Opacity = interpolate(frame, [415, 445], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase3Y = interpolate(frame, [415, 445], [25, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const step1Spring = spring({
    frame: Math.max(0, frame - 435),
    fps,
    config: { damping: 14, stiffness: 80 },
  });
  const step2Spring = spring({
    frame: Math.max(0, frame - 495),
    fps,
    config: { damping: 14, stiffness: 80 },
  });
  const summarySpring = spring({
    frame: Math.max(0, frame - 535),
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  // Calm dynamic visual pulses (educational rate)
  const vipGlow = 0.6 + 0.4 * Math.sin(frame / 4);
  const reactorRotate = (frame * 3.5) % 360;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "0 10px",
        boxSizing: "border-box",
        transform: `scale(${entrance})`,
        opacity: entrance,
        position: "relative",
      }}
    >
      {/* ========================================================= */}
      {/* STAGE 1: CALL STACK & EMPTY (0 - 175 frames)              */}
      {/* ========================================================= */}
      {showPhase1 && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            alignItems: "center",
            opacity: phase1Opacity,
            transform: `translateY(${phase1Y}px)`,
          }}
        >
          {/* Top Step Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 24px",
              borderRadius: "999px",
              backgroundColor: "rgba(56, 189, 248, 0.15)",
              border: `2px solid ${THEME.colors.accentCyan}`,
              color: THEME.colors.accentCyan,
              fontSize: "20px",
              fontWeight: 900,
              letterSpacing: "0.04em",
            }}
          >
            <Layers size={24} />
            <span>BƯỚC 1: XỬ LÝ CODE ĐỒNG BỘ</span>
          </div>

          {/* Main Giant Call Stack Container */}
          <div
            style={{
              width: "100%",
              borderRadius: "28px",
              background: "linear-gradient(180deg, #1E293B 0%, #0F172A 100%)",
              border: `3px solid ${frame >= 110 ? THEME.colors.accentEmerald : THEME.colors.accentCyan}`,
              boxShadow: frame >= 110
                ? "0 15px 50px rgba(16, 185, 129, 0.35)"
                : "0 15px 50px rgba(56, 189, 248, 0.25)",
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span
                style={{
                  fontSize: "26px",
                  fontWeight: 950,
                  color: "#FFFFFF",
                  letterSpacing: "0.03em",
                }}
              >
                CALL STACK (THỰC THI NGAY)
              </span>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 900,
                  color: frame >= 110 ? THEME.colors.accentEmerald : THEME.colors.accentCyan,
                  padding: "6px 16px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              >
                {frame >= 110 ? "🟢 RỖNG" : "⚡ ĐANG CHẠY"}
              </span>
            </div>

            {/* 2 Sync Code Blocks */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* Sync line 1 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  borderRadius: "16px",
                  backgroundColor: sync1Done ? "rgba(16, 185, 129, 0.15)" : "rgba(30, 41, 59, 0.9)",
                  border: `2px solid ${sync1Done ? THEME.colors.accentEmerald : "rgba(255, 255, 255, 0.15)"}`,
                }}
              >
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: 900,
                    fontFamily: "JetBrains Mono, monospace",
                    color: sync1Done ? THEME.colors.accentEmerald : "#FFFFFF",
                  }}
                >
                  console.log("1")
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 900,
                    color: sync1Done ? THEME.colors.accentEmerald : THEME.colors.textMuted,
                  }}
                >
                  {sync1Done ? "➔ IN RA 1 ✅" : "Đang chạy..."}
                </span>
              </div>

              {/* Sync line 4 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  borderRadius: "16px",
                  backgroundColor: sync4Done ? "rgba(16, 185, 129, 0.15)" : "rgba(30, 41, 59, 0.9)",
                  border: `2px solid ${sync4Done ? THEME.colors.accentEmerald : "rgba(255, 255, 255, 0.15)"}`,
                }}
              >
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: 900,
                    fontFamily: "JetBrains Mono, monospace",
                    color: sync4Done ? THEME.colors.accentEmerald : "#FFFFFF",
                  }}
                >
                  console.log("4")
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 900,
                    color: sync4Done ? THEME.colors.accentEmerald : THEME.colors.textMuted,
                  }}
                >
                  {sync4Done ? "➔ IN RA 4 ✅" : "Đang chạy..."}
                </span>
              </div>
            </div>

            {/* Giant Empty Stack Stamp */}
            {frame >= 110 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "14px",
                  padding: "18px 24px",
                  borderRadius: "18px",
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  border: `2.5px solid ${THEME.colors.accentEmerald}`,
                  transform: `scale(${stackEmptySpring})`,
                }}
              >
                <CheckCircle2 size={36} color={THEME.colors.accentEmerald} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: 950,
                      color: "#FFFFFF",
                      letterSpacing: "0.02em",
                    }}
                  >
                    CALL STACK ĐÃ RỖNG HOÀN TOÀN!
                  </span>
                  <span style={{ fontSize: "17px", fontWeight: 700, color: THEME.colors.accentEmerald }}>
                    Event Loop bắt đầu kiểm tra 2 hàng đợi bất đồng bộ...
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STAGE 2: DUAL QUEUE DEEP DIVE (160 - 430 frames)          */}
      {/* ========================================================= */}
      {showPhase2 && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
            opacity: phase2Opacity,
            transform: `translateY(${phase2Y}px)`,
          }}
        >
          {/* Top Stage Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 24px",
              borderRadius: "999px",
              backgroundColor: "rgba(251, 191, 36, 0.15)",
              border: `2px solid ${THEME.colors.accentAmber}`,
              color: THEME.colors.accentAmber,
              fontSize: "20px",
              fontWeight: 900,
            }}
          >
            <Zap size={24} style={{ transform: `rotate(${reactorRotate}deg)` }} />
            <span>BƯỚC 2: PHÂN LOẠI 2 HÀNG ĐỢI BẤT ĐỒNG BỘ</span>
          </div>

          {/* CARD 1 (FULL WIDTH): 👑 MICROTASK QUEUE (VIP) */}
          <div
            style={{
              width: "100%",
              borderRadius: "24px",
              background: "linear-gradient(135deg, #064E3B 0%, #06261E 100%)",
              border: `3px solid ${THEME.colors.accentEmerald}`,
              boxShadow: `0 10px 40px rgba(16, 185, 129, ${0.4 * vipGlow})`,
              padding: "24px 26px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              transform: `scale(${microtaskSpring})`,
            }}
          >
            {/* Card Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Crown size={32} color={THEME.colors.accentAmber} />
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: 950,
                    color: THEME.colors.accentEmerald,
                    letterSpacing: "0.03em",
                  }}
                >
                  MICROTASK QUEUE (HÀNG ĐỢI VIP)
                </span>
              </div>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 950,
                  color: "#000000",
                  backgroundColor: THEME.colors.accentEmerald,
                  padding: "4px 14px",
                  borderRadius: "999px",
                  letterSpacing: "0.04em",
                }}
              >
                ƯU TIÊN SỐ 1
              </span>
            </div>

            {/* Code Inside Microtask */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderRadius: "16px",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                border: "2px solid rgba(16, 185, 129, 0.5)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Sparkles size={22} color={THEME.colors.accentEmerald} />
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: 900,
                    fontFamily: "JetBrains Mono, monospace",
                    color: "#FFFFFF",
                  }}
                >
                  Promise.then(() =&gt; log("3"))
                </span>
              </div>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 900,
                  color: THEME.colors.accentEmerald,
                  padding: "4px 12px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                }}
              >
                CÓ VÉ VIP 👑
              </span>
            </div>

            <div style={{ fontSize: "17px", fontWeight: 700, color: "#A7F3D0" }}>
              ➔ Event Loop sẽ bốc hết sạch Microtask trước khi đoái hoài Macrotask!
            </div>
          </div>

          {/* CARD 2 (FULL WIDTH): ⏳ MACROTASK QUEUE (THƯỜNG) */}
          {frame >= 320 && (
            <div
              style={{
                width: "100%",
                borderRadius: "24px",
                background: "linear-gradient(135deg, #451A03 0%, #1F0B02 100%)",
                border: "3px solid #F59E0B",
                boxShadow: "0 10px 40px rgba(245, 158, 11, 0.3)",
                padding: "24px 26px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                transform: `scale(${macrotaskSpring})`,
              }}
            >
              {/* Card Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Clock size={30} color={THEME.colors.accentAmber} />
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: 950,
                      color: THEME.colors.accentAmber,
                      letterSpacing: "0.03em",
                    }}
                  >
                    MACROTASK QUEUE (HÀNG ĐỢI THƯỜNG)
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 950,
                    color: "#000000",
                    backgroundColor: THEME.colors.accentAmber,
                    padding: "4px 14px",
                    borderRadius: "999px",
                    letterSpacing: "0.04em",
                  }}
                >
                  ƯU TIÊN SAU
                </span>
              </div>

              {/* Code Inside Macrotask */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  borderRadius: "16px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  border: "2px solid rgba(245, 158, 11, 0.5)",
                }}
              >
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: 900,
                    fontFamily: "JetBrains Mono, monospace",
                    color: "#FFFFFF",
                  }}
                >
                  setTimeout(() =&gt; log("2"), 0)
                </span>
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 900,
                    color: "#FCA5A5",
                    padding: "4px 12px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(239, 68, 68, 0.2)",
                    border: "1px solid rgba(239, 68, 68, 0.4)",
                  }}
                >
                  PHẢI CHỜ ĐỢI ⏳
                </span>
              </div>

              <div style={{ fontSize: "17px", fontWeight: 700, color: "#FDE68A" }}>
                ➔ Dù set 0 mili-giây, nó vẫn phải đứng sau hàng đợi VIP!
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* STAGE 3: NGUYÊN TẮC THÉP & THỨ TỰ BỐC TASK (415 - 595)    */}
      {/* ========================================================= */}
      {showPhase3 && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
            opacity: phase3Opacity,
            transform: `translateY(${phase3Y}px)`,
          }}
        >
          {/* Header Banner */}
          <div
            style={{
              width: "100%",
              padding: "16px 22px",
              borderRadius: "20px",
              backgroundColor: "rgba(244, 63, 94, 0.2)",
              border: `2.5px solid ${THEME.colors.accentRose}`,
              boxShadow: "0 0 35px rgba(244, 63, 94, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <ShieldAlert size={36} color={THEME.colors.accentRose} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 950,
                  color: THEME.colors.accentRose,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                NGUYÊN TẮC THÉP CỦA EVENT LOOP
              </span>
              <span style={{ fontSize: "18px", fontWeight: 800, color: "#FFFFFF" }}>
                Luôn vét sạch Microtask trước khi chạm Macrotask!
              </span>
            </div>
          </div>

          {/* Execution Step 1: VIP Runs First */}
          {frame >= 435 && (
            <div
              style={{
                width: "100%",
                padding: "20px 24px",
                borderRadius: "20px",
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                border: `2px solid ${THEME.colors.accentEmerald}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transform: `scale(${step1Spring})`,
                boxShadow: "0 10px 30px rgba(16, 185, 129, 0.25)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <Crown size={36} color={THEME.colors.accentAmber} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "22px", fontWeight: 950, color: THEME.colors.accentEmerald }}>
                    LƯỢT 1: BỐC MICROTASK (VIP)
                  </span>
                  <span style={{ fontSize: "17px", fontWeight: 700, color: "#E2E8F0" }}>
                    Promise chạy trước ➔ In ra số 3!
                  </span>
                </div>
              </div>

              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "14px",
                  backgroundColor: "rgba(16, 185, 129, 0.3)",
                  border: `2.5px solid ${THEME.colors.accentEmerald}`,
                  color: THEME.colors.accentEmerald,
                  fontSize: "32px",
                  fontWeight: 950,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "JetBrains Mono, monospace",
                  boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)",
                }}
              >
                3
              </div>
            </div>
          )}

          {/* Execution Step 2: Macrotask Runs Afterwards */}
          {frame >= 495 && (
            <div
              style={{
                width: "100%",
                padding: "20px 24px",
                borderRadius: "20px",
                backgroundColor: "rgba(245, 158, 11, 0.15)",
                border: `2px solid ${THEME.colors.accentAmber}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transform: `scale(${step2Spring})`,
                boxShadow: "0 10px 30px rgba(245, 158, 11, 0.25)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <Clock size={34} color={THEME.colors.accentAmber} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "22px", fontWeight: 950, color: THEME.colors.accentAmber }}>
                    LƯỢT 2: MICROTASK ĐÃ HẾT
                  </span>
                  <span style={{ fontSize: "17px", fontWeight: 700, color: "#E2E8F0" }}>
                    Mới bốc setTimeout ➔ In ra số 2!
                  </span>
                </div>
              </div>

              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "14px",
                  backgroundColor: "rgba(245, 158, 11, 0.3)",
                  border: `2.5px solid ${THEME.colors.accentAmber}`,
                  color: THEME.colors.accentAmber,
                  fontSize: "32px",
                  fontWeight: 950,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "JetBrains Mono, monospace",
                  boxShadow: "0 0 20px rgba(245, 158, 11, 0.5)",
                }}
              >
                2
              </div>
            </div>
          )}

          {/* Master Output Formula Box */}
          {frame >= 535 && (
            <div
              style={{
                width: "100%",
                padding: "20px 24px",
                borderRadius: "22px",
                backgroundColor: "#030712",
                border: "2.5px solid rgba(255, 255, 255, 0.25)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                transform: `scale(${summarySpring})`,
                boxShadow: "0 15px 45px rgba(0, 0, 0, 0.8)",
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 950,
                  color: THEME.colors.textMuted,
                  letterSpacing: "0.06em",
                }}
              >
                THỨ TỰ CONSOLE.LOG THỰC TẾ CHÍNH XÁC:
              </span>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span
                  style={{
                    fontSize: "32px",
                    fontWeight: 950,
                    color: THEME.colors.accentCyan,
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  1
                </span>
                <ArrowRight size={26} color={THEME.colors.textMuted} />
                <span
                  style={{
                    fontSize: "32px",
                    fontWeight: 950,
                    color: THEME.colors.accentCyan,
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  4
                </span>
                <ArrowRight size={26} color={THEME.colors.textMuted} />
                <span
                  style={{
                    fontSize: "34px",
                    fontWeight: 950,
                    color: THEME.colors.accentEmerald,
                    fontFamily: "JetBrains Mono, monospace",
                    textShadow: "0 0 20px rgba(16, 185, 129, 0.8)",
                  }}
                >
                  3 (VIP)
                </span>
                <ArrowRight size={26} color={THEME.colors.textMuted} />
                <span
                  style={{
                    fontSize: "32px",
                    fontWeight: 950,
                    color: THEME.colors.accentAmber,
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  2
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
