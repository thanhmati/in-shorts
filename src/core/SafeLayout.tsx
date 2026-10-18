import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "./theme";

interface SafeLayoutProps {
  children: React.ReactNode;
  showProgressBar?: boolean;
}

export const SafeLayout: React.FC<SafeLayoutProps> = ({
  children,
  showProgressBar = true,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();

  const progressPercent = Math.min(100, (frame / (durationInFrames || 1)) * 100);

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: THEME.colors.bg,
        backgroundImage: `radial-gradient(circle at 50% 25%, rgba(56, 189, 248, 0.08) 0%, transparent 60%), radial-gradient(circle at 50% 80%, rgba(168, 85, 247, 0.06) 0%, transparent 50%)`,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: THEME.fonts.sans,
        boxSizing: "border-box",
      }}
    >
      {/* Top Reading Progress Bar */}
      {showProgressBar && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            zIndex: 100,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progressPercent}%`,
              background: `linear-gradient(90deg, ${THEME.colors.accentCyan}, ${THEME.colors.accentEmerald})`,
              boxShadow: `0 0 12px ${THEME.colors.accentCyan}`,
            }}
          />
        </div>
      )}

      {/* Main Content Area within YouTube Safe Zone */}
      <div
        style={{
          flex: 1,
          paddingTop: "140px",
          paddingBottom: "280px",
          paddingLeft: "52px",
          paddingRight: "52px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 10,
        }}
      >
        {children}
      </div>
    </div>
  );
};
