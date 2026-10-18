import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { HardDrive, AlertOctagon, CheckCircle2 } from "lucide-react";
import { THEME } from "../theme";

interface MemoryRefVisualProps {
  isBad: boolean;
}

export const MemoryRefVisual: React.FC<MemoryRefVisualProps> = ({ isBad }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const pulse = 0.8 + 0.2 * Math.sin(frame / 6);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 20px",
        borderRadius: "14px",
        backgroundColor: isBad
          ? "rgba(244, 63, 94, 0.08)"
          : "rgba(16, 185, 129, 0.08)",
        border: `1.5px solid ${
          isBad ? "rgba(244, 63, 94, 0.3)" : "rgba(16, 185, 129, 0.3)"
        }`,
        boxShadow: isBad ? THEME.shadows.badGlow : THEME.shadows.goodGlow,
        opacity: entrance,
        transform: `scale(${entrance})`,
        margin: "16px 0",
      }}
    >
      {/* Left Memory Block */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <HardDrive
          size={24}
          color={isBad ? THEME.colors.accentRose : THEME.colors.accentEmerald}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "14px", color: THEME.colors.textMuted, fontWeight: 600 }}>
            Render 1:
          </span>
          <span
            style={{
              fontFamily: THEME.fonts.code,
              fontSize: "18px",
              fontWeight: 700,
              color: THEME.colors.textPrimary,
            }}
          >
            Mem: 0x1A4F
          </span>
        </div>
      </div>

      {/* Comparison Operator */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${isBad ? pulse : 1})`,
        }}
      >
        <span
          style={{
            fontFamily: THEME.fonts.code,
            fontSize: "26px",
            fontWeight: 900,
            color: isBad ? THEME.colors.accentRose : THEME.colors.accentEmerald,
            letterSpacing: "0.08em",
          }}
        >
          {isBad ? "!==" : "==="}
        </span>
        <span
          style={{
            fontSize: "13px",
            fontWeight: 800,
            color: isBad ? THEME.colors.accentRose : THEME.colors.accentEmerald,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          {isBad ? "Khác tham chiếu" : "Cùng vùng nhớ"}
        </span>
      </div>

      {/* Right Memory Block */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span style={{ fontSize: "14px", color: THEME.colors.textMuted, fontWeight: 600 }}>
            Render 2:
          </span>
          <span
            style={{
              fontFamily: THEME.fonts.code,
              fontSize: "18px",
              fontWeight: 700,
              color: isBad ? THEME.colors.accentRose : THEME.colors.accentEmerald,
            }}
          >
            {isBad ? "Mem: 0x89C2" : "Mem: 0x1A4F"}
          </span>
        </div>
        {isBad ? (
          <AlertOctagon size={24} color={THEME.colors.accentRose} />
        ) : (
          <CheckCircle2 size={24} color={THEME.colors.accentEmerald} />
        )}
      </div>
    </div>
  );
};
