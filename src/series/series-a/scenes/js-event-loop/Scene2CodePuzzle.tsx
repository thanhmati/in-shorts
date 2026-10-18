import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AlertCircle, Flame, Clock, ArrowRight, XCircle } from "lucide-react";
import { MacWindow } from "../../../../core/MacWindow";
import { CodeBlock } from "../../../../core/CodeBlock";
import { THEME } from "../../../../core/theme";

interface Scene2CodePuzzleProps {
  code: string;
}

export const Scene2CodePuzzle: React.FC<Scene2CodePuzzleProps> = ({ code }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Timestamps for the numbers when spoken:
  // "lập trình viên trả lời sai là" -> 1 (frame 62), 4 (frame 75), 2 (frame 92), 3 (frame 108)
  const spring1 = spring({
    frame: Math.max(0, frame - 62),
    fps,
    config: { damping: 14, stiffness: 75 },
  });
  const spring4 = spring({
    frame: Math.max(0, frame - 75),
    fps,
    config: { damping: 14, stiffness: 75 },
  });
  const spring2 = spring({
    frame: Math.max(0, frame - 92),
    fps,
    config: { damping: 14, stiffness: 75 },
  });
  const spring3 = spring({
    frame: Math.max(0, frame - 108),
    fps,
    config: { damping: 14, stiffness: 75 },
  });

  // Stamp appearance for "SAI!" (frame 118)
  const stampSpring = spring({
    frame: Math.max(0, frame - 118),
    fps,
    config: { damping: 13, stiffness: 85 },
  });

  const trapGlow = 0.5 + 0.5 * Math.sin(frame / 3);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transform: `scale(${entrance})`,
        opacity: entrance,
        gap: "18px",
      }}
    >
      {/* Top Header Tags */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 8px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 18px",
            borderRadius: "999px",
            backgroundColor: "rgba(244, 63, 94, 0.15)",
            border: `1.5px solid ${THEME.colors.accentRose}`,
            color: THEME.colors.accentRose,
            fontSize: "19px",
            fontWeight: 800,
          }}
        >
          <Flame size={20} />
          <span>CÂU ĐỐ BẪY TƯ DUY</span>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 18px",
            borderRadius: "999px",
            backgroundColor: "rgba(251, 191, 36, 0.15)",
            border: `1.5px solid ${THEME.colors.accentAmber}`,
            color: THEME.colors.accentAmber,
            fontSize: "19px",
            fontWeight: 800,
          }}
        >
          <Clock size={20} />
          <span>TIMEOUT 0MS?</span>
        </div>
      </div>

      {/* Code Window */}
      <MacWindow
        filename="event-loop-puzzle.js"
        glow="bad"
        tag={{ text: "PUZZLE CODE ⚡", variant: "info" }}
      >
        <CodeBlock
          code={code}
          language="javascript"
          highlightLines={[
            { line: 3, type: "bad" },
            { line: 7, type: "good" },
          ]}
          fontSize={28}
        />
      </MacWindow>

      {/* Dynamic Animated Prediction Tracker */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "20px 24px",
          borderRadius: "20px",
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          border: `2px solid ${frame >= 118 ? "rgba(244, 63, 94, 0.7)" : "rgba(255, 255, 255, 0.15)"}`,
          boxShadow: frame >= 118
            ? "0 10px 40px rgba(244, 63, 94, 0.25)"
            : "0 10px 30px rgba(0, 0, 0, 0.4)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Header line of the box */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <AlertCircle size={24} color={THEME.colors.accentRose} />
            <span
              style={{
                fontSize: "18px",
                fontWeight: 800,
                color: "#E2E8F0",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {frame < 62 ? "DỰ ĐOÁN CỦA SỐ ĐÔNG..." : "CÂU TRẢ LỜI PHỔ BIẾN:"}
            </span>
          </div>

          {frame >= 118 && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "999px",
                backgroundColor: "rgba(244, 63, 94, 0.25)",
                border: "2px solid #F43F5E",
                color: "#F43F5E",
                fontSize: "18px",
                fontWeight: 950,
                transform: `scale(${stampSpring}) rotate(-2deg)`,
                boxShadow: "0 0 25px rgba(244, 63, 94, 0.5)",
              }}
            >
              <XCircle size={20} />
              <span>SAI BÉT! ❌</span>
            </div>
          )}
        </div>

        {/* Number Sequence Appearing One-By-One */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            minHeight: "84px",
          }}
        >
          {frame < 62 ? (
            <div
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: THEME.colors.textMuted,
                fontStyle: "italic",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>Đang tính toán thứ tự in ra... 🤔</span>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              {/* Number 1 */}
              {frame >= 62 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "68px",
                    height: "68px",
                    borderRadius: "16px",
                    backgroundColor: "rgba(56, 189, 248, 0.25)",
                    border: `2.5px solid ${THEME.colors.accentCyan}`,
                    color: THEME.colors.accentCyan,
                    fontSize: "36px",
                    fontWeight: 950,
                    fontFamily: "JetBrains Mono, monospace",
                    transform: `scale(${spring1})`,
                    boxShadow: "0 0 25px rgba(56, 189, 248, 0.5)",
                  }}
                >
                  1
                </div>
              )}

              {/* Arrow 1 -> 4 */}
              {frame >= 75 && (
                <ArrowRight
                  size={28}
                  color={THEME.colors.accentCyan}
                  style={{ opacity: spring4 }}
                />
              )}

              {/* Number 4 */}
              {frame >= 75 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "68px",
                    height: "68px",
                    borderRadius: "16px",
                    backgroundColor: "rgba(56, 189, 248, 0.25)",
                    border: `2.5px solid ${THEME.colors.accentCyan}`,
                    color: THEME.colors.accentCyan,
                    fontSize: "36px",
                    fontWeight: 950,
                    fontFamily: "JetBrains Mono, monospace",
                    transform: `scale(${spring4})`,
                    boxShadow: "0 0 25px rgba(56, 189, 248, 0.5)",
                  }}
                >
                  4
                </div>
              )}

              {/* Arrow 4 -> 2 */}
              {frame >= 92 && (
                <ArrowRight
                  size={28}
                  color={THEME.colors.accentRose}
                  style={{ opacity: spring2 }}
                />
              )}

              {/* Number 2 (The Trap Number) */}
              {frame >= 92 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "68px",
                      height: "68px",
                      borderRadius: "16px",
                      backgroundColor: "rgba(244, 63, 94, 0.3)",
                      border: `3px solid ${THEME.colors.accentRose}`,
                      color: "#FFA8B6",
                      fontSize: "36px",
                      fontWeight: 950,
                      fontFamily: "JetBrains Mono, monospace",
                      transform: `scale(${spring2})`,
                      boxShadow: `0 0 ${30 * trapGlow}px rgba(244, 63, 94, 0.85)`,
                    }}
                  >
                    2
                  </div>
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-22px",
                      fontSize: "13px",
                      fontWeight: 950,
                      color: THEME.colors.accentRose,
                      whiteSpace: "nowrap",
                    }}
                  >
                    BẪY 0MS
                  </span>
                </div>
              )}

              {/* Arrow 2 -> 3 */}
              {frame >= 108 && (
                <ArrowRight
                  size={28}
                  color={THEME.colors.accentPurple}
                  style={{ opacity: spring3 }}
                />
              )}

              {/* Number 3 */}
              {frame >= 108 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "68px",
                    height: "68px",
                    borderRadius: "16px",
                    backgroundColor: "rgba(168, 85, 247, 0.25)",
                    border: `2.5px solid ${THEME.colors.accentPurple}`,
                    color: THEME.colors.accentPurple,
                    fontSize: "36px",
                    fontWeight: 950,
                    fontFamily: "JetBrains Mono, monospace",
                    transform: `scale(${spring3})`,
                    boxShadow: "0 0 25px rgba(168, 85, 247, 0.5)",
                  }}
                >
                  3
                </div>
              )}
            </div>
          )}
        </div>

        {/* Misconception Explanation Footnote */}
        {frame >= 118 && (
          <div
            style={{
              fontSize: "17px",
              fontWeight: 700,
              color: "#CBD5E1",
              textAlign: "center",
              marginTop: "4px",
              opacity: interpolate(frame, [118, 130], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Nhiều bạn nghĩ <code style={{ color: "#F59E0B" }}>setTimeout(0)</code> sẽ chạy ngay lập tức!
          </div>
        )}
      </div>
    </div>
  );
};
