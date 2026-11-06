import React from "react";
import { ArrowLeftRight, Laptop, Server, Sparkles, Zap } from "lucide-react";
import { AmbientBackground } from "./graphics/AmbientBackground";
import { MacWindow } from "./MacWindow";
import { CodeBlock } from "./CodeBlock";
import { VideoThumbnailProps } from "./types";
import { THEME } from "./theme";

export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  tagText,
  badgeText,
  headlineMain,
  headlineHighlight,
  highlightColor = THEME.colors.accentCyan,
  heroVisualType = "diagram",
  codeSnippet,
  channelName = "@laptrinhfullstack",
}) => {
  // Use tagText if provided, otherwise fallback to short badgeText
  const displayTag = tagText || badgeText;

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
        alignItems: "center",
        padding: "90px 60px 140px 60px",
        boxSizing: "border-box",
        fontFamily: THEME.fonts.sans,
        overflow: "hidden",
      }}
    >
      {/* 1. Subtle Cyberpunk Ambient Background */}
      <AmbientBackground />

      {/* 2. Top Watermark Branding (Clean & Minimal) */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 24px",
          borderRadius: "999px",
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          border: "1.5px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.5)",
          zIndex: 10,
        }}
      >
        <Sparkles size={22} color={highlightColor} />
        <span
          style={{
            fontSize: "22px",
            fontWeight: 800,
            color: THEME.colors.textSecondary,
            letterSpacing: "0.04em",
          }}
        >
          {channelName}
        </span>
      </div>

      {/* 3. Hero Hook Title (Massive, High-CTR, 3-5 Words Only) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 10,
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        {/* Optional Clean 1-2 Word Tag */}
        {displayTag && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 22px",
              borderRadius: "999px",
              backgroundColor: "rgba(15, 23, 42, 0.85)",
              border: `1.5px solid ${highlightColor}`,
              boxShadow: `0 0 25px ${highlightColor}40`,
              marginBottom: "28px",
            }}
          >
            <Zap size={20} color={highlightColor} />
            <span
              style={{
                fontSize: "20px",
                fontWeight: 900,
                color: highlightColor,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {displayTag}
            </span>
          </div>
        )}

        {/* Main Headline (Line 1) */}
        <h1
          style={{
            fontSize: "94px",
            fontWeight: 950,
            lineHeight: 1.15,
            color: "#FFFFFF",
            margin: 0,
            letterSpacing: "-0.03em",
            textShadow: "0 12px 40px rgba(0, 0, 0, 0.95)",
          }}
        >
          {headlineMain}
        </h1>

        {/* Highlight Headline (Line 2) */}
        <h2
          style={{
            fontSize: "94px",
            fontWeight: 950,
            lineHeight: 1.15,
            color: highlightColor,
            margin: "12px 0 0 0",
            letterSpacing: "-0.02em",
            textShadow: `0 0 50px ${highlightColor}80, 0 12px 35px rgba(0,0,0,0.9)`,
          }}
        >
          {headlineHighlight}
        </h2>
      </div>

      {/* 4. Hero Visual Stage (50% Area - Visual Metaphor or Clean Code) */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          flex: 1,
          maxHeight: "780px",
        }}
      >
        {codeSnippet && heroVisualType === "code" ? (
          /* Clean 2-3 Line Code Showcase */
          <div style={{ width: "920px" }}>
            <MacWindow filename={codeSnippet.filename || "example.ts"} glow="good">
              <CodeBlock
                code={codeSnippet.code}
                language={codeSnippet.language}
                fontSize={32}
              />
            </MacWindow>
          </div>
        ) : (
          /* Hero Architectural Visual Stage: Client ⟷ Server Flow */
          <div
            style={{
              width: "900px",
              height: "640px",
              borderRadius: "32px",
              background: "rgba(15, 23, 42, 0.85)",
              border: `2px solid rgba(255, 255, 255, 0.15)`,
              boxShadow: `0 25px 60px rgba(0, 0, 0, 0.8), 0 0 50px ${highlightColor}25`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "48px 40px",
              boxSizing: "border-box",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top Interactive Pipeline Tag */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 24px",
                borderRadius: "14px",
                background: "rgba(11, 15, 25, 0.9)",
                border: `1.5px solid ${highlightColor}`,
                boxShadow: `0 0 25px ${highlightColor}35`,
              }}
            >
              <ArrowLeftRight size={24} color={highlightColor} />
              <span
                style={{
                  fontFamily: THEME.fonts.code,
                  fontSize: "22px",
                  fontWeight: 800,
                  color: THEME.colors.textPrimary,
                  letterSpacing: "1px",
                }}
              >
                REQUEST ⟷ RESPONSE
              </span>
            </div>

            {/* Middle Data Flow Highway */}
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                alignItems: "center",
                margin: "20px 0",
              }}
            >
              {/* Outbound Request Pill */}
              <div
                style={{
                  width: "680px",
                  padding: "16px 28px",
                  borderRadius: "18px",
                  background: "rgba(11, 15, 25, 0.95)",
                  border: `2px solid ${THEME.colors.accentCyan}`,
                  boxShadow: "0 0 30px rgba(56, 189, 248, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: THEME.fonts.code,
                    fontSize: "22px",
                    fontWeight: 900,
                    color: THEME.colors.accentCyan,
                  }}
                >
                  HTTP REQUEST ➔
                </span>
                <span
                  style={{
                    fontFamily: THEME.fonts.code,
                    fontSize: "22px",
                    fontWeight: 800,
                    color: "#FFFFFF",
                  }}
                >
                  GET /users HTTP/2
                </span>
              </div>

              {/* Inbound Response Pill */}
              <div
                style={{
                  width: "680px",
                  padding: "16px 28px",
                  borderRadius: "18px",
                  background: "rgba(11, 15, 25, 0.95)",
                  border: `2px solid ${THEME.colors.accentEmerald}`,
                  boxShadow: "0 0 30px rgba(16, 185, 129, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: THEME.fonts.code,
                    fontSize: "22px",
                    fontWeight: 800,
                    color: "#FFFFFF",
                  }}
                >
                  200 OK (JSON)
                </span>
                <span
                  style={{
                    fontFamily: THEME.fonts.code,
                    fontSize: "22px",
                    fontWeight: 900,
                    color: THEME.colors.accentEmerald,
                  }}
                >
                  ⟵ HTTP RESPONSE
                </span>
              </div>
            </div>

            {/* Bottom Two Terminal Nodes: Client & Server */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {/* Client Terminal */}
              <div
                style={{
                  width: "340px",
                  padding: "16px 24px",
                  borderRadius: "18px",
                  background: "rgba(11, 15, 25, 0.95)",
                  border: `2px solid ${THEME.colors.accentCyan}`,
                  boxShadow: "0 10px 25px rgba(56, 189, 248, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <Laptop size={36} color={THEME.colors.accentCyan} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "24px", fontWeight: 900, color: "#FFFFFF" }}>
                    CLIENT
                  </span>
                  <span style={{ fontFamily: THEME.fonts.code, fontSize: "16px", color: THEME.colors.accentCyan }}>
                    Browser / App
                  </span>
                </div>
              </div>

              {/* Server Terminal */}
              <div
                style={{
                  width: "340px",
                  padding: "16px 24px",
                  borderRadius: "18px",
                  background: "rgba(11, 15, 25, 0.95)",
                  border: `2px solid ${THEME.colors.accentPurple}`,
                  boxShadow: "0 10px 25px rgba(168, 85, 247, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <Server size={36} color={THEME.colors.accentPurple} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "24px", fontWeight: 900, color: "#FFFFFF" }}>
                    SERVER
                  </span>
                  <span style={{ fontFamily: THEME.fonts.code, fontSize: "16px", color: THEME.colors.accentPurple }}>
                    Cloud API
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Safe Negative Space at Bottom (No Cluttered Fake Buttons) */}
      <div style={{ height: "40px" }} />
    </div>
  );
};
