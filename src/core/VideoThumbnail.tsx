import React from "react";
import { Flame, ShieldAlert, Sparkles } from "lucide-react";
import { AmbientBackground } from "./graphics/AmbientBackground";
import { MacWindow } from "./MacWindow";
import { CodeBlock } from "./CodeBlock";
import { VideoThumbnailProps } from "./types";
import { THEME } from "./theme";

export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  badgeText,
  headlineMain,
  headlineHighlight,
  highlightColor = THEME.colors.accentRose,
  subText,
  codeSnippet,
  channelName = "@laptrinhfullstack",
}) => {
  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        position: "relative",
        backgroundColor: THEME.colors.bgDarker,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px 60px",
        boxSizing: "border-box",
        fontFamily: THEME.fonts.sans,
        overflow: "hidden",
      }}
    >
      {/* 1. Ambient Background Layer */}
      <AmbientBackground />

      {/* Outer Neon Frame for High Contrast Feed Pop */}
      <div
        style={{
          position: "absolute",
          inset: "24px",
          border: `3px solid rgba(244, 63, 94, 0.4)`,
          borderRadius: "44px",
          pointerEvents: "none",
          boxShadow: `inset 0 0 40px rgba(244, 63, 94, 0.2), 0 0 50px rgba(244, 63, 94, 0.25)`,
        }}
      />

      {/* 2. Top Header: Branding Watermark */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 28px",
            borderRadius: "999px",
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "2px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
          }}
        >
          <Sparkles size={26} color={THEME.colors.accentAmber} />
          <span
            style={{
              fontSize: "24px",
              fontWeight: 900,
              color: THEME.colors.textPrimary,
              letterSpacing: "0.04em",
            }}
          >
            {channelName}
          </span>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 22px",
            borderRadius: "999px",
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            border: "1.5px solid rgba(239, 68, 68, 0.4)",
            color: "#EF4444",
            fontSize: "20px",
            fontWeight: 900,
            letterSpacing: "0.06em",
          }}
        >
          <span>SHORTS • REELS • TIKTOK</span>
        </div>
      </div>

      {/* 3. Center Section: Massive High-CTR Hook Headlines */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 10,
          margin: "30px 0",
        }}
      >
        {/* Category Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "14px 34px",
            borderRadius: "999px",
            backgroundColor: "rgba(244, 63, 94, 0.2)",
            border: `2px solid ${highlightColor}`,
            boxShadow: `0 0 35px rgba(244, 63, 94, 0.5)`,
            marginBottom: "36px",
          }}
        >
          <Flame size={34} color={highlightColor} />
          <span
            style={{
              fontSize: "26px",
              fontWeight: 950,
              color: highlightColor,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {badgeText}
          </span>
        </div>

        {/* Headline Line 1 */}
        <h1
          style={{
            fontSize: "76px",
            fontWeight: 950,
            lineHeight: 1.15,
            color: "#FFFFFF",
            margin: 0,
            letterSpacing: "-0.03em",
            textShadow: "0 10px 35px rgba(0, 0, 0, 0.95)",
          }}
        >
          {headlineMain}
        </h1>

        {/* Headline Line 2 with High Contrast Neon */}
        <h2
          style={{
            fontSize: "72px",
            fontWeight: 950,
            lineHeight: 1.18,
            color: highlightColor,
            margin: "20px 0 0 0",
            letterSpacing: "-0.02em",
            textShadow: `0 0 45px rgba(244, 63, 94, 0.8), 0 10px 30px rgba(0,0,0,0.9)`,
          }}
        >
          {headlineHighlight}
        </h2>

        {/* Sub-hook Card */}
        {subText && (
          <div
            style={{
              marginTop: "36px",
              display: "inline-flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px 36px",
              borderRadius: "20px",
              backgroundColor: "rgba(17, 24, 39, 0.92)",
              border: "2px solid rgba(255, 255, 255, 0.18)",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.7)",
            }}
          >
            <ShieldAlert size={30} color={THEME.colors.accentAmber} />
            <span
              style={{
                fontSize: "26px",
                fontWeight: 800,
                color: THEME.colors.textPrimary,
              }}
            >
              {subText}
            </span>
          </div>
        )}
      </div>

      {/* 4. Code / Architecture Preview Card */}
      {codeSnippet && (
        <div style={{ zIndex: 10, marginBottom: "20px" }}>
          <MacWindow
            filename={codeSnippet.filename}
            glow="bad"
            tag={{ text: "LỖI PHỔ BIẾN ❌", variant: "bad" }}
          >
            <CodeBlock
              code={codeSnippet.code}
              language={codeSnippet.language}
              fontSize={28}
            />
          </MacWindow>
        </div>
      )}

      {/* 5. Bottom Call-To-Action Banner */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "16px",
            padding: "20px 48px",
            borderRadius: "999px",
            background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
            boxShadow: "0 0 45px rgba(239, 68, 68, 0.75)",
            border: "2px solid rgba(255, 255, 255, 0.4)",
          }}
        >
          <span
            style={{
              fontSize: "30px",
              fontWeight: 950,
              color: "#FFFFFF",
              letterSpacing: "0.04em",
            }}
          >
            BẤM XEM ĐỂ FIX NGAY! 🚀
          </span>
        </div>
      </div>
    </div>
  );
};
