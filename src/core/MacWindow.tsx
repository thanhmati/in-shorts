import React from "react";
import { THEME } from "./theme";

interface MacWindowProps {
  filename?: string;
  tag?: {
    text: string;
    variant: "bad" | "good" | "info" | "tip";
  };
  children: React.ReactNode;
  glow?: "bad" | "good" | "default";
}

export const MacWindow: React.FC<MacWindowProps> = ({
  filename = "Component.tsx",
  tag,
  children,
  glow = "default",
}) => {
  const getGlowShadow = () => {
    if (glow === "bad") return THEME.shadows.badGlow;
    if (glow === "good") return THEME.shadows.goodGlow;
    return THEME.shadows.windowGlow;
  };

  const getTagStyle = () => {
    if (!tag) return {};
    switch (tag.variant) {
      case "bad":
        return {
          backgroundColor: THEME.colors.badBg,
          border: `1.5px solid ${THEME.colors.badBorder}`,
          color: THEME.colors.badText,
        };
      case "good":
        return {
          backgroundColor: THEME.colors.goodBg,
          border: `1.5px solid ${THEME.colors.goodBorder}`,
          color: THEME.colors.goodText,
        };
      case "tip":
      case "info":
      default:
        return {
          backgroundColor: THEME.colors.tipBg,
          border: `1.5px solid ${THEME.colors.tipBorder}`,
          color: THEME.colors.tipText,
        };
    }
  };

  return (
    <div
      style={{
        width: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        backgroundColor: THEME.colors.cardBg,
        border: `1.5px solid ${
          glow === "bad"
            ? THEME.colors.badBorder
            : glow === "good"
            ? THEME.colors.goodBorder
            : THEME.colors.cardBorder
        }`,
        boxShadow: getGlowShadow(),
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* MacOS Header Bar */}
      <div
        style={{
          height: "56px",
          backgroundColor: THEME.colors.macHeaderBg,
          borderBottom: `1px solid ${THEME.colors.cardBorder}`,
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* 3 Mac Traffic Lights */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: "#FF5F56",
            }}
          />
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: "#FFBD2E",
            }}
          />
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: "#27C93F",
            }}
          />
        </div>

        {/* Filename */}
        <div
          style={{
            fontFamily: THEME.fonts.code,
            fontSize: "19px",
            color: THEME.colors.textSecondary,
            fontWeight: 600,
          }}
        >
          {filename}
        </div>

        {/* Optional Tag / State Pill */}
        {tag ? (
          <div
            style={{
              padding: "4px 14px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 800,
              letterSpacing: "0.04em",
              ...getTagStyle(),
            }}
          >
            {tag.text}
          </div>
        ) : (
          <div style={{ width: "40px" }} />
        )}
      </div>

      {/* Window Content */}
      <div style={{ padding: "28px 24px", position: "relative" }}>
        {children}
      </div>
    </div>
  );
};
