import React from "react";
import { useCurrentFrame } from "remotion";
import { RefreshCw, CheckCircle2 } from "lucide-react";
import { THEME } from "../theme";

interface ReRenderCounterProps {
  isBad: boolean;
  startFrame?: number;
}

export const ReRenderCounter: React.FC<ReRenderCounterProps> = ({
  isBad,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();

  // In bad mode, count increments every 45 frames (simulating unnecessary re-renders)
  const relativeFrame = Math.max(0, frame - startFrame);
  const count = isBad ? Math.min(8, 1 + Math.floor(relativeFrame / 40)) : 1;

  const isBlinking = isBad && (relativeFrame % 40 < 15);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "8px 16px",
        borderRadius: "10px",
        backgroundColor: isBad
          ? isBlinking
            ? "rgba(244, 63, 94, 0.28)"
            : "rgba(244, 63, 94, 0.12)"
          : "rgba(16, 185, 129, 0.12)",
        border: `1.5px solid ${
          isBad ? THEME.colors.accentRose : THEME.colors.accentEmerald
        }`,
        boxShadow: isBad ? THEME.shadows.badGlow : THEME.shadows.goodGlow,
        color: isBad ? THEME.colors.badText : THEME.colors.goodText,
        fontWeight: 700,
        fontSize: "17px",
      }}
    >
      {isBad ? (
        <RefreshCw
          size={18}
          color={THEME.colors.accentRose}
          style={{ transform: `rotate(${frame * 8}deg)` }}
        />
      ) : (
        <CheckCircle2 size={18} color={THEME.colors.accentEmerald} />
      )}
      <span>
        {isBad ? `Con Re-rendered: ${count} lần ❌` : `Con Render: Duy nhất 1 lần ✅`}
      </span>
    </div>
  );
};
