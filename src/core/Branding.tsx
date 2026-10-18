import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Code2, Sparkles } from "lucide-react";
import { THEME } from "./theme";

interface BrandingProps {
  seriesName?: string;
  channelName?: string;
}

export const Branding: React.FC<BrandingProps> = ({
  seriesName = "CODING TIPS #01",
  channelName = "@laptrinhfullstack",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: "36px",
        transform: `translateY(${(1 - entrance) * -30}px)`,
        opacity: entrance,
      }}
    >
      {/* Series Tag */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "rgba(56, 189, 248, 0.12)",
          border: `1.5px solid rgba(56, 189, 248, 0.35)`,
          padding: "10px 20px",
          borderRadius: "999px",
        }}
      >
        <Sparkles size={22} color={THEME.colors.accentCyan} />
        <span
          style={{
            color: THEME.colors.accentCyan,
            fontWeight: 800,
            fontSize: "22px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {seriesName}
        </span>
      </div>

      {/* Channel Name */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "10px 22px",
          borderRadius: "999px",
        }}
      >
        <Code2 size={22} color={THEME.colors.accentEmerald} />
        <span
          style={{
            color: THEME.colors.textPrimary,
            fontWeight: 700,
            fontSize: "22px",
            letterSpacing: "0.02em",
          }}
        >
          {channelName}
        </span>
      </div>
    </div>
  );
};
